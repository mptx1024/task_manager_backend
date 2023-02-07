const User = require('../models/User');
const insertTemplateData = require('../utils/insertTemplateData');

const createNewUser = async (userObj) => {
    let newUser;

    try {
        if (!userObj.isAnonymous) {
            newUser = await User.findOneAndUpdate({ uid: userObj.uid }, { ...userObj }, { upsert: true });
        } else {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 5);
            newUser = await User.findOneAndUpdate(
                { uid: userObj.uid },
                { ...userObj, expireAt: date },
                { upsert: true }
            );
        }
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
