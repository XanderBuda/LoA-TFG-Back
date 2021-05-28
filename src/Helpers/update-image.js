const fs = require('fs');
const path = require('path');

const User = require('../Models/User');
const Team = require('../Models/Team');
const Tournament = require('../Models/Tournament');

const deleteImage = (path) => {

    if (fs.existsSync(path)) {
        // Borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const updateImage = async (type, id, fileName) => {

    let oldPath;

    switch (type) {
        case 'User':
            const user = await User.findById(id);
            if (!user) {
                console.log("No se encontro usuario por id");
                return false;
            }

            oldPath = `./src/Uploads/User/${user.picture}`;

            deleteImage(oldPath);

            user.picture = fileName;
            await user.save();
            return true;

            break;
        case 'Team':

            const teams = await Team.find();
            const teamUpload = teams.filter((team) => team.admin == id);
            if (!teamUpload) {
                console.log("No se encontro el equipo por id");
                return false;
            }

            oldPath = `./src/Uploads/Team/${teamUpload[0].image}`;

            deleteImage(oldPath);

            teamUpload[0].image = fileName;
            await teamUpload[0].save();
            return true;

            break;
        case 'Tournament':
            const tournaments = await Tournament.find();
            console.log(tournaments);

            const tournamentFiltered = tournaments.filter((tournament) => tournament.admin == id);
            
            if (!tournamentFiltered) {
                console.log("No se encontro el torneo por id");
                return false;
            }
            console.log(tournamentFiltered);


            oldPath = `./src/Uploads/Tournament/${tournamentFiltered[0].logo}`;
            console.log(tournamentFiltered[0].logo);
            deleteImage(oldPath);

            tournamentFiltered[0].logo = fileName;
            await tournamentFiltered[0].save();
            return true;
            break;
    }

}
const getImage = async (type, id) => {

    let pathImg;

    switch (type) {
        case 'User':

            const user = await User.findById(id);

            if (!user) {
                console.log("No se encontro usuario por id");
                return false;
            }

            pathImg = path.join(__dirname, `../Uploads/${type}/${user.picture}`);

            return pathImg;

            break;
        case 'Team':

            const team = await Team.find();
            const teamUpload = team.filter((team) => team.admin == id);
            if (!team) {
                console.log("No se encontro el equipo por id");
                return false;
            }


            pathImg = path.join(__dirname, `../Uploads/${type}/${teamUpload[0].image}`);

            return pathImg;

            break;
        case 'Tournament':

            const tournament = await Tournament.find();
            const tournamentFiltered = tournament.filter((tournament) => tournament.admin == id);
            if (!tournamentFiltered) {
                console.log("No se encontro el torneo por id");
                return false;
            }

            pathImg = path.join(__dirname, `../Uploads/Tournament/${tournamentFiltered[0].logo}`);

           
            return pathImg;
            break;
    }

}

module.exports = {
    updateImage,
    getImage
}