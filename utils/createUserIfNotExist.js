const User = require('../models/User');

const createUserIfNotExist = async (userObj) => {
    const duplicate = await User.findOne({ uid: userObj.uid }).lean().exec();

    if (duplicate) {
        console.log(`duplicated: ${JSON.stringify(duplicate)}`);
        return;
    }

    const user = await User.create(userObj);
};

module.exports = createUserIfNotExist;
