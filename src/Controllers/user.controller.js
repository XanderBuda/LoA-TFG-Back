const User = require('../Models/User');
const Team = require('../Models/Team');


const userController = {};

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
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: `El usuario no existe` });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion: ${error}` });
    }
}

userController.newUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const user = new User(req.body);
        await user.save();
        if (!user) return res.status(404).send({ message: 'No se ha podido guardar el usuario' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `ERROR al guardar el usuario: ${error}` });
    }

}

userController.updateUser = async (req, res) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!userUpdate) return res.status(404).send({ message: 'El usuario no existe' });
        res.status(200).json({ user: userUpdate });
    } catch (error) {
        res.status(500).json({ message: `ERROR al actualiar el usuario: ${error}` });
    }
}

userController.deleteUser = async (req, res) => {
    try {
        const userDelete = await User.findByIdAndRemove(req.params.id);
        if (!userDelete) return res.status(404).send({ message: 'El usuario no existe' });
        res.status(200).json({ message: "Usuario borrado" });
    } catch (error) {
        res.status(500).json({ message: `ERROR al borrar el usuarios: ${error}` });
    }
}

userController.getTeam = async (req, res) => {
    const { username } = req.query; //nombre del usuario a buscar en un equipo
    try {
        const team = await Team.find({ users: { $not: { $size: 0 } } }).populate({ path: 'users', match: { username: username } });

        const userTeam = team.filter((team) => team.users.length > 0);

        if (userTeam.length === 0) return res.status(404).json({ message: `Este usuario no tiene equipo` });
        res.status(200).json(userTeam);
    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` });
    }
}

module.exports = userController;