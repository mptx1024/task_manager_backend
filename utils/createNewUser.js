const User = require('../models/User');
const injectSampleData = require('../utils/injectSampleData');
const expireTime = require('../config/anonymousDataExpireTime');
const createNewUser = async (userObj) => {
    const newUser = await User.create({ ...userObj, expireAt: userObj.isAnonymous ? expireTime() : null });
    // const newUser = await User.create({});

    return newUser;
};

module.exports = createNewUser;
