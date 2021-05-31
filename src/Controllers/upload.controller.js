const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage, getImage } = require('../Helpers/update-image');

const uploadController = {};

uploadController.fileUpload = (req, res = response) => {

    try {
        const type = req.params.type;
        const _id = req.id;

        const validTypes = ['Team', 'User', 'Tournament'];

        //Valida que es de un tipo valido
        if (!validTypes.includes(type)) {
            return res.status(409).json({
                ok: false,
                msg: 'Invalid type (valid types: Team, User, Tournament)'
            });
        }

        
        // Valida que existe un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({
                ok: false,
                msg: 'No files were uploaded.'
            });
        }
        
        // Procesar la imagen
        const file = req.files.image;

        const shortName = file.name.split('.');
        const fileExtension = shortName[shortName.length - 1];

        //Validar extensión
        const validExtensions = ['png', 'jpg', 'jpeg'];
        if (!validExtensions.includes(fileExtension)) {
            return res.status(409).send({
                ok: false,
                msg: 'Invalid extension (valid extensions: png, jpg, jpeg)'
            });
        }

        //Generar el nombre del archivo
        const fileName = `${uuidv4()}.${fileExtension}`;

        //Path para guardar la imagen
        const path = `./src/Uploads/${type}/${fileName}`;

        //Mover la imagen
        file.mv(path, (err) => {
            if (err) {
                
                return res.status(501).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
            }

            //Actualiar base de datos
            updateImage(type, _id, fileName);

            res.json({
                ok: true,
                msg: 'File Upload',
                fileName
            });
        });


    } catch (error) {
        res.status(500).json({ message: `Error al subir archivo: ${error}` });
    }
};

uploadController.getFile = async (req, res = response) => {

    try {
        const type = req.params.type;
        const _id = req.id

        let pathImg = await getImage(type, _id);
        
        
        if (fs.existsSync(pathImg)) {
            res.sendFile(pathImg);
        } else {
            // Imagen por defecto si no existiera
            pathImg = path.join(__dirname, `../Uploads/no-img.jpg`);
            res.sendFile(pathImg);
        }



    } catch (error) {
        res.status(500).json({ message: `Error al cargar archivo: ${error}` });
    }
};

module.exports = uploadController;