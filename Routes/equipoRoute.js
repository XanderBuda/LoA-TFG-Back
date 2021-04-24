'use strict'

const express = require('express');

const api = express.Router();
const teamController = require('../Controllers/equipoController');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/team/:id?', teamController.getTeam);
api.get('/teams', teamController.getTeams);


module.exports = api;