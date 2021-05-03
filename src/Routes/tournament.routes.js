const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const router = Router();

const tournamentController = require('../Controllers/tournament.controller');

router.get('/all', tournamentController.getTournaments);
router.get('/:id?', tournamentController.getTournament);
router.get('/numberOfTeams/:id', tournamentController.getNumberOfTeams);
router.post('/new', validations.postTournamentChecks, tournamentController.saveTournament);
router.put('/update/:id', tournamentController.updateTournament);
router.put('/assignTeam/:id', tournamentController.assignTeam);
router.put('/removeTeam/:id', tournamentController.removeTeam);
router.put('/assignAdmin/:id', tournamentController.assignAdmin);
router.delete('/delete/:id', tournamentController.deleteTournament);

module.exports = router;