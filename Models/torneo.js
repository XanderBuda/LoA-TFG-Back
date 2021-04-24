'use strict'

const mongoose = require('mongoose');
const User = require('./usuario');
const Team = require('./equipo');

const Schema = mongoose.Schema;

const TorneoSchema = Schema({
    admin: User,
    name: String,
    logo: { type: String, default: null},
    size: { type: Number, enum: [4,8,16]},
    teams: { type: Team, maxItems: size}
});

module.exports = mongoose.model('Tournament',TorneoSchema);