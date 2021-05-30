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

/**
 * @swagger
 * /tournament/all:
 *   get:
 *     summary: Devuelve todos los torneos
 *     security:
 *       - bearerAuth: []
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: La lista de torneos
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Tournament'
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
 *         description: No hay torneos
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No hay torneos
 *               example:
 *                 message: No hay torneos
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

router.get('/all', validarJWT, tournamentController.getTournaments);

/**
 * @swagger
 * /tournament/{id}:
 *   get:
 *     summary: Devuelve el torneo con dicho id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del torneo a buscar
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Torneo con id coincidente
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
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
 *         description: El torneo no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no existe
 *               example:
 *                 message: El torneo no existe
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

router.get('/:id?', validarJWT, tournamentController.getTournament);

/**
 * @swagger
 * /tournament/numberOfTeams/{id}:
 *   get:
 *     summary: Devuelve el número de equipos del torneo con dicho id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del torneo a buscar
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Número de equipos en el torneo
 *         content: 
 *           application/json:
 *             schema:
 *               type: number
 *               example: 8
 *       400:
 *         description: El torneo no tiene equipos
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no tiene equipos
 *               example:
 *                 message: El torneo no tiene equipos
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
 *         description: El torneo no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no existe
 *               example:
 *                 message: El torneo no existe
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

router.get('/numberOfTeams/:id', validarJWT, tournamentController.getNumberOfTeams);

/**
 * @swagger
 * /tournament/new:
 *   post:
 *     summary: Crea un nuevo torneo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Nombre del torneo a crear
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
 *               name: "Champions Legends"
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Torneo guardado correctamente
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Torneo guardado correctamente
 *               example:
 *                 message: Torneo guardado correctamente
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
 *       409:
 *         description: No se ha podido guardar el torneo
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: No se ha podido guardar el torneo
 *               example:
 *                 message: No se ha podido guardar el torneo
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

router.post('/new', validarJWT, validations.postTournamentChecks, tournamentController.saveTournament);

/**
 * @swagger
 * /tournament/update/{id}:
 *   put:
 *     summary: Actualiza datos del torneo con dicho id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del torneo a actualizar
 *     requestBody:
 *       description: Datos a actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tournament'
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Torneo actualizado
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
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
 *         description: El torneo no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no existe
 *               example:
 *                 message: El torneo no existe
 *       409:
 *         description: Tamaño de torneo no permitido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Tamaño de torneo no permitido
 *               example:
 *                 message: Tamaño de torneo no permitido
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

router.put('/update/:id', validarJWT, tournamentController.updateTournament);

/**
 * @swagger
 * /tournament/assignTeam/{id}:
 *   put:
 *     summary: Añade un equipo a un torneo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del torneo
 *     requestBody:
 *       description: Id del equipo a añadir al torneo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team: 
 *                 type: string
 *             required:
 *               - team
 *             example:
 *               team: 60aa843a3ea19e0015456f62
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Equipo con nuevo usuario añadido
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
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
 *         description: El torneo no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no existe
 *               example:
 *                 message: El torneo no existe
 *       409:
 *         description: "El torneo está lleno || El equipo ya está en el torneo"
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: "El torneo está lleno || El equipo ya está en el torneo"
 *               example:
 *                 message: El torneo está lleno
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

router.put('/assignTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.assignTeam);

/**
 * @swagger
 * /tournament/removeTeam/{id}:
 *   put:
 *     summary: Elimina un equipo de un torneo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del torneo
 *     requestBody:
 *       description: Id del equipo a eliminar del torneo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team: 
 *                 type: string
 *             required:
 *               - team
 *             example:
 *               team: 60aa843a3ea19e0015456f62
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Equipo sin el equipo eliminado
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tournament'
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
 *         description: El torneo no existe
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no existe
 *               example:
 *                 message: El torneo no existe
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

router.put('/removeTeam/:id', validarJWT, validations.putTournamentTeamChecks, tournamentController.removeTeam);
// router.put('/assignAdmin/:id', tournamentController.assignAdmin);

/**
 * @swagger
 * /tournament/delete:
 *   delete:
 *     summary: Elimina el torneo que administre el usuario del token activo
 *     security:
 *       - bearerAuth: []
 *     tags: [Tournament] 
 *     responses:
 *       200:
 *         description: Torneo eliminado correctamente
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: Torneo eliminado correctamente
 *               example:
 *                 message: Torneo eliminado correctamente
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
 *       409:
 *         description: El torneo no se puede eliminar
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   description: El torneo no se puede eliminar
 *               example:
 *                 message: El torneo no se puede eliminar
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
router.delete('/delete', validarJWT, tournamentController.deleteTournament);

module.exports = router;