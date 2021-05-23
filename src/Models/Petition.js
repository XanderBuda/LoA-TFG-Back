const { Schema, model } = require('mongoose');


// AdminReason coincide con el emisor -> El admin del Team/Torneo invita a un usuario/team para unirse a su team/torneo
// AdminReason coincide con el receptor -> El user/admin de un equipo solicita unirse al equipo/torneo

const PetitionSchema = new Schema({
    emitter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    adminReason: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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