const jwt = require('jsonwebtoken');

const generarJWT = (_id) => {

    return new Promise((resolve, reject) => {
        const payload = { _id };
        jwt.sign(payload, process.env.JWT_SECRETKEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) return reject('No se pudo generar el JWT');

            resolve(token);
        });
    });

}

module.exports = { generarJWT };