'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    name: String,
    admin: { type: Schema.ObjectId, ref: 'User' },
    users: {
        1: { type: Schema.ObjectId, ref: 'User', default: null },
        2: { type: Schema.ObjectId, ref: 'User', default: null },
        3: { type: Schema.ObjectId, ref: 'User', default: null },
        4: { type: Schema.ObjectId, ref: 'User', default: null },
        5: { type: Schema.ObjectId, ref: 'User', default: null },
    },
    image: String,
    statistics: {
        victories: { type: Number, default: 0 },
        defeats: { type: Number, default: 0 },
        rankingpoints: { type: Number, default: 0 }
    }

});

module.exports = mongoose.model('Team', TeamSchema);