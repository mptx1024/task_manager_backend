const admin = require('firebase-admin');
const { format } = require('date-fns');
const createUserIfNotExist = require('../utils/createUserIfNotExist');

const verifyToken = async (req, res, next) => {
    console.log(
        `${format(new Date(), 'yyyyMMdd HH:mm:ss')} ${req.method} ${req.path} ${
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

    try {
        const decoded = await admin.auth().verifyIdToken(idToken);

        const userObject = {
            username: decoded.name || null,
            uid: decoded.uid,
            email: decoded.email || null,
            photoUrl: decoded.picture || null,
            isAnonymous: decoded.email ? false : true,
            // last_auth_time: decoded.auth_time,
        };
        console.log(`--isAnonymous: ${Boolean(decoded.email)} --uid: ${decoded.uid};`);
        createUserIfNotExist(userObject);
        req.user = userObject;
    } catch (error) {
        return res.status(403).json({ message: error.message });
    }
    next();
};

module.exports = verifyToken;
