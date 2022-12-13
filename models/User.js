const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        max: 500,
    },

    img: {
        type: String,
    },

    like: {
        type: Array,
        default: [],
    },

},


    { timestamps: true }

);

module.exports = mongoose.model('User', UserShema);