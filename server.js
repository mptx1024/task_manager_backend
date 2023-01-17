require('dotenv').config();

const admin = require('firebase-admin');
// const { applicationDefault } = require('firebase-admin/auth');
const useEmulator = true;

if (useEmulator) {
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
}

const defaultApp = admin.initializeApp({
    // or
    // credential: admin.applicationDefault(),
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

// Used to create new user with Emulator auth (check it's UI)
// 
// admin
//     .auth()
//     .createUser({
//         displayName: 'John Doe',
//         email: 'user@example.com',
//         password: 'secretPassword',
//     })
//     .then((user) => {
//         console.log('Successfully created new user:', user);
//     })
//     .catch((error) => {
//         console.log('Error creating new user:', error);
//     });
