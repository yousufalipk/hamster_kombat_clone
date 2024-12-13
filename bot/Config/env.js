const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const BOT_TOKEN = process.env.BOT_TOKEN;
const REACT_APP_URL = process.env.REACT_APP_URL;

module.exports = {
    PORT,
    BOT_TOKEN,
    REACT_APP_URL
}