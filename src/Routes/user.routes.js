const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const userController = require('../Controllers/user.controller');

//validarJWT protege las rutas exigiendo un token en los headers de la petición

/**
 * @swagger
 * /all:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/all', validarJWT, userController.getUsers);

router.get('/getTeam', userController.getTeam);
router.get('/getAllPetitionsForTheUser', validarJWT ,userController.getAllPetitionsForTheUser);
router.get('/:id?', userController.getUserById);
router.post('/new', validations.postUserChecks, userController.newUser);
router.put('/update/:id', validarJWT, userController.updateUser);
router.delete('/delete/:id', validarJWT, userController.deleteUser);


module.exports = router;