const { Router } = require('express');
const router = Router();

const userController = require('../Controllers/user.controller');

router.get('/all', userController.getUsers);
router.get('/:id?', userController.getUserById);
router.post('/new', userController.newUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;