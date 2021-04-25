'use strict'

const User = require('../Models/usuario');

var userController ={

    getUsers: function(req, res){
        User.find({},(err, users)=>{
            if(err) return res.status(500).send({message: `ERROR al realizar la peticion: ${err}`});
            if(!users) return res.status(404).send({message: `No hay usuarios`});
            return res.status(200).send({users});
        });
    },
    getUserById: function(req, res){
        let userId = req.params.userId;
        User.findById(userId,(err,user)=>{
            if(err) return res.status(500).send({message: `ERROR al realizar la peticion: ${err}`});
            if(!user) return res.status(404).send({message: `El usuario no existe`}); 
            res.status(200).send({user});
        })
    },
    newUser: function(req, res){
        let user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save((err,userStored)=>{
            if(err) return res.status(500).send({message: `ERROR al guardar el usuario: ${err}`});
            res.status(200).send({ user: userStored });
        });

    },
    updateUser: function(req, res){
        let userId = req.params.userId;
        let update = req.body;

        User.findByIdAndUpdate(userId,update,{ new: true},(err, userUpdate)=>{
            if (err) return res.status(500).send({ message: `ERROR al actualiar el usuario: ${err}` });
            res.status(200).send({ user: userUpdate });
        });
    },
    deleteUser: function(req, res){
        let userId = req.params.userId;

        User.findByIdAndRemove(userId,(err)=>{
            if (err) return res.status(500).send({ message: `ERROR al borrar el usuarios: ${err}` });
            res.status(200).send({ message: `El usuario ha sido borrado` });
        });
    }
}

module.exports = userController;