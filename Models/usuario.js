'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: String,
    picture: { type: String, default: null },
    email: String,
    password: String,
    team: {type: Schema.ObjectId, ref: 'Team', default: null},
    statistics: {
        victories: { type: Number, default: 0 },
        defeats:  { type: Number, default: 0 },
        rankigpoints:  { type: Number, default: 0 }
    },
    elo: { type: String, default:null},
    roles: {
        first: {type: String,enum: ['Toplane','Jungle','Midlane','Adc','Support'] },
        second: {type: String,enum: ['Toplane','Jungle','Midlane','Adc','Support'] },
    }
});

module.exports = mongoose.model('User', UserSchema);