const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);
