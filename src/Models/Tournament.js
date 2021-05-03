const { Schema, model } = require('mongoose');

const TorneoSchema = new Schema({
    name: { type: String, required: true, unique: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    logo: { type: String, default: null },
    size: { type: Number, enum: [4, 8, 16], required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = model('Tournament', TorneoSchema);