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
            console.log(adminTeam);

            const petition = new Petition({ emitter: _id, receiver: adminTeam, reasonTeam: teamId });

            await petition.save();

        } else if (tournamentId) {
            const tournament = await Tournament.findById(tournamentId);
            const adminTournament = tournament.admin;
            console.log(adminTournament);

            const petition = new Petition({ emitter: _id, receiver: adminTournament, reasonTournament: tournamentId });

            await petition.save();
        } else {
            return res.status(404).json({ message: 'No existe el elemento' });
        }

        res.status(200).json({message: 'Peticion creada correctamente'})

    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` })
    }
};
petitionController.createPetitionForAdmins = async () => {
    try {
        const _id = req.id;
        const username = req.body
        const user = await User.findOne({ username });

    } catch (error) {
        res.status(500).json({ message: `ERROR al realizar la peticion ${error}` })
    }
};

module.exports = petitionController;