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
    teamNoPic = new Team({ admin: userNoPic.id, name: 'EEP Esporst' }); // Creo un nuevo usuario mock
    tournament = new Tournament({ admin: user.id, ...mockTournament }); // Creo un nuevo usuario mock
    tournamentNoPic = new Tournament({ admin: userNoPic.id, name: 'Eazy cup' }); // Creo un nuevo usuario mock
    petition = new Petition({ emitter: userNoPic.id, adminReason: userNoPic.id, receiver: user.id, reasonTeam: teamNoPic.id, reasonTournament: null }); // Creo una nueva peticion

    await userNoPic.save(); // Lo guardo en BD
    await user.save(); // Lo guardo en BD
    await team.save(); // Lo guardo en BD
    await tournament.save(); // Lo guardo en BD
    await petition.save(); // Lo guardo en BD

    user = await User.findOne(user); // Lo recupero de la BD ya con el id
    token = await generarJWT(user.id); // Genero un token válido
    token = `Bearer ${token}`;

    userNoPic = await User.findOne(userNoPic); // Lo recupero de la BD ya con el id
    tokenNoPic = await generarJWT(userNoPic.id); // Genero un token válido
    tokenNoPic = `Bearer ${tokenNoPic}`;

});


// POST /petition/userToAdmin
describe('POST /petition/userToAdmin', () => {

    test('Crear peticion de usuario a admin para unirse a un equipo', async () => {

        await request(api).post(`/petition/userToAdmin?teamId=${team.id}`)
            .set('Authorization', tokenNoPic)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de usuario a admin para unirse a un equipo sin ID', async () => {

        await request(api).post(`/petition/userToAdmin?teamId=`)
            .set('Authorization', tokenNoPic)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de usuario a admin para unirse a un equipo que no existe', async () => {
        await Team.deleteMany({}) // Borro todos los equipos

        await request(api).post(`/petition/userToAdmin?teamId=${team.id}`)
            .set('Authorization', tokenNoPic)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de usuario a admin para unirse a un torneo', async () => {


        await request(api).post(`/petition/userToAdmin?tournamentId=${tournament.id}`)
            .set('Authorization', tokenNoPic)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });
    test('Crear peticion de usuario a admin para unirse a un torneo sin ID', async () => {
        await Tournament.deleteMany({}) // Borro todos los torneos

        await request(api).post(`/petition/userToAdmin?tournamentId=`)
            .set('Authorization', tokenNoPic)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de usuario a admin para unirse a un torneo no existente', async () => {
        await Tournament.deleteMany({}) // Borro todos los torneos

        await request(api).post(`/petition/userToAdmin?tournamentId=${tournament.id}`)
            .set('Authorization', tokenNoPic)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    });
});


// POST /petition/adminToUserForTeam
describe('POST /petition/adminToUserForTeam', () => {

    test('Crear peticion de admin invita a su equipo a un usuario', async () => {

        await request(api).post(`/petition/adminToUserForTeam?teamId=${team.id}`)
            .set('Authorization', token)
            .send({
                username: "Pepi",
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de admin invita a su equipo a un usuario sin ID de Team', async () => {

        await request(api).post(`/petition/adminToUserForTeam?teamId=`)
            .set('Authorization', token)
            .send({
                username: "Pepi",
            })
            .expect(404)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de admin invita a su equipo a un usuario con un ID invalido', async () => {

        await request(api).post(`/petition/adminToUserForTeam?teamId=dasdasdasdsad`)
            .set('Authorization', token)
            .send({
                username: "Pepi",
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)
    });

})

describe('POST /petition/adminToUserForTournament', () => {


    test('Crear peticion de admin invita a su torneo a un team', async () => {

        await request(api).post(`/petition/adminToUserForTournament?tournamentId=${tournamentNoPic.id}`)
            .set('Authorization', tokenNoPic)
            .send({
                name: "Crazy Romanians",
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de admin invita a su torneo a un team sin ID de Team', async () => {

        await request(api).post(`/petition/adminToUserForTournament?tournamentId=`)
            .set('Authorization', tokenNoPic)
            .send({
                name: "Crazy Romanians",
            })
            .expect(404)
            .expect('Content-Type', /application\/json/)
    });

    test('Crear peticion de admin invita a su torneo a un team con un ID invalido', async () => {

        await request(api).post(`/petition/adminToUserForTournament?tournamentId=dasdasdasdsad`)
            .set('Authorization', tokenNoPic)
            .send({
                name: "Crazy Romanians",
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)
    });

})

describe('DELETE /petition/closePetition/', () => {

    test('Borra una peticion por id', async () => {

        await request(api).delete(`/petition/closePetition/${petition.id}`)
            .set('Authorization', tokenNoPic)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    });

    test('Intenta borrar una peticion sin id', async () => {

        await request(api).delete(`/petition/closePetition/`)
            .set('Authorization', tokenNoPic)
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8')
    });

    test('Intenta borrar una peticion por un id no existente', async () => {

        await request(api).delete(`/petition/closePetition/2fghj32hg3jh2h`)
            .set('Authorization', tokenNoPic)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    });

   

})