const request = require('supertest');
const { api } = require('../index');
const { generarJWT } = require('../Helpers/jwt');
const User = require('../Models/User');
var token, user, userNoPic,tokenNoPic;

var mockUser = {
    username: "Pepo",
    email: "pepo@gmail.com",
    password: "pepo",
    picture: "8f1308f1-849a-453a-ab12-5e4281696462.jpg"
}
var mockUserNotPicture = {
    username: "Pepi",
    email: "pepi@gmail.com",
    password: "pepo",
    picture: null

}


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