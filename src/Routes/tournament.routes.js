const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const tournamentController = require('../Controllers/tournament.controller');

router.get('/all', validarJWT, tournamentController.getTournaments);
router.get('/:id?', validarJWT, tournamentController.getTournament);
router.get('/numberOfTeams/:id', validarJWT, tournamentController.getNumberOfTeams);
router.post('/new', validarJWT, validations.postTournamentChecks, tournamentController.saveTournament);
router.put('/update/:id', validarJWT, tournamentController.updateTournament);
router.put('/assignTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.assignTeam);
router.put('/removeTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.removeTeam);
// router.put('/assignAdmin/:id', tournamentController.assignAdmin);
router.delete('/delete', validarJWT, tournamentController.deleteTournament);

module.exports = router;