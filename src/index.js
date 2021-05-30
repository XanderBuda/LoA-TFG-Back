const config = require('./Config/config');
const app = require('./app');
require('./mongo');

const api = app.listen(config.port, () => {
    console.log(`LoA corriendo en http://localhost:${config.port}`);
});

module.exports = { api };

