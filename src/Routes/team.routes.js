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
 *     security:
 *       - bearerAuth: []
 *     summary: Devuelve todos los equipos
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
 *       404:
 *         description: No hay equipos
 *       500:
 *         description: ERROR al realizar la peticion + /custom_message/
 */

router.get('/all', validarJWT, teamController.getTeams);

/**
 * @swagger
 * /team/getTournament?name:
 *   get:
 *     parameters:
 *       - name: name
 *         in: query
 *         schema:
 *           type: string
 *         description: El nombre del torneo donde buscar al equipo
 *     security:
 *       - bearerAuth: []
 *     summary: Devuelve el torneo donde participa el equipo
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Torneo donde participa el equipo
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Tournament'
 *       404:
 *         description: Este equipo no participa en ningún torneo
 *       500:
 *         description: ERROR al realizar la peticion + /custom_message/
 */

router.get('/getTournament', validarJWT, teamController.getTournament);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: string
 *         description: El id del equipo a buscar
 *     security:
 *       - bearerAuth: []
 *     summary: Devuelve el equipo con dicho id
 *     tags: [Team] 
 *     responses:
 *       200:
 *         description: Equipo con id coincidente
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Team'
 *       404:
 *         description: El equipo no existe
 *       500:
 *         description: ERROR al realizar la peticion + /custom_message/
 */

router.get('/:id?', validarJWT, teamController.getTeam);
router.get('/numberOfUsers/:id', validarJWT, teamController.getNumberOfUsers);
router.post('/new', validarJWT, validations.postTeamChecks, teamController.createTeam);
router.put('/update/:id', validarJWT, teamController.editTeam);
router.put('/assignUser/:id', validarJWT, validations.putTeamUserChecks, teamController.assignUser);
router.put('/removeUser/:id', validarJWT, validations.putTeamUserChecks, teamController.removeUser);
// router.put('/assignAdmin/:id', teamController.assignAdmin);
router.delete('/delete', validarJWT, teamController.deleteTeam);

module.exports = router;

