const { Router } = require('express');
const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const router = Router();
const { login, renewToken } = require('../Controllers/auth.controller');

/**
  * @swagger
  * tags:
  *   name: Login
  *   description: Peticiones sobre autorizaciones
  */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de un usuario existente
 *     requestBody:
 *       description: Id del usuario a añadir al equipo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *             example:
 *               username: Pedro
 *               password: Léganes
 *     tags: [Login] 
 *     responses:
 *       200:
 *         description: Login correcto
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Authorization: 
 *                   type: string
 *                   description: Token generado al logear
 *               example:
 *                 Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmZmM1N2FmMWNlZjJhNDRmZGE3MGQiLCJpYXQiOjE2MjIxOTA5NDQsImV4cCI6MTYyMjIzNDE0NH0.oy4ultqjxWrNfJbptFd6jOapIGnw8haCpsFfhGCa9Pq
 *       402:
 *         description: La contraseña no es correcta
 *       404:
 *         description: El usuario no existe
 *       500:
 *         description: Error al realizar la peticion + /custom_message/
 */ 

router.post('/', validations.postLogin, login);

/**
 * @swagger
 * /login/renew:
 *   get:
 *     summary: Renovar token del usuario de la sesión
 *     security:
 *       - bearerAuth: []
 *     tags: [Login] 
 *     responses:
 *       200:
 *         description: Token renovado
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Authorization: 
 *                   type: string
 *                   description: Token renovado
 *               example:
 *                 token_renovado: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmZmM1N2FmMWNlZjJhNDRmZGE3MGQiLCJpYXQiOjE2MjIxOTA5NDQsImV4cCI6MTYyMjIzNDE0NH0.oy4ultqjxWrNfJbptFd6jOapIGnw8haCpsFfhGCa9Pq
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 */ 

router.get('/renew', validarJWT, renewToken);

module.exports = router;