const User = require('../Models/pepe');

var userController = {};

userController.getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: `ERROR al realizar la peticion: ${err}` });
        if (!users) return res.status(404).send({ message: `No hay usuarios` });
        return res.status(200).send({ users });
    });
}


userController.getUserById = async (req, res) => {
    const { id } = req.params;
    await User.findById(id, (err, user) => {
        if (err) return res.status(500).send({ message: `ERROR al realizar la peticion: ${err}` });
        if (!user) return res.status(404).send({ message: `El usuario no existe` });
        res.status(200).send({ user });
    })
};

userController.newUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err, userStored) => {
        if (err) return res.status(500).send({ message: `ERROR al guardar el usuario: ${err}` });
        res.status(200).send({ user: userStored });
    });

};

userController.updateUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { $set: req.body }, { new: true }, (err, userUpdate) => {
        if (err) return res.status(500).send({ message: `ERROR al actualiar el usuario: ${err}` });
        res.status(200).send({ user: userUpdate });
    });
}
userController.deleteUser = async (req, res) => {

    await User.findByIdAndRemove(req.params.id, (err) => {
        if (err) return res.status(500).send({ message: `ERROR al borrar el usuarios: ${err}` });
        res.status(200).send({ message: `El usuario ha sido borrado` });
    });
}


module.exports = userController;