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
 *           description: Es nombre (codificado) con que el se guarda en BBDD
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
 *         elo: Silver II
 *         roles:
 *           first: Toplane
 *           second: Adc
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
 *         description: Muestra la lista de usuarios
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 *       400:
 *         description: No existe web token
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No existe web token
 *               example:
 *                 message: No existe web token 
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido 
 *       404:
 *         description: No hay usuarios
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No hay usuarios
 *               example:
 *                 message: No hay usuarios
 *       500:
 *         description: ERROR al realizar la petición + /custom_message/
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/   
 */
router.get('/all', validarJWT, userController.getUsers);

/**
 * @swagger
 * /user/getTeam?username:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Devuelve el equipo al que pertenece un usuario
 *     tags: [User] 
 *     parameters:
 *       - name: username
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre de usuario a buscar
 *     responses:
 *       200:
 *         description: Muestra el equipo al que pertenece el usuario
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: No existe web token
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No existe web token
 *               example:
 *                 message: No existe web token
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido 
 *       404:
 *         description: Este usuario no tiene equipo
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Este usuario no tiene equipo
 *               example:
 *                 message: Este usuario no tiene equipo
 *       500:
 *         description: ERROR al realizar la peticion + /custom_message/
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/   
 */
router.get('/getTeam', validarJWT, userController.getTeam);

/**
 * @swagger
 * /user/getAllPetitionsForTheUser:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Devuelve todas las peticiones que tiene un usuario
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Muestra las peticiones que tiene el usuario
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:  
 *                 $ref: '#/components/schemas/Petition'
 *       204:
 *         description: Este usuario no tiene peticiónes pendientes
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Este usuario no tiene peticiónes pendientes
 *               example:
 *                 message: Este usuario no tiene peticiónes pendientes
 *       400:
 *         description: No existe web token
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No existe web token
 *               example:
 *                 message: No existe web token
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido 
 *       500:
 *         description: ERROR al realizar la peticion + /custom_message/
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/   
 */
router.get('/getAllPetitionsForTheUser', validarJWT, userController.getAllPetitionsForTheUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca un usuario por una id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del usuario a buscar
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Devuelve el usuario con ese id
 *         content: 
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: "Error: Bad Request"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: "Error: Bad Request"
 *               example:
 *                 message: No existe web token
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido
 *       404:
 *         description: El usuario no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El usuario no existe
 *               example:
 *                 message: El usuario no existe
 *       500:
 *         description: Error del servidor
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/
 */
router.get('/:id', validarJWT, userController.getUserById);

/**
 * @swagger
 * /user/new:
 *   post:
 *     summary: Crea un nuevo usuario
 *     requestBody:
 *       description: Nombre del usuario a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               email: 
 *                 type: string
 *               password: 
 *                 type: string  
 *             required:
 *               - username
 *               - email
 *               - password
 *             example:
 *               username: "Legonas34566"
 *               email: "antonio05@gmail.com"
 *               password: "12345"
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Muestra el usuario creado y logeado
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 picture:
 *                   type: string
 *                 email:
 *                   type: string 
 *                 password:
 *                   type: string
 *                 statistics:
 *                   properties:
 *                     victories:
 *                       type: Number
 *                     defeats:
 *                       type: Number
 *                     rankingpoints:
 *                       type: Number
 *                 elo:
 *                   type: string
 *                 roles: 
 *                   properties:
 *                     first:
 *                       type: string
 *                     second:
 *                       type: string
 *                 autorization: 
 *                   type: string      
 *               example:
 *                 id: 60aa843a3ea19e0015456f65
 *                 username: pepe2
 *                 picture: 0d28fbce-ec0d-43d2-a197-b74328729d1a.png
 *                 email: pepe2@gmail.com
 *                 password: $2a$10$v.nd2t0XluIYjpVBrdVuzu1cCHFJmc52FF0t4Abf85KfGiof1vjnq
 *                 statistics:
 *                   victories: 15
 *                   defeats: 8
 *                   rankingpoints: 260      
 *                 elo: Silver 2
 *                 roles:
 *                  first: Toplane
 *                  second: Adc
 *                 Autorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI3ZTg1ZTAyZmM5YzUyZTQ0ZGIxNDkiLCJpYXQiOjE2MjI2NjUzMTAsImV4cCI6MTYyMjcwODUxMH0.jB5mc_gGs_Sk8wRPd9QbzKlk2fZRr8ZtVVK4Nze6zYw
 *       400:
 *         description: "Error: Bad Request"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: "Error: Bad Request"
 *               example:
 *                 message: Formato incorrecto
 *       409:
 *         description: No se ha podido guardar el usuario
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No se ha podido guardar el usuario
 *               example:
 *                 message: No se ha podido guardar el usuario
 *       500:
 *         description: Error del servidor
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/
 */
router.post('/new', validations.postUserChecks, userController.newUser);

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Actualiza el perfil de un usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Atributos del usuario que quieras modificar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statistics:
 *                 properties:
 *                   victories:
 *                     type: Number
 *                   defeats:
 *                     type: Number
 *                   rankingpoints:
 *                     type: Number
 *                 roles: 
 *                   properties:
 *                     first:
 *                       type: string
 *                     second:
 *                       type: string
 *             example:
 *               statistics:
 *                 victories: 15
 *                 defeats: 8
 *                 rankingpoints: 260      
 *               roles:
 *                 first: Toplane
 *                 second: Adc
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Muestra el usuario con los datos actualizados
 *         content: 
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: "Error: Bad Request"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: "Error: Bad Request"
 *               example:
 *                 message: No existe web token
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido
 *       404:
 *         description: El usuario no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El usuario no existe
 *               example:
 *                 message: El usuario no existe
 *       500:
 *         description: Error del servidor
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/
 */
router.put('/update', validarJWT, userController.updateUser);

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Borra el usuario
 *     security:
 *       - bearerAuth: []
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Borra el usuario y muestra mensaje informativo
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Usuario borrado
 *               example:
 *                 message: Usuario borrado
 *       400:
 *         description: "Error: Bad Request"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: "Error: Bad Request"
 *               example:
 *                 message: No existe web token
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido
 *       404:
 *         description: El usuario no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El usuario no existe
 *               example:
 *                 message: El usuario no existe
 *       500:
 *         description: Error del servidor
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/
 */
router.delete('/delete', validarJWT, userController.deleteUser);

/**
 * @swagger
 * /user/updateElo/{riotToken}:
 *   put:
 *     summary: Actualiza el elo del usuario a traves de su usuario en el LOL
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: riotToken
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: API KEY de Riot para poder usar su api
 *     requestBody:
 *       description: Nombre de usuario en LOL del usuario
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usernameLOL:
 *                 type: string
 *             example:
 *               usernameLOL: IronPepe
 *     tags: [User] 
 *     responses:
 *       200:
 *         description: Devuelve el usuario con el elo actualizado
 *         content: 
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: "Error: Bad Request"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: "Error: Bad Request"
 *               example:
 *                 message: No existe web token
 *       401:
 *         description: Token no válido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Token no válido
 *               example:
 *                 message: Token no válido
 *       404:
 *         description: El usuario no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El usuario no existe
 *               example:
 *                 message: El usuario no existe
 *       500:
 *         description: Error del servidor
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Error al realizar la petición
 *               example:
 *                 message: Error al realizar la petición + /custom_message/
 */
router.put('/updateElo/:riotToken', validarJWT, userController.updateElo);

module.exports = router;