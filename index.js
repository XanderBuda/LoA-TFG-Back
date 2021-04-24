'use strict'

const mongoose = require('mongoose');
const config = require('./Config/config');
const app = require('./app');


mongoose.Promise = global.Promise;
mongoose.connect(config.db)
    .then(() => {
        console.log("Conexion a la base de datos establecida");
    })
    .catch(err => console.log(err));