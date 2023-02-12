const User = require('../models/User');
const injectSampleData = require('../utils/injectSampleData');
const createNewUser = require('../utils/createNewUser');
const expireTime = require('../config/anonymousDataExpireTime');

// @desc Login
// @route GET /auth
// @access Public
const login = async (req, res) => {
    const userObject = req.user;
    const foundUser = await User.findOne({ uid: userObject.uid }).exec();

    if (foundUser) {
        return res.status(200).json({ msg: `User with UID ${foundUser.uid} already exist.` });
    }

    console.log(`New User! url: ${req.originalUrl} ${userObject.uid}`);
    const newUser = await createNewUser(userObject);
    if (newUser) {
        await injectSampleData(newUser.uid, newUser.isAnonymous);

    }

    res.status(200).json({ msg: `New user with UID ${userObject.uid} created` });
};

module.exports = login;
