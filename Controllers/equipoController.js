'use strict'

var Team = require('../Models/equipo');
var fs = require('fs');

var teamController = {

    getTeam: (req, res) => {
        var teamId = req.params.id;
        if(!teamId){
            return res.status(404).send({message: 'El equipo no existe'});
        }
        Team.findById(teamId, (err, team) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!team) return res.status(404).send({message: 'El equipo no existe'});
            return res.status(200).send({team});
        });
    },
    getTeams: (req, res) => {
        Team.find({}, (err, team) => {
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!team) return res.status(404).send({message: 'No hay equipos'});
            return res.status(200).send({team});
        });
    },
    saveTeam: (req, res) => {
        var team = new Team();
        var params = req.body;
        
        team.name = params.name;
        team.admin = params.admin;
        team.users = params.admin;
        team.image = null;
        
    }

};

module.exports = teamController;
