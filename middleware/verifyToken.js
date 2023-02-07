const admin = require('firebase-admin');

const { format } = require('date-fns');
const createNewUser = require('../utils/createNewUser');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    console.log(
        `${format(new Date(), 'yyyyMMdd HH:mm:ss')} ${req.method} ${req.originalUrl} ${
            req.headers.authorization ? '--has token' : '--no token'
        }`
    );
    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split(' ')[1];
        // console.log('id token: ', idToken);
    } else {
        return res.status(401).json({ message: ' Unauthorized' });
    }

    
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const decoded = await admin.auth().verifyIdToken(idToken);
    const isUserExist = await User.findOne({ uid: decoded.uid }).lean().exec();

    const userObject = {
        username: decoded.name || null,
        uid: decoded.uid,
        email: decoded.email || null,
        photoUrl: decoded.picture || null,
        // isAnonymous: decoded.email ? false : true,
        isAnonymous: true,
        // isNewUser: isUserExist ? false : true,
    };
    // console.log('🚀 ~ file: verifyToken.js:36 ~ verifyToken ~ uid', userObject.uid);

    if (!isUserExist) {
        console.log(`New User!!! url: ${req.originalUrl} ${decoded.uid}`);
        await createNewUser(userObject);
    }
    req.user = userObject;
    next();
};

module.exports = verifyToken;
