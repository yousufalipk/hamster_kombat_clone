const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
const BOT_TOKEN = process.env.BOT_TOKEN;

module.exports = {
    PORT,
    BOT_TOKEN
}