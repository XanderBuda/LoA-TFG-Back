const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    picture: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    statistics: {
        victories: { type: Number, default: 0 },
        defeats: { type: Number, default: 0 },
        rankigpoints: { type: Number, default: 0 }
    },
    elo: { type: String, default: null },
    roles: {
        first: { type: String, enum: ['Toplane', 'Jungle', 'Midlane', 'Adc', 'Support', null], default: null },
        second: { type: String, enum: ['Toplane', 'Jungle', 'Midlane', 'Adc', 'Support', null], default: null },
    }
}, {
    versionKey: false,
    timestamps: true,
});

//UserSchema.plugin(require('mongoose-autopopulate'));
module.exports = model('User', UserSchema);