const Tournament = require('../Models/Tournament');
const fs = require('fs');

const tournamentController = {};

tournamentController.getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) return res.status(404).send({ message: `El torneo no existe` });
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
}

tournamentController.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        if (tournaments.length == 0) return res.status(404).send({ message: 'No hay torneos' });
        res.status(200).json(tournaments);
    } catch (error) {
        if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
    }
}

tournamentController.saveTournament = async (req, res) => {

    try {
        const _id = req.id;
        const tournament = new Tournament({ admin: _id, ...req.body });
        await tournament.save();
        if (!tournament) return res.status(404).send({ message: 'No se ha podido guardar el torneo' });
        res.status(200).json(tournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al guardar el torneo: ${error}` });
    }
}

tournamentController.updateTournament = async (req, res) => {
    try {
        const tournamentUpdated = await Tournament.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!tournamentUpdated) return res.status(404).send({ message: 'El torneo no existe' });
        res.status(200).json({ tournament: tournamentUpdated });
    } catch (error) {
        res.status(500).json({ message: `ERROR al actualiar el torneo: ${error}` });
    }
}

tournamentController.deleteTournament = async (req, res) => {

    try {
        const tournamentDeleted = await Tournament.findByIdAndDelete(req.params.id);
        if (!tournamentDeleted) return res.status(404).send({ message: 'El torneo no existe' });
        res.status(200).json({ message: "Torneo borrado" });
    } catch (error) {
        res.status(500).json({ message: `ERROR al borrar el torneo: ${error}` });
    }
}

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
}

tournamentController.assignTeam = async (req, res) => {
    try {
        //EL TORNEO ESTÁ LLENO
        const tournament = await Tournament.findById(req.params.id);
        if (tournament.teams.length >= tournament.size) return res.status(404).send({ message: `El torneo está lleno` });
        let encontrado = false;
        tournament.teams.forEach(element => {
            if (element == req.body.team) { encontrado = true }
        });
        if (encontrado) return res.status(404).json({ message: 'El equipo ya está en el torneo' });
        //####################

        const { team } = req.body;

        const editedTournament = await Tournament.findByIdAndUpdate(req.params.id, { $push: { teams: team } }, { new: true });
        if (!editedTournament) return res.status(404).send({ message: 'El torneo no existe' });
        res.status(200).json(editedTournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
}

tournamentController.removeTeam = async (req, res) => {
    try {
        const { team } = req.body;

        const editedTournament = await Tournament.findByIdAndUpdate(req.params.id, { $pull: { teams: team } }, { new: true });
        if (!editedTournament) return res.status(404).send({ message: 'El torneo no existe' });
        res.status(200).json(editedTournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
}

tournamentController.assignAdmin = async (req, res) => {
    try {
        const { user } = req.body;
        const editedTournament = await Tournament.findByIdAndUpdate(req.params.id, { $set: { admin: user } }, { new: true });
        if (!editedTournament) return res.status(404).json({ message: 'El torneo no existe' });
        return res.status(200).json(editedTournament);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

tournamentController.getNumberOfTeams = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (tournament.teams.length == 0) return res.status(404).send({ message: `El torneo no tiene equipos` });
        res.status(200).json(tournament.teams.length);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
}


module.exports = tournamentController;