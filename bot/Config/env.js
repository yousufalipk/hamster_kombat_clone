const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const BOT_TOKEN = process.env.BOT_TOKEN;
const REACT_APP_URL = process.env.REACT_APP_URL;
const ANNOUNCEMENT_CHANNEL_URL = process.env.ANNOUNCEMENT_CHANNEL_URL;
const TELEGRAM_CHAT_URL = process.env.TELEGRAM_CHAT_URL;
const GAME_BOT_URL = process.env.GAME_BOT_URL;

module.exports = {
    PORT,
    BOT_TOKEN,
    REACT_APP_URL,
    ANNOUNCEMENT_CHANNEL_URL,
    TELEGRAM_CHAT_URL,
    GAME_BOT_URL
}