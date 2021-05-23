const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../Helpers/update-image');

const uploadController = {};

uploadController.fileUpload = (req, res = response) => {

    try {
        const type = req.params.type;
        const id = req.params.id;

        const validTypes = ['Team', 'User', 'Tournament'];

        //Valida que es de un tipo valido
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid type (valid types: Team, User, Tournament)'
            });
        }

        // Vallida que existe un archivo
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
            return res.status(400).send({
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
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
            }

            //Actualiar base de datos
            updateImage(type, id, fileName);

            res.json({
                ok: true,
                msg: 'File Upload',
                fileName
            });
        });


    } catch (error) {
        res.status(500).json({ message: `ERROR al subir archivo: ${error}` });
    }
};

uploadController.getFile = (req, res = response) => {

    try {
        const type = req.params.type;
        const img = req.params.img;

        let pathImg = path.join(__dirname, `../Uploads/${type}/${img}`);

        
        if (fs.existsSync(pathImg)) {
            res.sendFile(pathImg);
        } else {
            // Imagen por defecto si no existiera
            pathImg = path.join(__dirname, `../Uploads/no-img.jpg`);
            res.sendFile(pathImg);
        }



    } catch (error) {
        res.status(500).json({ message: `ERROR al cargar archivo: ${error}` });
    }
};

module.exports = uploadController;