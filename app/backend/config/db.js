const mongoose = require('mongoose');
const { MONGO_DB_URI } = require('./env');

const connectToDb = () => {
    mongoose.connect(MONGO_DB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
    })
        .then(() => {
            console.log("Database Connected Successfully!");
        })
        .catch((err) => {
            console.error("Error connecting Database!", err);
        });
};

module.exports = connectToDb;
