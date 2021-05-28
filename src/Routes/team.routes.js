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
 *         image:
 *           type: string
 *           description: Es nombre (codificado) con que el se guarda la imagen del equipo en BBDD
 *           default: null   
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
 *          
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
router.get('/all', teamController.getTeams);
router.get('/getTournament', teamController.getTournament);
router.get('/:id?', teamController.getTeam);
router.get('/numberOfUsers/:id', teamController.getNumberOfUsers);
router.post('/new', validarJWT, validations.postTeamChecks, teamController.createTeam);
router.put('/update/:id', validarJWT, teamController.editTeam);
router.put('/assignUser/:id', validations.putTeamUserChecks, teamController.assignUser);
router.put('/removeUser/:id', validarJWT, validations.putTeamUserChecks, teamController.removeUser);
// router.put('/assignAdmin/:id', teamController.assignAdmin);
router.delete('/delete/:id', validarJWT, teamController.deleteTeam);

module.exports = router;

