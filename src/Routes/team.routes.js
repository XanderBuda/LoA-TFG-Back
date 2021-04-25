const { Router } = require('express');
const router = Router();

const teamController = require('../Controllers/team.controller');

router.get('/all', teamController.getTeams);
router.get('/:id?', teamController.getTeam);
router.post('/new', teamController.createTeam);
router.put('/update/:id', teamController.editTeam);
router.delete('/delete/:id', teamController.deleteTeam);

module.exports = router;