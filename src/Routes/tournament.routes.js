const { Router } = require('express');
const router = Router();

const tournamentController = require('../Controllers/torneoController');

router.get('/:id?', tournamentController.getTournament);
router.get('/all', tournamentController.getTournaments);
router.post('/new', tournamentController.saveTournament);
router.put('/update/:id', tournamentController.updateTournament);
router.delete('/delete/:id', tournamentController.deleteTournament);

module.exports = router;