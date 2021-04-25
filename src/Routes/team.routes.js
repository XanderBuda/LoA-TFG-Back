const { Router } = require('express');
const router = Router();

const teamController = require('../Controllers/equipoController');

router.get('/:id?', teamController.getTeam);
router.get('/all', teamController.getTeams);
router.post('/new', teamController.saveTeam);
router.put('/update/:id', teamController.updateTeam);
router.delete('/delete/:id', teamController.deleteTeam);

module.exports = router;