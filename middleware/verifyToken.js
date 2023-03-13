const admin = require('firebase-admin');

const { format } = require('date-fns');
const createNewUser = require('../utils/createNewUser');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    // console.log(
    //     `${format(new Date(), 'yyyyMMdd HH:mm:ss')} ${req.method} ${req.originalUrl} ${
    //         req.headers.authorization ? '--has token' : '--no token'
    //     }`
    // );
    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split(' ')[1];
    } else {
        return res.status(401).json({ message: ' Unauthorized' });
    }

    let decoded;
    try {
        decoded = await admin.auth().verifyIdToken(idToken);
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ message: ' Unauthorized. The Firebase ID token has been revoked' });
    }
    // console.log('uid: ', decoded.uid, 'email: ', decoded.email);
    const userObject = {
        username: decoded.name || null,
        uid: decoded.uid,
        email: decoded.email || null,
        photoUrl: decoded.picture || null,
        isAnonymous: decoded.email ? false : true,
    };
    req.user = userObject;
    next();
};

module.exports = verifyToken;
