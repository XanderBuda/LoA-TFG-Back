require('dotenv').config();

const config = {
    port: process.env.PORT || 3700,
    db: process.env.NODE_ENV == 'test' ? process.env.MONGODB_TEST : process.env.MONGODB
};

// "https://loa-backend.herokuapp.com"

module.exports = config;