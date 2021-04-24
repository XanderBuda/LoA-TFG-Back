'use strict'

const express = require('express');

const api = express.Router();
const teamController = require('../Controllers/equipoController');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/team/:id?', teamController.getTeam);
api.get('/teams', teamController.getTeams);
api.post('/save-team', teamController.saveTeam);
api.put('/team/:id', teamController.updateTeam);
api.delete('/team/:id', teamController.deleteTeam);
api.post('/upload-logo/:id', multipartMiddleware, teamController.uploadLogo);

module.exports = api;