const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const router = Router();

const userController = require('../Controllers/user.controller');

router.get('/all', userController.getUsers);
router.get('/getTeam', userController.getTeam);
router.get('/:id?', userController.getUserById);
router.post('/new', validations.postUserChecks, userController.newUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);


module.exports = router;