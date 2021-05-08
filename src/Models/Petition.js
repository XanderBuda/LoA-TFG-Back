const { Schema, model } = require('mongoose');

const PetitionSchema = new Schema({
    emitter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    statusPetition: { type: Boolean , default: null },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reasonTeam: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
    reasonTournament: { type: Schema.Types.ObjectId, ref: 'Tournament', default: null },
},
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model('Petition', PetitionSchema);