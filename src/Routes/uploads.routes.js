const { Router } = require('express');
const expresFileUpload = require('express-fileupload');

const validations = require('../Middlewares/field-validator');
const { validarJWT } = require('../Middlewares/jwt-validator');
const uploadController = require('../Controllers/upload.controller');

const router = Router();

router.use(expresFileUpload());

router.put('/:type/:id',validarJWT,uploadController.fileUpload);
router.get('/:type/:img',validarJWT,uploadController.getFile);


module.exports = router;