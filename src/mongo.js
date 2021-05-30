const mongoose = require('mongoose');
const config = require('./Config/config');

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`);
    }
    console.log(`Conexion a la base de datos establecida en ${config.db}`);

});