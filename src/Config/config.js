require('dotenv').config();

const config = {
    port: process.env.PORT || 3700,
    db: process.env.MONGODB || /*'mongodb://localhost:27017/LoA'*/'mongodb+srv://Alexandru:LOGESTA2021@loa.gqmzy.mongodb.net/LoA?retryWrites=true&w=majority'
};

module.exports = config;