const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();
const { login, renewToken } = require('../Controllers/auth.controller');

router.post('/', validations.postLogin, login);
router.get('/renew', validarJWT, renewToken);

module.exports = router;