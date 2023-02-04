require('dotenv').config();
require('express-async-error');
const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const verifyToken = require('./middleware/verifyToken');
const connectDB = require('./config/dbConnection');

const PORT = process.env.PORT || 3500;

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

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
app.use('/api/v1/projects', verifyToken, require('./routes/projectRoutes'));

// catch-all for 404 not found
app.all('*', (req, res) => {
    res.status(404).json({ msg: '404 Not Found' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log(`Connected to mongoDB`);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}....`);
    });
});
