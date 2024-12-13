const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const { PORT, BOT_TOKEN, REACT_APP_URL } = require('./Config/env');

const bot = new Telegraf(BOT_TOKEN);
const app = express();

app.use(express.json());

// Bot commands
bot.start((ctx) => {
	ctx.reply(
		'Welcome! How can I help you?',
		Markup.inlineKeyboard([
			[
				Markup.button.url('\u{1F91D} Join Community', 'https://t.me/your_community_link'),
				Markup.button.webApp('\u{1F680} Start App', 'https://t.me/pandatap_mini_bot/pandatap'),
			],
		])
	);
});

bot.help((ctx) => ctx.reply('Available commands: /start, /help'));
bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

const BOT_WEBHOOK_PATH = '/bot';
app.post(BOT_WEBHOOK_PATH, (req, res) => {
	bot.handleUpdate(req.body);
	res.sendStatus(200);
});

bot.on('web_app_data', (ctx) => {
	const { data } = ctx.webAppData;
	if (data === 'close_request') {
		ctx.reply('Are you sure you want to close the app?',
			Markup.inlineKeyboard([
				[
					Markup.button.callback('Yes', 'close_app_confirmed'),
					Markup.button.callback('No', 'close_app_cancelled')
				]
			])
		);
	}
});

bot.action('close_app_confirmed', (ctx) => {
	ctx.answerCbQuery('Closing app...');
});

bot.action('close_app_cancelled', (ctx) => {
	ctx.answerCbQuery('App will remain open.');
});

app.listen(PORT, async () => {
	console.log(`Server running on http://localhost:${PORT}`);
	const WEBHOOK_URL = `${REACT_APP_URL}${BOT_WEBHOOK_PATH}`;
	await bot.telegram.setWebhook(WEBHOOK_URL);
	console.log(`Webhook set to ${WEBHOOK_URL}`);
});
