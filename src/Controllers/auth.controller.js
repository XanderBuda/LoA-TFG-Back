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

        let token = await generarJWT(userDB.id);
        token = `Bearer ${token}`;

        res.status(200).json({ message: 'Login correcto', Authorization: token });

    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

const renewToken = async (req, res) => {
    const _id = req.id;
    let token = await generarJWT(_id);
    token = `Bearer ${token}`;

    res.status(200).json({token_renovado:token});

}
module.exports = { login, renewToken };