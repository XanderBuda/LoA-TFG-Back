'use strict'

const express = require('express');
const api = express.Router();
const userController = require('../Controllers/usuarioController');

api.get('/users',userController.getUsers);
api.get('/user/:userId?/:teamId?',userController.getUserById);
api.post('/save-user',userController.newUser);
api.put('/update-user/:userId',userController.updateUser);
api.delete('/user/:userId',userController.deleteUser);

module.exports = api;