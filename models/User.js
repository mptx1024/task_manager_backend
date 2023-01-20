const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
    },
    // password

    uid: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    photoUrl: {
        type: String,
        required: false,
    },
    isAnonymous: {
        type: Boolean,
        required: true,
    },
    expireAt: {
        type: Date,
    },
});
userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('User', userSchema);
