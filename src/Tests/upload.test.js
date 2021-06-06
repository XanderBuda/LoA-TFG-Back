const request = require('supertest');
const { api } = require('../index');
const { generarJWT } = require('../Helpers/jwt');
const User = require('../Models/User');
const { mockUser, mockUserNotPicture } = require('./Mocks/mocks');

var token, user, userNoPic, tokenNoPic;


// Antes de cada test
beforeEach(async () => {

    await User.deleteMany({}) // Borro todos los usuarios
    user = new User(mockUser); // Creo un nuevo usuario mock
    await user.save(); // Lo guardo en BD

    user = await User.findOne(user); // Lo recupero de la BD ya con el id
    token = await generarJWT(user.id); // Genero un token válido
    token = `Bearer ${token}`;

    userNoPic = new User(mockUserNotPicture); // Creo un nuevo usuario mock
    await userNoPic.save(); // Lo guardo en BD

    userNoPic = await User.findOne(userNoPic); // Lo recupero de la BD ya con el id
    tokenNoPic = await generarJWT(userNoPic.id); // Genero un token válido
    tokenNoPic = `Bearer ${tokenNoPic}`;
});

describe('PUT /upload/:type', () => {

    test('Introduzco un tipo no valido', async () => {

        await request(api).put('/upload/Element')
            .set('Authorization', token)
            .expect(409)
            .expect('Content-Type', /application\/json/);

    });

    test('No cargo ningún archivo para subir', async () => {

        await request(api).put('/upload/User')
            .set('Authorization', token)
            .expect(400)
            .expect('Content-Type', /application\/json/);

    });

    test('Introduzco mal el endpoint', async () => {

        await request(api).put('/uploads/User')
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8');

    });


});

describe('GET /upload/:type', () => {

    test('Recoge la la foto que tiene el usuario', async () => {

        await request(api).get('/upload/User')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', 'image/jpeg');

    });

    test('Recoge la la foto de un usuario que no tiene foto', async () => {

        await request(api).get('/upload/User')
            .set('Authorization', tokenNoPic)
            .expect(200)
            .expect('Content-Type', 'image/jpeg');

    });

    test('Introduzco un tipo no valido', async () => {

        await request(api).get('/upload/Element')
            .set('Authorization', token)
            .expect(409)
            .expect('Content-Type', /application\/json/);

    });

    test('Introduzco mal el endpoint', async () => {

        await request(api).get('/uploads/User')
            .set('Authorization', token)
            .expect(404)
            .expect('Content-Type', 'text/html; charset=utf-8');

    });

});