const { Schema, model } = require('mongoose');

const TeamSchema = new Schema({
    name: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

