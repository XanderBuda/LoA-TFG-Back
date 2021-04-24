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
            if(err) return res.status(404).send({message: 'El equipo no existe'});
            return res.status(200).send({team});
        });
    }
};
