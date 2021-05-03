const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const tournamentController = require('../Controllers/tournament.controller');

router.get('/all', tournamentController.getTournaments);
router.get('/:id?', tournamentController.getTournament);
router.get('/numberOfTeams/:id', tournamentController.getNumberOfTeams);
router.post('/new', validarJWT, validations.postTournamentChecks, tournamentController.saveTournament);
router.put('/update/:id', validarJWT, tournamentController.updateTournament);
router.put('/assignTeam/:id', validations.putTournamentTeamChecks, tournamentController.assignTeam);
router.put('/removeTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.removeTeam);
// router.put('/assignAdmin/:id', tournamentController.assignAdmin);
router.delete('/delete/:id', validarJWT, tournamentController.deleteTournament);

module.exports = router;