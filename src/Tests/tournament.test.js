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

    test('No hay token', async () => {

        await request(api).get('/tournament/' + tournament.id)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).get('/tournament/' + tournament.id)
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Envio id con formato erroneo', async () => {

        await request(api).get('/tournament/' + '60b3bdcf1f2f671f783ee')
            .set('Authorization', token)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

})

describe('POST /tournament/new', () => {

    test('Creo un nuevo torneo', async () => {
        await Tournament.deleteMany({})
        await request(api).post('/tournament/new')
            .set('Authorization', token)
            .send({
                name: "The final noobs",
                size: 8
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No envío datos para crear el torneo', async () => {

        await request(api).post('/tournament/new')
            .set('Authorization', token)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Intento crear un torneo que ya existe', async () => {

        await request(api).post('/tournament/new')
            .set('Authorization', token)
            .send({
                name: "The final noobs",
                size: 8
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)

    })

})

describe('PUT /tournament/update/:id', () => {

    test('Actualizo un equipo existente', async () => {

        await request(api).put('/tournament/update/' + tournament.id)
            .set('Authorization', token)
            .send({
                size: 4
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).put('/tournament/update/' + tournament.id)
            .send({
                size: 4
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).put('/tournament/update/' + tournament.id)
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .send({
                size: 4
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Actualizo un equipo no existente', async () => {
        await Tournament.deleteMany({})
        await request(api).put('/tournament/update/' + tournament.id)
            .set('Authorization', token)
            .send({
                size: 4
            })
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('Actualizo con un formato id incorrecto', async () => {

        await request(api).put('/tournament/update/' + 'eeee')
            .set('Authorization', token)
            .send({
                size: 4
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

})

describe('DELETE /tournament/delete', () => {

    test('Borro un equipo existente', async () => {

        await request(api).delete('/tournament/delete')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Intento borrar un equipo no existente', async () => {
        await Tournament.deleteMany({})
        await request(api).delete('/tournament/delete')
            .set('Authorization', token)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).delete('/tournament/delete')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).delete('/tournament/delete')
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

})
