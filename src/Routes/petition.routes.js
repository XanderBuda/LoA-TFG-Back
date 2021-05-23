const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const petitionController = require('../Controllers/petition.controller');

router.post('/userToAdmin',validarJWT,petitionController.createPetitionForUsers);
router.post('/adminToUserForTeam',validarJWT,validations.postPetitionAdminToUserForTeam,petitionController.createPetitionForAdminsTeam);
router.post('/adminToUserForTournament',validarJWT,validations.postPetitionAdminToUserForTournament,petitionController.createPetitionForAdminsTournament);
router.delete('/closePetition/:id', validarJWT, petitionController.closePetition);

module.exports = router;