const express = require('express');
const morgan = require("morgan");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Exntended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'LoA API',
            description: "API para desarrollar una aplicacion de organizacion de torneos para el League of Legends",
            contact: {
                name: 'Alexandru Aurel Buda && Javier Dolz'
            }
        },
        servers: [
            {
                "url": "http://localhost:3700",
                "description": "Local API"
            },
            {
                "url": "loa-backend.herokuapp.com",
                "description": "API Desplegada"
            }
        ]
    },
    apis: ['src/Routes/*.js']
    
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();




//RUTAS
var userRoutes = require('./Routes/user.routes');
var teamRoutes = require('./Routes/team.routes');
var tournamentRoutes = require('./Routes/tournament.routes');
var auth = require('./Routes/auth.routes');
var petitionRoutes = require('./Routes/petition.routes');
var uploadsRoutes = require('./Routes/uploads.routes')

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.json());

//CORS
app.use(cors());

//INTERCALADO DE RUTAS
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/user', userRoutes);
app.use('/team', teamRoutes);
app.use('/tournament', tournamentRoutes);
app.use('/login', auth);
app.use('/petition', petitionRoutes);
app.use('/upload', uploadsRoutes);
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));


module.exports = app;