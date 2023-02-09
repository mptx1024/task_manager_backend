const User = require('../models/User');
const insertTemplateData = require('../utils/insertTemplateData');
const expireTime = require('../config/anonymousDataExpireTime');
const createNewUser = async (userObj) => {
    let newUser;

    try {
        newUser = await User.findOneAndUpdate(
            { uid: userObj.uid },
            { ...userObj, expireAt: userObj.isAnonymous ? expireTime() : null },
            { upsert: true }
        );

        console.log('🚀 ~ file: createNewUser.js:32 ~ createNewUser ~ newUser', newUser);

        if (newUser) {
            await insertTemplateData(newUser.uid, userObj.isAnonymous);
        }
        
    } catch (error) {
        console.log(error.message);
    }

    return;
};

module.exports = createNewUser;
