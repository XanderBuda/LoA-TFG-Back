'use strict'

const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
var app = express();

//RUTAS
var userRoutes = require('./Routes/usuarioRoute');
var teamRoutes = require('./Routes/equipoRoute');
var tournamentRoutes = require('./Routes/torneoRoute');

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

//CORS
app.use(cors());

//INTERCALADO DE RUTAS
app.use('', userRoutes);
app.use('', teamRoutes);
app.use('', tournamentRoutes);

module.exports = app;