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

const useEmulator = process.env.NODE_ENV === 'production' ? false : true;
// const useEmulator = false;

if (useEmulator) {
    process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
}

const defaultApp = admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

app.use(verifyToken);
app.use('/api/v1/todos', require('./routes/todoRoutes'));
app.use('/api/v1/projects', require('./routes/projectRoutes'));

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
