const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

module.exports = {
    PORT,
    MONGO_DB_URI,
    TELEGRAM_BOT_TOKEN
}