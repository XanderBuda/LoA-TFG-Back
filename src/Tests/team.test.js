const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');
const Team = require('../Models/Team');
const { generarJWT } = require('../Helpers/jwt');
const { mockUserNotPicture, mockTeam } = require('./Mocks/mocks')
var token, user, team;

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
})

describe('GET /team/all', () => {

    test('Consulta todos los equipos', async () => {

        await request(api).get('/team/all')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay equipos', async () => {
        await Team.deleteMany({});
        await request(api).get('/team/all')
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).get('/team/all')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Envio token falso', async () => {

        await request(api).get('/team/all')
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

})

describe('GET /team/:id', () => {

    test('Consulta un equipo por id', async () => {

        await request(api).get('/team/' + team.id)
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay equipos', async () => {

        await Team.deleteMany({});
        await request(api).get('/team/' + team.id)
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).get('/team/' + team.id)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).get('/team/' + team.id)
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Envio id con formato erroneo', async () => {

        await request(api).get('/team/' + '60b3bdcf1f2f671f783ee')
            .set('Authorization', token)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

})

describe('POST /team/new', () => {

    test('Creo un nuevo equipo', async () => {
        await Team.deleteMany({})
        await request(api).post('/team/new')
            .set('Authorization', token)
            .send({
                name: "Crazy Romanians"
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No envío datos para crear el equipo', async () => {

        await request(api).post('/team/new')
            .set('Authorization', token)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Intento crear un equipo que ya existe', async () => {

        await request(api).post('/team/new')
            .set('Authorization', token)
            .send({
                name: "Crazy Romanians"
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)

    })

})

describe('PUT /team/update/:id', () => {

    test('Actualizo un equipo existente', async () => {

        await request(api).put('/team/update/' + team.id)
            .set('Authorization', token)
            .send({
                statistics: {
                    victories: 3,
                    defeats: 1,
                    rankingpoints: 2000
                }
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).put('/team/update/' + team.id)
            .send({
                statistics: {
                    victories: 3,
                    defeats: 1,
                    rankingpoints: 2000
                }
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).put('/team/update/' + team.id)
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .send({
                statistics: {
                    victories: 3,
                    defeats: 1,
                    rankingpoints: 2000
                }
            })
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Actualizo un equipo no existente', async () => {
        await Team.deleteMany({})
        await request(api).put('/team/update/' + team.id)
            .set('Authorization', token)
            .send({
                statistics: {
                    victories: 3,
                    defeats: 1,
                    rankingpoints: 2000
                }
            })
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('Actualizo con un formato id incorrecto', async () => {

        await request(api).put('/team/update/' + 'eeee')
            .set('Authorization', token)
            .send({
                statistics: {
                    victories: 3,
                    defeats: 1,
                    rankingpoints: 2000
                }
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

})

describe('DELETE /team/delete', () => {

    test('Borro un equipo existente', async () => {

        await request(api).delete('/team/delete')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Intento borrar un equipo no existente', async () => {
        await Team.deleteMany({})
        await request(api).delete('/team/delete')
            .set('Authorization', token)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).delete('/team/delete')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).delete('/team/delete')
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })


})