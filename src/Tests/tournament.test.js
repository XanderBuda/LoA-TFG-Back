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