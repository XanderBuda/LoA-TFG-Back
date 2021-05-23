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
        if (!validPassword) return res.status(404).send({ message: `Las contraseñas no coinciden` });

        const token = await generarJWT(userDB.id);

        res.status(200).json({ message: 'Login correcto', token: token });

    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

const renewToken = async (req, res) => {
    const _id = req.id;
    const token = await generarJWT(_id);

    res.status(200).json({token_renovado:token});

}
module.exports = { login, renewToken };