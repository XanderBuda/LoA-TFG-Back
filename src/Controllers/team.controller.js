const Team = require('../Models/Team');
var fs = require('fs');

const teamController = {};

teamController.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        if (teams.length == 0) return res.status(404).json({ message: `No hay equipos` });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

teamController.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: 'El equipo no existe' });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

teamController.createTeam = async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        if (!newTeam) return res.status(404).json({ message: 'No se ha podido guardar el equipo' });
        res.status(200).json({ message: 'Equipo guardado correctamente' });
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

teamController.editTeam = async (req, res) => {
    try {
        const editedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!editedTeam) return res.status(404).json({ message: 'El equipo no existe' });
        return res.status(200).json(editedTeam);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

teamController.deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) return res.status(404).json({ message: 'El equipo no se puede eliminar' });
        res.status(200).json({ message: 'Equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

teamController.uploadLogo = (req, res) => {
    var teamId = req.params.id;
    var fileName = "Imagen no subida...";

    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];
        if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {
            Team.findByIdAndUpdate(teamId, { image: fileName }, { new: true }, (err, teamUpdated) => {
                if (err) return res.status(500).json({
                    message: 'Error al actualizar los datos'
                });
                if (!teamUpdated) return res.status(404).json({
                    message: 'El equipo no existe'
                });
                return res.status(200).json({
                    team: teamUpdated
                });
            });
        } else {
            fs.unlink(filePath, err => {
                return res.status(200).json({
                    message: 'La extensión no es válida'
                });
            });
        }

    } else {
        return res.status(200).json({
            files: fileName
        });
    }
}

module.exports = teamController;
