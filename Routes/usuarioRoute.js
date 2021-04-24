'use strict'

const express = require('express');
const api = express.Router();
const userController = require('../Controllers/usuarioController');

api.get('/users',userController.getUsers);
api.get('/user/:userId?',userController.getUserById);
api.post('/user',userController.postUser);
api.put('/user/:userId',userController.updateUser);
api.delete('/user/:userId',userController.deleteUser);

module.exports = api;