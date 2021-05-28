const { Router } = require('express');
const expresFileUpload = require('express-fileupload');

const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const uploadController = require('../Controllers/upload.controller');

const router = Router();

router.use(expresFileUpload());

/**
  * @swagger
  * tags:
  *   name: Upload
  *   description: Peticiones sobre subidas de archivos
  */

/**
 * @swagger
 * /upload/{type}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Subir una imagen segun el tipo
 *     tags: [Upload]
 *     path:
 *       name: string   
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

router.put('/:type',validarJWT,uploadController.fileUpload);
router.get('/:type',validarJWT,uploadController.getFile);


module.exports = router;