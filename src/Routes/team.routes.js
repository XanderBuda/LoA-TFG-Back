const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const teamController = require('../Controllers/team.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       required:
 *         - name
 *         - admin
 *       properties:
 *         id:
 *           type: string
 *           description: Autogenerado al guardar en BBDD
 *           unique: true
 *         name:
 *           type: string
 *           description: Es el nombre del equipo
 *           unique: true   
 *         admin:
 *           type: object
 *           description: Es el administrador del equipo
 *           unique: true  
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: Autogenerado al guardar en BBDD
 *               unique: true
 *         users:
 *           type: array
 *           description: Integrantes del equipo
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Autogenerado al guardar en BBDD
 *                 unique: true
 *         image:
 *           type: string
 *           description: Es nombre (codificado) con que el se guarda la imagen del equipo en BBDD
 *           default: null   
 *         statistics:
 *             
 *           properties:
 *             victories:
 *               description: Las victorias que tiene el equipo 
 *               type: Number
 *               default: 0
 *             defeats:
 *               description: Las derrotas que tiene el equipo 
 *               type: Number
 *               default: 0  
 *             rankingpoints:
 *               description: Los puntos que tiene el equipo en la clasificacion de la app
 *               type: Number
 *               default: 0     
 *          
 *       example:
 *         id: 60aa920f3ea19e0015456f67
 *         name: Crazy Romanians
 *         admin: 60aa843a3ea19e0015456f62
 *         users: [60aa843a3ea19e0015456f62, 60aa920f3ea19e0015456f6e]
 *         image: 0d28fbce-ec0d-43d2-a197-b74328729d1a.png
 *         statistics:
 *           victories: 13
 *           defeats: 4
 *           rankingpoints: 230      
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
  *   name: Team
  *   description: Peticiones sobre el equipo
  */

/**
 * @swagger
 * /team/all:
 *   get:
 *     summary: Devuelve todos los equipos
 *     security:
 *       - bearerAuth: []
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: La lista de equipos
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Team'
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       404:
 *         description: No hay equipos
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.get('/all', validarJWT, teamController.getTeams);

/**
 * @swagger
 * /team/getTournament?name:
 *   get:
 *     summary: Devuelve el torneo donde participa el equipo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre del torneo
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Torneo donde participa el equipo
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       404:
 *         description: Este equipo no participa en ningún torneo
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.get('/getTournament', validarJWT, teamController.getTournament);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     summary: Devuelve el equipo con dicho id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del equipo a buscar
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo con id coincidente
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       404:
 *         description: El equipo no existe
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.get('/:id?', validarJWT, teamController.getTeam);

/**
 * @swagger
 * /team/numberOfUsers/{id}:
 *   get:
 *     summary: Devuelve el número de integrantes del equipo con dicho id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del equipo a buscar
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo con id coincidente
 *         content: 
 *           application/json:
 *             schema:
 *               type: number
 *               example: 3
 *       402:
 *         description: El equipo no tiene usuarios
 *       404:
 *         description: El equipo no existe
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.get('/numberOfUsers/:id', validarJWT, teamController.getNumberOfUsers);

/**
 * @swagger
 * /team/new:
 *   post:
 *     summary: Crea un nuevo equipo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Nombre del equipo a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *             required:
 *               - name
 *             example:
 *               name: "Los más noobs"
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo guardado correctamente
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.post('/new', validarJWT, validations.postTeamChecks, teamController.createTeam);

/**
 * @swagger
 * /team/update/{id}:
 *   put:
 *     summary: Actualiza datos del equipo con dicho id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del equipo a actualizar
 *     requestBody:
 *       description: Datos a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo actualizado
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       404:
 *         description: El equipo no existe
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.put('/update/:id', validarJWT, teamController.editTeam);

/**
 * @swagger
 * /team/assignUser/{id}:
 *   put:
 *     summary: Añade un usuario a un equipo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del equipo
 *     requestBody:
 *       description: Id del usuario a añadir al equipo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user: 
 *                 type: string
 *             required:
 *               - user
 *             example:
 *               user: 60aa843a3ea19e0015456f62
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo con nuevo usuario añadido
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       402:
 *         description: El equipo está lleno
 *       403:
 *         description: El usuario ya está en el equipo
 *       404:
 *         description: El equipo no existe
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.put('/assignUser/:id', validarJWT, validations.putTeamUserChecks, teamController.assignUser);

/**
 * @swagger
 * /team/removeUser/{id}:
 *   put:
 *     summary: Elimina un usuario de un equipo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del equipo
 *     requestBody:
 *       description: Id del usuario a eliminar del equipo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user: 
 *                 type: string
 *             required:
 *               - user
 *             example:
 *               user: 60aa843a3ea19e0015456f62
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo sin el usuario eliminado
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Team'
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       402:
 *         description: El administrador no se puede eliminar del equipo
 *       403:
 *         description: El equipo no existe
 *       404:
 *         description: El usuario no se puede eliminar del equipo
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */

router.put('/removeUser/:id', validarJWT, validations.putTeamUserChecks, teamController.removeUser);
// router.put('/assignAdmin/:id', teamController.assignAdmin);

/**
 * @swagger
 * /team/delete:
 *   delete:
 *     summary: Elimina el equipo que administre el usuario del token activo
 *     security:
 *       - bearerAuth: []
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo eliminado correctamente
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       404:
 *         description: El equipo no se puede eliminar
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */
router.delete('/delete', validarJWT, teamController.deleteTeam);

module.exports = router;

