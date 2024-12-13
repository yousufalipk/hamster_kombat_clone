const express = require('express');
const { Telegraf } = require('telegraf');

const { PORT, BOT_TOKEN, REACT_APP_URL } = require('./Config/env');

const bot = new Telegraf(BOT_TOKEN);

const app = express();

app.use(express.json());

bot.start((ctx) => ctx.reply('Welcome! How can I help you?'));
bot.help((ctx) => ctx.reply('Available commands: /start, /help'));
bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

const BOT_WEBHOOK_PATH = '/bot';
app.post(BOT_WEBHOOK_PATH, (req, res) => {
	bot.handleUpdate(req.body);
	res.sendStatus(200);
});

app.listen(PORT, async () => {
	console.log(`Server running on http://localhost:${PORT}`);

	const WEBHOOK_URL = `${REACT_APP_URL}${BOT_WEBHOOK_PATH}`;
	await bot.telegram.setWebhook(WEBHOOK_URL);
	console.log(`Webhook set to ${WEBHOOK_URL}`);
});
