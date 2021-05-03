const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//RUTAS
var userRoutes = require('./Routes/user.routes');
var teamRoutes = require('./Routes/team.routes');
var tournamentRoutes = require('./Routes/tournament.routes');
var auth = require('./Routes/auth.routes');

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

//CORS
app.use(cors());

//INTERCALADO DE RUTAS
app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/login', auth);

module.exports = app;