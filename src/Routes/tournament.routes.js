const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const tournamentController = require('../Controllers/tournament.controller');


/**
 * @swagger
 * components:
 *   schemas:
 *     Tournament:
 *       type: object
 *       required:
 *         - name
 *         - admin
 *         - size
 *       properties:
 *         id:
 *           type: string
 *           description: Autogenerado al guardar en BBDD
 *           unique: true
 *         name:
 *           type: string
 *           description: Es el nombre del torneo
 *           unique: true   
 *         admin:
 *           type: object
 *           description: Es el administrador del torneo
 *           unique: true  
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: Autogenerado al guardar en BBDD
 *               unique: true
 *         teams:
 *           type: array
 *           description: Equipos participantes del torneo
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Autogenerado al guardar en BBDD
 *                 unique: true
 *         logo:
 *           type: string
 *           description: Es nombre (codificado) con que el se guarda el logo del torneo en BBDD
 *           default: null   
 *         size:
 *           type: number 
 *           enum: [4, 8, 16]
 *       example:
 *         id: 60aa920f3ea19e0015456f67
 *         name: League of Champions
 *         admin: 60aa843a3ea19e0015456f62
 *         teams: [60aa843a3ea19e0015456f62, 60aa920f3ea19e0015456f6e, 60aa920f5ea19e0015456f6e]
 *         logo: 0d28fbce-ec0d-43d2-a197-b74328729d1a.png
 *         size: 4   
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
  *   name: Tournament
  *   description: Peticiones sobre el torneo
  */

router.get('/all', validarJWT, tournamentController.getTournaments);
router.get('/:id?', validarJWT, tournamentController.getTournament);
router.get('/numberOfTeams/:id', validarJWT, tournamentController.getNumberOfTeams);
router.post('/new', validarJWT, validations.postTournamentChecks, tournamentController.saveTournament);
router.put('/update/:id', validarJWT, tournamentController.updateTournament);
router.put('/assignTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.assignTeam);
router.put('/removeTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.removeTeam);
// router.put('/assignAdmin/:id', tournamentController.assignAdmin);
router.delete('/delete', validarJWT, tournamentController.deleteTournament);

module.exports = router;