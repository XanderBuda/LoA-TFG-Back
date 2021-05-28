const Team = require('../Models/Team');
const Tournament = require('../Models/Tournament');
const fs = require('fs');

const teamController = {};

teamController.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        if (teams.length == 0) return res.status(404).json({ message: `No hay equipos` });
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: 'El equipo no existe' });
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.createTeam = async (req, res) => {
    try {
        const _id = req.id;
        const newTeam = new Team({ admin: _id, users: _id, ...req.body }); //Al crear equipo el admin y el primer integrante es el creador del equipo
        await newTeam.save();
        if (!newTeam) return res.status(404).json({ message: 'No se ha podido guardar el equipo' });
        res.status(200).json({ message: 'Equipo guardado correctamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.editTeam = async (req, res) => {
    try {
        const editedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!editedTeam) return res.status(404).json({ message: 'El equipo no existe' });
        return res.status(200).json(editedTeam);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.deleteTeam = async (req, res) => {

    const _id = req.id; //usuario de la sesion

    try {
        const team = await Team.find();
        const teamDeleted = team.filter((team) => team.admin == _id);

        const deletedTeam = await Team.findByIdAndDelete(teamDeleted[0].id);
        if (!deletedTeam) return res.status(404).json({ message: 'El equipo no se puede eliminar' });
        res.status(200).json({ message: 'Equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.uploadLogo = async (req, res) => {
    var fileName = "Imagen no subida...";

    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        fileName = fileSplit[1];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {
            try {
                const team = await Team.findByIdAndUpdate(req.params.id, { image: fileName }, { new: true });
                if (!team) return res.status(404).json({ message: 'El equipo no existe' });
                res.status(200).json(team);
            } catch (error) {
                res.status(500).json({ message: `Error al realizar la peticion ${error}` });
            }
        } else {
            await fs.unlink(filePath);
            res.status(200).json({ message: 'La extensión no es válida' });
        }
    } else {
        res.status(200).json(fileName);
    }
}

teamController.assignUser = async (req, res) => {

    try {
        //EL EQUIPO ESTÁ LLENO
        const team = await Team.findById(req.params.id);
        if (team.users.length >= 5) return res.status(401).json({ message: 'El equipo está lleno' });
        let encontrado = false;
        team.users.forEach(element => {
            if (element == req.body.user) { encontrado = true }
        });
        if (encontrado) return res.status(402).json({ message: 'El usuario ya está en el equipo' });
        //####################

        const { user } = req.body;
        const editedTeam = await Team.findByIdAndUpdate(req.params.id, { $push: { users: user } }, { new: true });
        if (!editedTeam) return res.status(404).json({ message: 'El equipo no existe' });
        return res.status(200).json(editedTeam);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.removeUser = async (req, res) => {
    try {
        const { user } = req.body;
        const teamAdmin = await Team.findById(req.params.id);
        if (!teamAdmin) return res.status(403).json({ message: 'El equipo no existe' });
        if(teamAdmin.admin == user) return res.status(401).json({ message: 'El administrador no se puede eliminar del equipo' });

        const editedTeam = await Team.findByIdAndUpdate(req.params.id, { $pull: { users: user } }, { new: true });
        if (!editedTeam) return res.status(404).json({ message: 'El usuario no se puede eliminar del equipo' });
        return res.status(200).json(editedTeam);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.assignAdmin = async (req, res) => {
    try {
        const { user } = req.body;
        const editedTeam = await Team.findByIdAndUpdate(req.params.id, { $set: { admin: user } }, { new: true });
        if (!editedTeam) return res.status(404).json({ message: 'El equipo no existe' });
        return res.status(200).json(editedTeam);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.getNumberOfUsers = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: 'El equipo no existe' });
        if (team.users.length == 0) return res.status(401).json({ message: 'El equipo no tiene usuarios' });
        res.status(200).json(team.users.length);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

teamController.getTournament = async (req, res) => {
    const { name } = req.query; //nombre del equipo a buscar en un torneo, sdfgvsdfg/?teamname=pedro
    //                                                                                   adfgsdfgd/:id

    try {
        const tournament = await Tournament.find({ teams: { $not: { $size: 0 } } }).populate({ path: 'teams', match: { name: name } });

        const teamTournament = tournament.filter((tournament) => tournament.teams.length > 0);

        if (teamTournament.length === 0) return res.status(404).json({ message: `Este equipo no participa en ningún torneo` });
        console.log(teamTournament);
        //res.status(200).json(teamTournament[0].name);
        res.status(200).json(teamTournament);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la peticion ${error}` });
    }
}

module.exports = teamController;
