'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    name: String,
    admin: { type: Schema.ObjectId, ref: 'User', autopopulate: true, default: null },
    users: {
        first: { type: Schema.ObjectId, ref: 'User', autopopulate: true, default: null },
        second: { type: Schema.ObjectId, ref: 'User', autopopulate: true, default: null },
        third: { type: Schema.ObjectId, ref: 'User', autopopulate: true, default: null },
        fourth: { type: Schema.ObjectId, ref: 'User', autopopulate: true, default: null },
        five: { type: Schema.ObjectId, ref: 'User', autopopulate: true, default: null },
    },
    image: String,
    statistics: {
        victories: { type: Number, default: 0 },
        defeats: { type: Number, default: 0 },
        rankingpoints: { type: Number, default: 0 }
    }

});
TeamSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Team', TeamSchema);

