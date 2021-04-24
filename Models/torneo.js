'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./usuario');
const Team = require('./equipo');

const TorneoSchema = Schema({
    admin: User,
    name: String,
    logo: String,
    size: { type: Number, enum: [4,8,16]},
    teams: { type: Team, maxItems: size}
});

module.exports = mongoose.model('Tournament',TorneoSchema);