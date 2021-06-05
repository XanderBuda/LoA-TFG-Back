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

/**
 * @swagger
 * /petition/userToAdmin?:
 *   post:
 *     summary: Crear una peticion para entrar a un equipo o a un torneo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: query
 *         schema:
 *           type: string
 *         description: El id del equipo
 *       - name: tournamentId
 *         in: query
 *         schema:
 *           type: string
 *         description: El id del torneo
 *     tags: [Petition] 
 *     responses:
 *       200:
 *         description: Muestra la petición
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Mensaje del estado de la peticion
 *               example:
 *                 message: Peticion creada correctamente
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
 *         description: No existe el elemento
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No existe el elemento
 *               example:
 *                 message: No existe el elemento
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
router.post('/userToAdmin',validarJWT,petitionController.createPetitionForUsers);

/**
 * @swagger
 * /petition/adminToUserForTeam?:
 *   post:
 *     summary: Crear peticion de un admin para que un usuario se una a su equipo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: query
 *         schema:
 *           type: string
 *         description: El id del equipo
 *     requestBody:
 *       description: Nombre de usuario a invitar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *             example:
 *               username: pepe2
 *     tags: [Petition] 
 *     responses:
 *       200:
 *         description: Muestra la petición
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Mensaje del estado de la peticion
 *               example:
 *                 message: Peticion creada correctamente
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
 *         description: No existe el elemento
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No existe el elemento
 *               example:
 *                 message: No existe el elemento
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
router.post('/adminToUserForTeam',validarJWT,validations.postPetitionAdminToUserForTeam,petitionController.createPetitionForAdminsTeam);

/**
 * @swagger
 * /petition/adminToUserForTournament?:
 *   post:
 *     summary: Crear peticion de un admin para que un equipo se una a su torneo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tournamentId
 *         in: query
 *         schema:
 *           type: string
 *         description: El id del torneo
 *     requestBody:
 *       description: Nombre del equipo a invitar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: EEP Esports
 *     tags: [Petition] 
 *     responses:
 *       200:
 *         description: Muestra la petición
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Mensaje del estado de la peticion
 *               example:
 *                 message: Peticion creada correctamente
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
 *         description: No existe el elemento
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No existe el elemento
 *               example:
 *                 message: No existe el elemento
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
router.post('/adminToUserForTournament',validarJWT,validations.postPetitionAdminToUserForTournament,petitionController.createPetitionForAdminsTournament);

/**
 * @swagger
 * /petition/closePetition/{id}:
 *   delete:
 *     summary: Elimina la petición
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id de la petición
 *     tags: [Petition] 
 *     responses:
 *       200:
 *         description: Equipo con id coincidente
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Mensaje del estado de petición
 *               example:
 *                 message: Peticion borrada
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
 *         description: La petición no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Mensaje del estado de petición
 *               example:
 *                 message: La petición no existe
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
 *                 message: Error al borrar la petición + /custom_message/
 */
router.delete('/closePetition/:id', validarJWT, petitionController.closePetition);

module.exports = router;