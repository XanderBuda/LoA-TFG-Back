const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const router = Router();
const { login } = require('../Controllers/auth.controller');

router.post('/', validations.postLogin, login);

module.exports = router;