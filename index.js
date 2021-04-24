'use strict'

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/LoA')
    .then(() => {
        console.log("Conexion a la base de datos establecida");
    })
    .catch(err => console.log(err));