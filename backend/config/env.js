const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const FRONTEND_APP_PATH = process.env.FRONTEND_APP_PATH;

module.exports = {
    PORT,
    MONGO_DB_URI,
    FRONTEND_APP_PATH
}