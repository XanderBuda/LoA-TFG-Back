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
 *     parameters:
 *     - name: type
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         enum: [ User, Team , Tournament] 
 *       description: El tipo donde se va subir la imagen en relacion a tu usuario
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary  
 *     responses: 
 *       200:
 *         description: File Upload
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: string
 *                   description: Indica true si ha ido bien y false si no
 *                 msg:
 *                    type: string
 *                    description: El mensaje del estado de la subida
 *                 fileName:
 *                    type: string 
 *                    description: El nombre del archivo guardado 
 *               example:     
 *                 ok: true
 *                 msg: File Upload
 *                 fileName: "569a5d50-7e94-4b83-858f-ce8f8a619bda.jpg" 
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido
 *       402:
 *         description: Invalid type valid types Team User Tournament
 *       403:
 *         description: Invalid extension valid extensions png jpg jpeg
 *       404:
 *         description: No files were uploaded. 
 *       500:
 *         description: Error al subir archivo + /custom_message/
 *       501:
 *         description: Error al mover la imagen   
 */
router.put('/:type',validarJWT,uploadController.fileUpload);

/**
 * @swagger
 * /upload/{type}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Recoge y muestra la imagen segun el tipo 
 *     tags: [Upload]
 *     parameters:
 *     - name: type
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *         enum: [ User, Team , Tournament] 
 *       description: El tipo donde se va cargar la imagen en relacion a tu usuario 
 *     responses:
 *       400:
 *         description: No existe web token
 *       401:
 *         description: Token no válido 
 *       200:
 *         description: Muesta la imagen
 *       500:
 *         description: Error al cargar archivo + /custom_message/  
 */
router.get('/:type',validarJWT,uploadController.getFile);


module.exports = router;