const jwt = require('jsonwebtoken');
const validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if (!token) return res.status(401).send({ message: 'No existe web token' });

    try {

        const { _id } = jwt.verify(token, process.env.JWT_SECRETKEY);

        req.id = _id;
        
        next();

    } catch (error) {
        res.status(401).send({ message: 'Token no válido' });
    }


}

module.exports = { validarJWT };