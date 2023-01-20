const User = require('../models/User');

const createUserIfNotExist = async (userObj) => {
    const duplicate = await User.findOne({ uid: userObj.uid }).lean().exec();
    if (duplicate) {
        // console.log(`duplicated: ${JSON.stringify(duplicate)}`);
        return;
    }
    if (!userObj.isAnonymous) {
        await User.create(userObj);
    } else {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        await User.create({ ...userObj, expireAt: date });
    }
};

module.exports = createUserIfNotExist;
