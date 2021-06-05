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
 *       description: El tipo de esquema donde se va subir la imagen en relacion a tu usuario
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
 *                   type: boolean
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
 *         description: Extensión no válida o tipo no valido
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                   description: Indica true si ha ido bien y false si no
 *                 msg:
 *                    type: string
 *                    description: El mensaje del estado de la subida
 *               example:
 *                 ok: false
 *                 msg: "Invalid extension (valid extensions: png, jpg, jpeg)"
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
 *       501:
 *         description: Error al mover la imagen
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                   description: Indica true si ha ido bien y false si no
 *                 msg:
 *                    type: string
 *                    description: El mensaje del estado de la subida
 *               example:
 *                 ok: false
 *                 msg: Error al mover la imagen
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
 *       description: El tipo de esquema donde se va cargar la imagen en relacion a tu usuario 
 *     responses:
 *       200:
 *         description: Muestra la imagen
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
 *         description: Extensión no válida
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: 
 *                   type: boolean
 *                   description: Indica true si ha ido bien y false si no
 *                 msg:
 *                    type: string
 *                    description: El mensaje del estado de la subida
 *               example:
 *                 ok: false
 *                 msg: "Invalid type (valid extensions: User, Team, Tournament)"   
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
router.get('/:type',validarJWT,uploadController.getFile);


module.exports = router;