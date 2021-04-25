const User = require('../Models/User');

var userController = {};

userController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length == 0) return res.status(404).send({ message: `No hay usuarios` });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
}


userController.getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: `El usuario no existe` });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
};

userController.newUser = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `ERROR al guardar el usuario: ${error}` });
    }

};

userController.updateUser = async (req, res) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ user: userUpdate });
    } catch (error) {
        res.status(500).json({ message: `ERROR al actualiar el usuario: ${error}` });
    }
}
userController.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: "Usuario borrado" });
    } catch (error) {
        res.status(500).json({ message: `ERROR al borrar el usuarios: ${error}` });
    }
}

module.exports = userController;