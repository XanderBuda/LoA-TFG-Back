const { Schema, model } = require('mongoose');

const PetitionSchema = new Schema({
    emitter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    statusPetition: { type: boolean, default: null, },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: Schema.Types.ObjectId, ref: 'Team' | 'Tournament', required: true }
},
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model('Petition', PetitionSchema);