const User = require('../models/User');
const insertTemplateData = require('../utils/insertTemplateData');

const createNewUser = async (userObj) => {
    const isUserExist = await User.findOne({ uid: userObj.uid });
    console.log('🚀 ~ file: createNewUser.js:6 ~ createNewUser ~ isUserExist', isUserExist);
    console.log('🚀 ~ file: createNewUser.js:5 ~ createNewUser ~ userObj', userObj.uid);
    if (isUserExist) {
        return;
    }
    let newUser;
    if (!userObj.isAnonymous) {
        newUser = await User.create(userObj);
    } else {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 5);
        newUser = await User.create({ ...userObj, expireAt: date });
    }

    await insertTemplateData(newUser.uid, userObj.isAnonymous);
    return;
};

module.exports = createNewUser;
