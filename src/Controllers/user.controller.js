const User = require('../Models/User');
const Team = require('../Models/Team');
const Petition = require('../Models/Petition');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../Helpers/jwt');
const fetch = require('node-fetch');

const userController = {};


userController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length == 0) return res.status(404).send({ message: `No hay usuarios` });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición: ${error}` });
    }
}

userController.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: `El usuario no existe` });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición: ${error}` });
    }
}

userController.newUser = async (req, res) => {

    const { username, email, password } = req.body;

    try {
        const user = new User(req.body);

        //Encrypter de la password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        if (!user) return res.status(409).send({ message: 'No se ha podido guardar el usuario' });

        //generar el token
        let token = await generarJWT(user.id);
        token = `Bearer ${token}`;

        res.status(200).json({ user: user, Authorization: token });
    } catch (error) {
        res.status(500).json({ message: `Error al guardar el usuario: ${error}` });
    }

}

userController.updateUser = async (req, res) => {
    try {
        delete req.body.password;
        const userUpdate = await User.findByIdAndUpdate(req.id, { $set: req.body }, { new: true });
        if (!userUpdate) return res.status(404).send({ message: 'El usuario no existe' });
        res.status(200).json({ user: userUpdate });
    } catch (error) {
        res.status(500).json({ message: `Error al actualiar el usuario: ${error}` });
    }
}

userController.deleteUser = async (req, res) => {

    const _id = req.id;
    try {
        const userDelete = await User.findByIdAndDelete(_id);
        if (!userDelete) return res.status(404).send({ message: 'El usuario no existe' });
        res.status(200).json({ message: "Usuario borrado" });
    } catch (error) {
        res.status(500).json({ message: `Error al borrar el usuarios: ${error}` });
    }
}

userController.getTeam = async (req, res) => {
    const { username } = req.query; //nombre del usuario a buscar en un equipo
    try {
        const team = await Team.find({ users: { $not: { $size: 0 } } }).populate({ path: 'users', match: { username: username } });

        const userTeam = team.filter((team) => team.users.length > 0);

        if (userTeam.length === 0) return res.status(400).json({ message: `Este usuario no tiene equipo` });
        res.status(200).json(userTeam);
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` });
    }
}

userController.getAllPetitionsForTheUser = async (req, res) => {

    try {

        const _id = req.id;

        const petitions = await Petition.find();

        const userPetitions = petitions.filter((petition) => petition.receiver == _id);


        if (userPetitions.length === 0) return res.status(204).json({ message: `Este usuario no tiene peticiónes pendientes` });

        res.status(200).json(userPetitions);

    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` });
    };
}

userController.updateElo = async (req, res) => {

    try {

        const { usernameLOL } = req.body;
        const { riotToken } = req.params;

        const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${usernameLOL}`;

        const data = await fetch(url, { headers: { 'X-Riot-Token': riotToken } })
        const riotRes = await data.json();


        if (riotRes.status && riotRes.status.status_code === 404) {
            return res.status(404).json({
                message: 'Usuario no existe en League of Legends'
            });
        }

        const idRiot = riotRes.id;

        const url2 = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${idRiot}`;
        const data2 = await fetch(url2, { headers: { 'X-Riot-Token': riotToken } });
        const riotRes2 = await data2.json();
        
        var eloRiot = '';

        if(riotRes2.length == 0){
            eloRiot = 'UNRANKED';
        }else{
        const riotRes2SoloQ = riotRes2.filter((res) => res.queueType == 'RANKED_SOLO_5x5');

         eloRiot = riotRes2SoloQ[0].tier + ' ' + riotRes2SoloQ[0].rank;
        }

        const userUpdate = await User.findByIdAndUpdate(req.id, { $set: { elo: eloRiot } }, { new: true });

        res.status(200).json({ user: userUpdate });

    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` });
    };
}

module.exports = userController;