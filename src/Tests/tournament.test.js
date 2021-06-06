const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');
const Team = require('../Models/Team');
const Tournament = require('../Models/Tournament');
const { generarJWT } = require('../Helpers/jwt');
const { mockUserNotPicture, mockTeam, mockTournament } = require('./Mocks/mocks')
var token, user, team, tournament;

beforeEach(async () => {
    await User.deleteMany({});
    user = new User(mockUserNotPicture);
    await user.save();

    user = await User.findOne(user);
    token = await generarJWT(user.id);
    token = `Bearer ${token}`;

    await Team.deleteMany({});
    team = new Team({ admin: user.id, users: user.id, ...mockTeam });
    await team.save();

    await Tournament.deleteMany({});
    tournament = new Tournament({ admin: user.id, teams: team.id, ...mockTournament });
    await tournament.save();
})

describe('GET /tournament/all', () => {

    test('Consulta todos los torneos', async () => {

        await request(api).get('/tournament/all')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay torneos', async () => {
        await Tournament.deleteMany({});
        await request(api).get('/tournament/all')
            .set('Authorization', token)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay token', async () => {
       
        await request(api).get('/tournament/all')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {
       
        await request(api).get('/tournament/all')
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
    
})

describe('GET /tournament/:id', () => {

    test('Consulta un torneo por id', async () => {

        await request(api).get('/tournament/' + tournament.id)
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay torneos', async () => {
        await Tournament.deleteMany({});
        await request(api).get('/tournament/' + tournament.id)
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })
})