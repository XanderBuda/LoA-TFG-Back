const mongoose = require('mongoose');
const config = require('./Config/config');
const app = require('./app');



mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, res) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`);
    }
    console.log("Conexion a la base de datos establecida");

    app.listen(config.port, () => {
        console.log(`LoA corriendo en http://localhost:${config.port}`);
    });

});
