const { Router } = require('express');
const router = Router();

const tournamentController = require('../Controllers/tournament.controller');

router.get('/all', tournamentController.getTournaments);
router.get('/:id?', tournamentController.getTournament);
router.post('/new', tournamentController.saveTournament);
router.put('/update/:id', tournamentController.updateTournament);
router.delete('/delete/:id', tournamentController.deleteTournament);

module.exports = router;