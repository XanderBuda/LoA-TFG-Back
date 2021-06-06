const request = require('supertest');
const { api } = require('../index');
const { generarJWT } = require('../Helpers/jwt');
const Petition = require('../Models/Petition');
const User = require('../Models/User');
const Team = require('../Models/Team');
const Tournament = require('../Models/Tournament');
const { mockUser, mockUserNotPicture, mockTeam, mockTournament } = require('./Mocks/mocks')

var token, tokenNoPic, user, userNoPic, team, tournament;

// Antes de cada test
beforeEach(async () => {

    await User.deleteMany({}) // Borro todos los usuarios
    await Petition.deleteMany({}) // Borro todas las peticiones
    await Team.deleteMany({}) // Borro todos los equipos
    await Tournament.deleteMany({}) // Borro todos los torneos

    userNoPic = new User(mockUserNotPicture); // Creo un nuevo usuario mock
    user = new User(mockUser); // Creo un nuevo usuario mock
    team = new Team({ admin: user.id, ...mockTeam }); // Creo un nuevo usuario mock
    tournament = new Tournament({ admin: user.id, ...mockTournament }); // Creo un nuevo usuario mock

    await userNoPic.save(); // Lo guardo en BD
    await user.save(); // Lo guardo en BD
    await team.save(); // Lo guardo en BD
    await tournament.save(); // Lo guardo en BD

    user = await User.findOne(user); // Lo recupero de la BD ya con el id
    token = await generarJWT(user.id); // Genero un token válido
    token = `Bearer ${token}`;

});

describe('POST /petition/userToAdmin', () => {

    test('Crear peticion de usuario a admin para unirse a un equipo', async () => {

        userNoPic = await User.findOne(userNoPic); // Lo recupero de la BD ya con el id
        tokenNoPic = await generarJWT(userNoPic.id); // Genero un token válido
        tokenNoPic = `Bearer ${tokenNoPic}`;

        await request(api).post(`/petition/userToAdmin?teamId=${team.id}`)
            .set('Authorization', tokenNoPic)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })


})