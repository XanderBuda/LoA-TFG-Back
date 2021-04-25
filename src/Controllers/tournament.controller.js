const Tournament = require('../Models/Tournament');
var fs = require('fs');

var tournamentController = {

    getTournament: (req, res) => {
        var tournamentId = req.params.id;
        if (!tournamentId) {
            return res.status(404).send({ message: 'El equipo no existe' });
        }
        Tournament.findById(tournamentId, (err, tournament) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!tournament) return res.status(404).send({ message: 'El equipo no existe' });
            return res.status(200).send({ tournament });
        });
    },
    getTournaments: (req, res) => {
        Tournament.find({}, (err, tournament) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!tournament) return res.status(404).send({ message: 'No hay equipos' });
            return res.status(200).send({ tournament });
        });
    },
    saveTournament: (req, res) => {
        var tournament = new Tournament();
        var params = req.body;

        tournament.name = params.name;
        tournament.logo = null;
        tournament.size = params.size;

        tournament.save((err, tournamentStored) => {

            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!tournamentStored) return res.status(404).send({ message: 'No se ha podido guardar el equipo' });

            return res.status(200).send({ tournament: tournamentStored });
        });
    },
    updateTournament: (req, res) => {
        var tournamentId = req.params.id;
        var update = req.body;

        Tournament.findByIdAndUpdate(tournamentId, update, { new: true }, (err, tournamentUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualiar los datos' });

            if (!tournamentUpdated) return res.status(404).send({ message: 'El equipo no existe' });

            return res.status(200).send({ tournament: tournamentUpdated });
        });
    },
    deleteTournament: (req, res) => {
        var tournamentId = req.params.id;

        Tournament.findByIdAndDelete(tournamentId, (err, tournamentDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al borrar los datos' });
            if (!tournamentDeleted) return res.status(404).send({ message: 'El equipo no se puede eliminar' });

            return res.status(200).send({ tournament: tournamentDeleted });
        });
    },
    uploadLogo: (req, res) => {
        var tournamentId = req.params.id;
        var fileName = "Imagen no subida...";

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
            if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {
                Tournament.findByIdAndUpdate(tournamentId, { image: fileName }, { new: true }, (err, tournamentUpdated) => {
                    if (err) return res.status(500).send({
                        message: 'Error al actualizar los datos'
                    });
                    if (!tournamentUpdated) return res.status(404).send({
                        message: 'El equipo no existe'
                    });
                    return res.status(200).send({
                        tournament: tournamentUpdated
                    });
                });
            } else {
                fs.unlink(filePath, err => {
                    return res.status(200).send({
                        message: 'La extensión no es válida'
                    });
                });
            }

        } else {
            return res.status(200).send({
                files: fileName
            });
        }
    }

};

module.exports = tournamentController;