const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');
const { generarJWT } = require('../Helpers/jwt');
var token;

beforeEach(async () => {
    const users = await User.find({ })
    token = await generarJWT(users[0].id)
    token = `Bearer ${token}`;
})

describe('GET /team/all', () => {

    test('Login renewed', async () => {

        await request(api).get('/team/all')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

})

