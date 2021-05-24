require('dotenv').config();

const config = {
    port: process.env.PORT || 3700,
    db: process.env.MONGODB || 'mongodb://localhost:27017/LoA'
};

// "https://loa-backend.herokuapp.com"

module.exports = config;