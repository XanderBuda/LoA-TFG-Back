const Tournament = require('../Models/Tournament');
var fs = require('fs');

var tournamentController = {}

tournamentController.getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) return res.status(404).send({ message: `El torneo no existe` });
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }

};

tournamentController.getTournaments = async (req, res) => {
    Tournament.find({}, (err, tournament) => {
        if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
        if (!tournament) return res.status(404).send({ message: 'No hay equipos' });
        return res.status(200).send({ tournament });
    });
};

tournamentController.saveTournament = async (req, res) => {
    try {
        const tournament = new Tournament({
            name: req.body.name,
            size: req.body.size
        });
        await tournament.save();
        if (!tournament) return res.status(404).send({ message: 'No se ha podido guardar el torneo' });
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al guardar el torneo: ${error}` });
    }
};

tournamentController.updateTournament = async (req, res) => {
    try {
        const tournamentUpdated = await Tournament.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!tournamentUpdated) return res.status(404).send({ message: 'El torneo no existe' });
        res.status(200).json({ tournament: tournamentUpdated });
    } catch (error) {
        res.status(500).json({ message: `ERROR al actualiar el torneo: ${error}` });
    }
};
tournamentController.deleteTournament = async (req, res) => {

    try {
        const tournamentDeleted = await Tournament.findByIdAndRemove(req.params.id);
        if (!tournamentDeleted) return res.status(404).send({ message: 'El torneo no existe' });
        res.status(200).json({ message: "Torneo borrado" });
    } catch (error) {
        res.status(500).json({ message: `ERROR al borrar el torneo: ${error}` });
    }
};
tournamentController.uploadLogo = async (req, res) => {
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
};


module.exports = tournamentController;