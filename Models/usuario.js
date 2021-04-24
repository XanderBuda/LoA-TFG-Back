'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: String,
    picture: String,
    email: String,
    password: String,
    teamRoutes: String,
    statistics: {
        victories: { type: Number, default: 0 },
        defeats:  { type: Number, default: 0 },
        rankigpoints:  { type: Number, default: 0 }
    },
    elo: String,
    roles: {
        first: {type: String,enum: ['Toplane','Jungle','Midlane','Adc','Support'] },
        second: {type: String,enum: ['Toplane','Jungle','Midlane','Adc','Support'] },
    }
});

module.exports = mongoose.model('User', UserSchema);