'use strict'

const express = require('express');
const morgan = require("morgan");

const cors = require("cors");
var app = express();

//RUTAS
var userRoutes = require('./Routes/user.routes');
var teamRoutes = require('./Routes/team.routes');
var tournamentRoutes = require('./Routes/tournament.routes');

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

//CORS
app.use(cors());

//INTERCALADO DE RUTAS
app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/tournaments', tournamentRoutes);

module.exports = app;