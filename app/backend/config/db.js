const mongoose = require('mongoose');
const { MONGO_DB_URI } = require('./env');

const connectToDb = () => {
    mongoose.connect(MONGO_DB_URI)
        .then((val) => {
            console.log("Database Connected Successfuly!");
        })
        .catch((val) => {
            console.log("Error connecting Database!", val);
        })
}

module.exports = connectToDb;