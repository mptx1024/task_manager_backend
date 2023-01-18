const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI, (err) => {
        if (err) throw new Error("Can't connect to DB");
        console.log(`In dbConnection.js: Connected to mongoDB`);
    });
};
module.exports = connectDB;
