const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const userController = require('../Controllers/user.controller');

//validarJWT protege las rutas exigiendo un token en los headers de la petición

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: Autogenerado al guardar en BBDD
 *           unique: true
 *         username:
 *           type: string
 *           description: Es el nombre de usuario que tendra en la app
 *           unique: true   
 *         picture:
 *           type: string
 *           description: Es nombre (codificado) con que el se guardar en BBDD
 *           default: null   
 *         email:
 *           type: string
 *           description: Es el correo del usuario
 *           unique: true   
 *         password:
 *           type: string
 *           description: Es la clave con la que iniciara sesion el usuario (en BBDD estara encriptada)
 *         statistics:
 *             
 *           properties:
 *             victories:
 *               description: Las victorias que tiene el usuario 
 *               type: Number
 *               default: 0
 *             defeats:
 *               description: Las derrotas que tiene el usuario 
 *               type: Number
 *               default: 0  
 *             rankingpoints:
 *               description: Los puntos que tiene el usuario en la clasificacion de la app
 *               type: Number
 *               default: 0     
 *         elo:
 *           type: string
 *           description: Es en la division que se encuentra el usuario
 *           default: null   
 *         roles: 
 *           properties:
 *              first:
 *                type: string
 *                description: Primer rol que prefiere el usuario
 *                enum:
 *                  - Toplane
 *                  - Jungle
 *                  - Midlane 
 *                  - Adc
 *                  - Support
 *                default: null
 *              second:
 *                type: string
 *                description: Segundo rol que prefiere el usuario
 *                enum:
 *                - Toplane
 *                - Jungle
 *                - Midlane 
 *                - Adc
 *                - Support
 *                default: null       
 *       example:
 *         id: 60aa843a3ea19e0015456f65
 *         username: pepe2
 *         picture: 0d28fbce-ec0d-43d2-a197-b74328729d1a.png
 *         email: pepe2@gmail.com
 *         password: $2a$10$v.nd2t0XluIYjpVBrdVuzu1cCHFJmc52FF0t4Abf85KfGiof1vjnq
 *         statistics:
 *           victories: 15
 *           defeats: 8
 *           rankingpoints: 260      
 *         elo: Silver 2
 *         roles:
 *           first: Toplane
 *           second: Adc
 *     
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *        
 */

/**
  * @swagger
  * tags:
  *   name: User
  *   description: Peticiones sobre el usuario
  */

/**
 * @swagger
 * /user/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Devuelve todos los usuarios
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: La lista de usuarios
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 *       404:
 *         description: No hay usuarios
 *       500:
 *         description: ERROR al realizar la peticion  
 */
router.get('/all', validarJWT, userController.getUsers);
router.get('/getTeam', userController.getTeam);
router.get('/getAllPetitionsForTheUser', validarJWT, userController.getAllPetitionsForTheUser);
router.get('/:id?', userController.getUserById);
router.post('/new', validations.postUserChecks, userController.newUser);
router.put('/update/:id', validarJWT, userController.updateUser);
router.delete('/delete/:id', validarJWT, userController.deleteUser);


module.exports = router;