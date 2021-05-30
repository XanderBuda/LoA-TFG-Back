const request = require('supertest');
const { api } = require('../index');
const User = require('../Models/User');

beforeEach(async () => {

    await User.deleteMany({})
})


test('Should sign up for a user', async () => {

    await request(api).post('/user/new')
        .send({
            username: "Pepo",
            email: "pepo@gmail.com",
            password: "pepo"
        })
        .expect(200)
})