'use strict'

const express = require('express');

var app = express();

//RUTAS
var userRoutes = require('./Routes/usuarioRoute');
var teamRoutes = require('./Routes/equipoRoute');
var tournamentRoutes = require('./Routes/torneoRoute');

//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//INTERCALADO DE RUTAS
// app.use('', userRoutes);

module.exports = app;