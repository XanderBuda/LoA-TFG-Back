const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../Helpers/jwt');

const login = async (req, res) => {

    const { username, password } = req.body;

    try {

        const userDB = await User.findOne({ username });
        if (!userDB) return res.status(404).send({ message: `El usuario no existe` });

        //verificar contraseña
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) return res.status(400).send({ message: `La contraseña no es correcta` });

        let token = await generarJWT(userDB.id);
        token = `Bearer ${token}`;

        res.status(200).json({ message: 'Login correcto', Authorization: token });

    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` });
    }
}

const renewToken = async (req, res) => {
    const _id = req.id;

    try {

        let token = await generarJWT(_id);
        token = `Bearer ${token}`;

        res.status(200).json({ token_renovado: token });
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` });
    }

}
module.exports = { login, renewToken };