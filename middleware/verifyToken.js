const admin = require('firebase-admin');
const createUserIfNotExist = require('../utils/createUserIfNotExist');
const verifyToken = async (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split(' ')[1];
        // console.log('id token: ', idToken);
    } else {
        return res.status(401).json({ message: ' Unauthorized' });
    }

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);

        // console.log('🚀 ~ file: verifyToken.js:14 ~ verifyToken ~ decoded', decoded);

        const userObject = {
            username: decoded.name,
            uid: decoded.uid,
            email: decoded.email,
            // last_auth_time: decoded.auth_time,
        };
        createUserIfNotExist(userObject);
        req.user = userObject;
        // console.log('userObject: ', userObject);
        console.log('verified!!');
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = verifyToken;
