const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
    name: { type: String, require: true },
    admin: { type: String, default: null },
    users: {
        first: { type: String, default: null },
        second: { type: String, default: null },
        third: { type: String, default: null },
        fourth: { type: String, default: null },
        five: { type: String, default: null },
    },
    image: { type: String, default: null },
    statistics: {
        victories: { type: Number, default: 0 },
        defeats: { type: Number, default: 0 },
        rankingpoints: { type: Number, default: 0 }
    }

}, {
    versionKey: false,
    timestamps: true,
});
// TeamSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('Team', TeamSchema);

