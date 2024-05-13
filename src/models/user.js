const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    preferences: {
        type: [String],
        default: null,
    },
    crated_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at:{
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('User', userSchema);