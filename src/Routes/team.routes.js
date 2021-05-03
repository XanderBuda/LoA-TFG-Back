const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const teamController = require('../Controllers/team.controller');

router.get('/all', teamController.getTeams);
router.get('/getTournament', teamController.getTournament);
router.get('/:id?', teamController.getTeam);
router.get('/numberOfUsers/:id', teamController.getNumberOfUsers);
router.post('/new', validarJWT, validations.postTeamChecks, teamController.createTeam);
router.put('/update/:id', validarJWT, teamController.editTeam);
router.put('/assignUser/:id', validations.putTeamUserChecks, teamController.assignUser);
router.put('/removeUser/:id', validarJWT, validations.putTeamUserChecks, teamController.removeUser);
// router.put('/assignAdmin/:id', teamController.assignAdmin);
router.delete('/delete/:id', validarJWT, teamController.deleteTeam);

module.exports = router;

