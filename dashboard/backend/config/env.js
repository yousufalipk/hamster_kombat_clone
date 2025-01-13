const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

module.exports = {
    PORT,
    MONGODB_URI,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    FRONTEND_ORIGIN,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
}