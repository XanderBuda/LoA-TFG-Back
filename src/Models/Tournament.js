const { Schema, model } = require('mongoose');

const TorneoSchema = new Schema({
    admin: { type: String, default: null },
    name: String,
    logo: { type: String, default: null },
    size: { type: Number, enum: [4, 8, 16] },
    teams: { type: String, default: null }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model('Tournament', TorneoSchema);