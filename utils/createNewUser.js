const User = require('../models/User');
const expireTime = require('../config/anonymousDataExpireTime');
const createNewUser = async (userObj) => {
    const newUser = await User.create({ ...userObj, expireAt: userObj.isAnonymous ? expireTime() : null });
    return newUser;
};

module.exports = createNewUser;
