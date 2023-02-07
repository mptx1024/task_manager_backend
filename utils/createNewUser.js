const User = require('../models/User');
const insertTemplateData = require('../utils/insertTemplateData');

const createNewUser = async (userObj) => {
    // const isUserExist = await User.findOne({ uid: userObj.uid });
    // console.log('🚀 ~ file: createNewUser.js:6 ~ createNewUser ~ isUserExist', isUserExist);
    // console.log('🚀 ~ file: createNewUser.js:5 ~ createNewUser ~ userObj', userObj.uid);
    // if (isUserExist) {
    //     return;
    // }
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
        // await insertTemplateData(newUser.uid, userObj.isAnonymous);
    } catch (error) {
        console.log(error.message);
    }

    return;
};

module.exports = createNewUser;
