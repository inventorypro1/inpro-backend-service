const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AccountSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = Account = mongoose.model('accounts', AccountSchema);
