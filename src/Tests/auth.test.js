const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');
const { generarJWT } = require('../Helpers/jwt');
const bcrypt = require('bcryptjs');
var token, user;

var mockUser = {
    username: "Pepo",
    email: "pepo@gmail.com",
    password: "pepo"
}

beforeEach(async () => {
    await User.deleteMany({});
    user = new User(mockUser);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(mockUser.password, salt);
    await user.save();

    user = await User.findOne(user);
    token = await generarJWT(user.id);
    token = `Bearer ${token}`;
})

describe('POST /login', () => {

    test('Login correct', async () => {

        await request(api).post('/login')
            .send({
                username: mockUser.username,
                password: mockUser.password
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
            .expect(400)
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





