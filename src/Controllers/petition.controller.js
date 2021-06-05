const Petition = require('../Models/Petition');
const User = require('../Models/User');
const Team = require('../Models/Team');
const Tournament = require('../Models/Tournament');

const petitionController = {};

petitionController.createPetitionForUsers = async (req, res) => {
    try {
        const _id = req.id;
        const { teamId, tournamentId } = req.query;

        if (teamId) {
            const team = await Team.findById(teamId);
            const adminTeam = team.admin;
            

            const petition = new Petition({ emitter: _id, receiver: adminTeam, reasonTeam: teamId, adminReason: adminTeam });

            await petition.save();

        } else if (tournamentId) {
            const tournament = await Tournament.findById(tournamentId);
            const adminTournament = tournament.admin;
            

            const petition = new Petition({ emitter: _id, receiver: adminTournament, reasonTournament: tournamentId, adminReason: adminTournament });

            await petition.save();
        } else {
            return res.status(404).json({ message: 'No existe el elemento' });
        }

        res.status(200).json({ message: 'Peticion creada correctamente' })

    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` })
    }
};

petitionController.createPetitionForAdminsTournament = async (req, res) => {
    try {
        const _id = req.id;
        const { tournamentId } = req.query;

        if (tournamentId) {
            const { name } = req.body;

            const team = await Team.findOne({ name });

            const petition = new Petition({ emitter: _id, receiver: team.admin, reasonTournament: tournamentId, adminReason: _id });

            await petition.save();

        } else {

            return res.status(404).json({ message: 'No existe el elemento' });

        }
        res.status(200).json({ message: 'Peticion creada correctamente' })
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` })
    }
};

petitionController.createPetitionForAdminsTeam = async (req, res) => {
    try {
        const _id = req.id;
        const { teamId } = req.query;

        if (teamId) {

            const { username } = req.body;

            const user = await User.findOne({ username });

            const petition = new Petition({ emitter: _id, receiver: user.id, reasonTeam: teamId, adminReason: _id });

            await petition.save();

        } else {
            return res.status(404).json({ message: 'No existe el elemento' });
        }
        res.status(200).json({ message: 'Peticion creada correctamente' })
    } catch (error) {
        res.status(500).json({ message: `Error al realizar la petición ${error}` })
    }
};

petitionController.closePetition = async (req, res) => {

    try {
        const petitionDelete = await Petition.findByIdAndDelete(req.params.id);
        if (!petitionDelete) return res.status(404).send({ message: 'La petición no existe' });
        res.status(200).json({ message: "Peticion borrada" });
    } catch (error) {
        res.status(500).json({ message: `Error al borrar la petición: ${error}` });
    }
};



module.exports = petitionController;