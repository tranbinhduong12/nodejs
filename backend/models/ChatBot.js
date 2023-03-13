const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        unique: true
    },
    description: {
        type: String,
        default: "No description provided",
    },
    patterns: {
        type: Array,
        required: true,
    },
    responses: {
        type: Array,
        required: true,
    }
},
{timestamps: true});


module.exports = mongoose.model('ChatBot', chatSchema);
