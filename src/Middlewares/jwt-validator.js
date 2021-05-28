const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {

    // const token = req.header('x-token');

    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) return res.status(400).send({ message: 'No existe web token' });

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    try {

        const { _id } = jwt.verify(token, process.env.JWT_SECRETKEY);

        req.id = _id;

        next();

    } catch (error) {
        res.status(401).send({ message: 'Token no válido' });
    }


}

module.exports = { validarJWT };