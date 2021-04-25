const { Router } = require('express');
const router = Router();

const userController = require('../Controllers/usuarioController');

router.get('/:id?', userController.getUserById);
router.get('/all', userController.getUsers);
router.post('/new', userController.newUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;