const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split(' ')[1];
        console.log('id token: ', idToken);
    } else {
        return res.status(401).json({ message: ' Unauthorized' });
    }

    try {
        const decoded = await admin.auth.verifyToken(idToken);
        req.user = decoded;
        console.log('decoded: ', decoded);
        console.log('verified!!');
    } catch (error) {
        return res.status(403).json({ message: 'In Middleware verifyJWT.js. Forbidden' });
    }
    next();
};

module.exports = verifyToken;
