const { Schema, model } = require('mongoose');

const TorneoSchema = new Schema({
    name: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'users' },
    logo: { type: String, default: null },
    size: { type: Number, enum: [4, 8, 16], required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: 'teams' }]
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model('Tournament', TorneoSchema);