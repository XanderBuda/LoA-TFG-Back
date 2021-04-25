'use strict'

const express = require('express');

const api = express.Router();
const tournamentController = require('../Controllers/torneoController');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/tournament/:id?', tournamentController.getTournament);
api.get('/tournaments', tournamentController.getTournaments);
api.post('/save-tournament', tournamentController.saveTournament);
api.put('/tournament/:id', tournamentController.updateTournament);
api.delete('/tournament/:id', tournamentController.deleteTournament);
api.post('/upload-logo/:id', multipartMiddleware, tournamentController.uploadLogo);

module.exports = api;