const Petition = require('../Models/Petition');
const User = require('../Models/User');

const petitionController = {};

petitionController.createPetition = async () =>{
    try{
        const _id = req.id;
        const user = await User.findOne({ username });


    }catch(error){
        res.status(500).json({message: `ERROR al realizar la peticion ${error}`})
    }
};