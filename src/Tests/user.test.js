const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');
const { generarJWT } = require('../Helpers/jwt');
var token;
var user;
var mockUser = {
    username: "Pepo",
    email: "pepo@gmail.com",
    password: "pepo"
}

// Antes de cada test
beforeEach(async () => {

    await User.deleteMany({}) // Borro todos los usuarios
    user = new User(mockUser); // Creo un nuevo usuario mock
    await user.save(); // Lo guardo en BD

    user = await User.findOne(user); // Lo recupero de la BD ya con el id
    token = await generarJWT(user.id); // Genero un token válido
    token = `Bearer ${token}`;
})


describe('GET /user/all', () => {

    test('Consulta todos los usuarios', async () => {

        await request(api).get('/user/all')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay usuarios', async () => {

        await User.deleteMany({})
        await request(api).get('/user/all')
            .set('Authorization', token)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).get('/user/all')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).get('/user/all')
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

})

describe('GET /user/:id', () => {

    test('Consulta un usuario por id', async () => {

        await request(api).get('/user/' + user.id)
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No hay usuarios', async () => {

        await User.deleteMany({})
        await request(api).get('/user/' + user.id)
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).get('/user/' + user.id)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Token falso', async () => {

        await request(api).get('/user/' + user.id)
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Envio id con formato erroneo', async () => {

        await request(api).get('/user/' + '60b3bdcf1f2f671f783ee')
            .set('Authorization', token)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

})

describe('POST /user/new', () => {

    test('Creo un nuevo usuario', async () => {
        await User.deleteMany({})
        await request(api).post('/user/new')
            .send({
                username: "Pepo",
                email: "pepo@gmail.com",
                password: "pepo"
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('No envío datos para crear el usuario', async () => {

        await request(api).post('/user/new')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Intento crear un usuario que ya existe', async () => {

        await request(api).post('/user/new')
            .send({
                username: "Pepo",
                email: "pepo@gmail.com",
                password: "pepo"
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)

    })

})

describe('PUT /user/update/:id', () => {

    test('Actualizo un usuario existente', async () => {

        await request(api).put('/user/update/' + user.id)
            .set('Authorization', token)
            .send({
                roles: {
                    first: "Toplane",
                    second: "Adc"
                }
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Actualizo un usuario no existente', async () => {
        await User.deleteMany({})
        await request(api).put('/user/update/' + user.id)
            .set('Authorization', token)
            .send({
                roles: {
                    first: "Toplane",
                    second: "Adc"
                }
            })
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('Actualizo con un formato id incorrecto', async () => {

        await request(api).put('/user/update/' + 'eeee')
            .set('Authorization', token)
            .send({
                email: "pepo@gmail.com",
            })
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })


})

describe('DELETE /user/delete', () => {

    test('Borro un usuario existente', async () => {

        await request(api).delete('/user/delete')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Intento borrar un usuario no existente', async () => {
        await User.deleteMany({})
        await request(api).delete('/user/delete')
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).delete('/user/delete')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('No envio token', async () => {

        await request(api).delete('/user/delete')
            .set('Authorization', 'Bearer asedfrgbdfsb.3456546')
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })


})


