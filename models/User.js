const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    // password

    uid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('User', userSchema);
