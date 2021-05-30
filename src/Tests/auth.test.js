const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');
const { generarJWT } = require('../Helpers/jwt');
var token;



beforeEach(async () => {
    let username = 'Pepo';
    const user = await User.findOne({ username })

    token = await generarJWT(user.id)
    token = `Bearer ${token}`;

})

describe('POST /login', () => {

    test('Login correct', async () => {

        await request(api).post('/login')
            .send({
                username: "Pepo",
                password: "pepo"
            })
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Body request wrong', async () => {

        await request(api).post('/login')
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Password wrong', async () => {

        await request(api).post('/login')
            .send({
                username: "Pepo",
                password: "pepe"
            })
            .expect(402)
            .expect('Content-Type', /application\/json/)
    })

    test('User doesnt exist', async () => {

        await request(api).post('/login')
            .send({
                username: "Pepe",
                password: "pepo"
            })
            .expect(404)
            .expect('Content-Type', /application\/json/)
    })

})



describe('GET /login/renew', () => {

    test('Login renewed', async () => {

        await request(api).get('/login/renew')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

})





