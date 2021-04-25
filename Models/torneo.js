'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TorneoSchema = Schema({
    admin: { type: Schema.ObjectId, ref: 'User' , default: null},
    name: String,
    logo: { type: String, default: null },
    size: { type: Number, enum: [4, 8, 16] },
    teams: { type: Schema.ObjectId, ref: 'Team', default: null}
});

module.exports = mongoose.model('Tournament', TorneoSchema);