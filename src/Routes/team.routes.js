const { Router } = require('express');
const router = Router();

const teamController = require('../Controllers/team.controller');

router.get('/all', teamController.getTeams);
router.get('/getTournament', teamController.getTournament);
router.get('/:id?', teamController.getTeam);
router.get('/numberOfUsers/:id', teamController.getNumberOfUsers);
router.post('/new', teamController.createTeam);
router.put('/update/:id', teamController.editTeam);
router.put('/assignUser/:id', teamController.assignUser);
router.put('/removeUser/:id', teamController.removeUser);
router.put('/assignAdmin/:id', teamController.assignAdmin);
router.delete('/delete/:id', teamController.deleteTeam);

module.exports = router;

