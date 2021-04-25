'use strict'

const { Team } = require('../Models/equipo');
var fs = require('fs');

var teamController = {

    getTeam: (req, res) => {
        var teamId = req.params.id;
        if (!teamId) {
            return res.status(404).send({ message: 'El equipo no existe' });
        }
        Team.findById(teamId, (err, team) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!team) return res.status(404).send({ message: 'El equipo no existe' });
            return res.status(200).send({ team });
        });
    },
    getTeams: (req, res) => {
        Team.find({}, (err, team) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });
            if (!team) return res.status(404).send({ message: 'No hay equipos' });
            return res.status(200).send({ team });
        });
    },
    saveTeam: (req, res) => {
        var team = new Team();
        var params = req.body;

        team.name = params.name;
        team.users.first = params.admin;
        team.admin = params.admin;

        team.image = null;


        team.save((err, teamStored) => {

            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!teamStored) return res.status(404).send({ message: 'No se ha podido guardar el equipo' });

            return res.status(200).send({ team: teamStored });
        });
    },
    updateTeam: (req, res) => {
        var teamId = req.params.id;
        var update = req.body;

        Team.findByIdAndUpdate(teamId, update, { new: true }, (err, teamUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualiar los datos' });

            if (!teamUpdated) return res.status(404).send({ message: 'El equipo no existe' });

            return res.status(200).send({ team: teamUpdated });
        });
    },
    deleteTeam: (req, res) => {
        var teamId = req.params.id;

        Team.findByIdAndDelete(teamId, (err, teamDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al borrar los datos' });
            if (!teamDeleted) return res.status(404).send({ message: 'El equipo no se puede eliminar' });

            return res.status(200).send({ team: teamDeleted });
        });
    },
    uploadLogo: (req, res) => {
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
                    if (err) return res.status(500).send({
                        message: 'Error al actualizar los datos'
                    });
                    if (!teamUpdated) return res.status(404).send({
                        message: 'El equipo no existe'
                    });
                    return res.status(200).send({
                        team: teamUpdated
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
    },
    //Añadir usuarios al equipo después de la posición 1
    addUser: (req, res) => {
        var teamId = req.params.id; //Equipo a actualizar
        var params = req.body; //User que se le va a asignar al Equipo

        Team.findByIdAndUpdate(teamId, params, { new: true }, (err, teamUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualiar los datos' });
            if (!teamUpdated) return res.status(404).send({ message: 'El equipo no existe' });


            return res.status(200).send({ team: teamUpdated });
        });
    }

};

module.exports = teamController;