const fs = require('fs');

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

            const team = await Team.findById(id);
            if (!team) {
                console.log("No se encontro el equipo por id");
                return false;
            }

            oldPath = `./src/Uploads/Team/${team.image}`;

            deleteImage(oldPath);

            team.image = fileName;
            await team.save();
            return true;

            break;
        case 'Tournament':

            const tournament = await Tournament.findById(id);
            if (!tournament) {
                console.log("No se encontro el torneo por id");
                return false;
            }

            oldPath = `./src/Uploads/Tournament/${tournament.logo}`;

            deleteImage(oldPath);

            tournament.logo = fileName;
            await tournament.save();
            return true;
            break;
    }

}

module.exports = {
    updateImage
}