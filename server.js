require('dotenv').config();
require('express-async-error');
const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
const app = express();
const verifyToken = require('./middleware/verifyToken');
const connectDB = require('./config/dbConnection');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 3500;

connectDB();
app.use(express.json());

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
// Put middleware before any routes to check token
// app.use(verifyToken)

// Only check token for specific route:
app.use('/api/v1/todos', verifyToken, require('./routes/todoRoutes'));

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

// catch-all for 404 not found
app.all('*', verifyToken, (req, res) => {
    res.status(404).json({ msg: '404 Not Found' });
});

mongoose.connection.once('open', () => {
    console.log(`Connected to mongoDB`);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}....`);
    });
});
