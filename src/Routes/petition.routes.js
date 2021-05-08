const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const petitionController = require('../Controllers/petition.controller');

router.post('/userToAdmin',validarJWT,petitionController.createPetitionForUsers);

module.exports = router;