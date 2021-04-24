'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = require('./usuario');

const TeamSchema = Schema({
    name: String,
    admin: User,
    users: {
        1: { type: User, default: null },
        2: { type: User, default: null },
        3: { type: User, default: null },
        4: { type: User, default: null },
        5: { type: User, default: null }
    },
    image: String,
    statistics: {
        victories: { type: Number, default: 0 },
        defeats: { type: Number, default: 0 },
        rankingpoints: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('Team', TeamSchema);