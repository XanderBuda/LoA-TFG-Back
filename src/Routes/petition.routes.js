const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();

const petitionController = require('../Controllers/petition.controller');


/**
 * @swagger
 * components:
 *   schemas:
 *     Petition:
 *       type: object
 *       required:
 *         - emitter
 *         - adminReason
 *         - receiver
 *       properties:
 *         emitter:
 *           type: object
 *           description: El emisor de la peticion
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: El ID del usuario que emite la peticion
 *         adminReason:
 *           type: object
 *           description: Quien es admin del team o torneo de la peticion
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: El ID del usuario dueño del equipo o torneo
 *         receiver:
 *           type: object
 *           description: El receptor de la peticion
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: El ID del receptor de la peticion
 *         reasonTeam:
 *           type: object
 *           description: Que equipo esta implicado en la peticion
 *           properties:
 *             id:
 *               type: string
 *               description: El ID del team implicado en la peticion
 *               default: null
 *         reasonTournament:
 *           type: object
 *           description: Que torneo esta implicado en la peticion
 *           properties:
 *             id:
 *               type: string
 *               description: El ID del torneo implicado en la peticion
 *               default: null    
 *       example:
 *         emitter: 60aa843a3ea19e0015456f65
 *         adminReason: 60aa843a3ea19e0015456f65
 *         receiver: 60aa848d3ea19e0015456f66
 *         reasonTeam: 60aa920f3ea19e0015456f6e
 *         reasonTournament: null
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
  *   name: Petition
  *   description: Peticiones sobre invitaciones entre usuarios
  */

router.post('/userToAdmin',validarJWT,petitionController.createPetitionForUsers);
router.post('/adminToUserForTeam',validarJWT,validations.postPetitionAdminToUserForTeam,petitionController.createPetitionForAdminsTeam);
router.post('/adminToUserForTournament',validarJWT,validations.postPetitionAdminToUserForTournament,petitionController.createPetitionForAdminsTournament);
router.delete('/closePetition/:id', validarJWT, petitionController.closePetition);

module.exports = router;