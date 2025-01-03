const express = require('express');
const { Telegraf } = require('telegraf');
const { PORT, BOT_TOKEN, ANNOUNCEMENT_CHANNEL_URL, TELEGRAM_CHAT_URL, GAME_BOT_URL } = require('./Config/env');

const bot = new Telegraf(BOT_TOKEN);
const app = express();
app.use(express.json());

bot.start((ctx) => {
	const username = ctx.from.username || 'there';
	const welcomeMessage = `
🎉 Welcome ${username} to PandaTap! 🐼
Ready to see how high you can climb? Tap away and watch your fortunes grow!

Step into the world of PandaTap and begin your journey from the ground up to the prestigious Founder level! Upgrade your cards and level up by tapping and completing various tasks within the app.

And remember, adventures are best with friends.
🤝 Invite your friends: more friends — more profit! 💸
`;

	const inlineButtons = [
		{ text: '📢 Announcement Channel', url: ANNOUNCEMENT_CHANNEL_URL },
		{ text: '💬 Telegram Chat', url: TELEGRAM_CHAT_URL },
		{ text: '🎮 Game Bot', url: GAME_BOT_URL }
	];

	const keyboard = {
		inline_keyboard: inlineButtons.map((button) => [{ text: button.text, url: button.url }])
	};

	return ctx.reply(welcomeMessage, { reply_markup: keyboard });
});

bot.help((ctx) => ctx.reply('Available commands: /start, /help'));

// Echo User Messages
bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`));

// Retry Logic for Webhook Setup
const retryWebhook = async (url, retryAfter) => {
	const delay = retryAfter * 1000;
	console.log(`Too many requests. Retrying after ${retryAfter} seconds...`);

	setTimeout(async () => {
		try {
			await bot.telegram.setWebhook(url);
			console.log(`Webhook successfully set to: ${url}`);
		} catch (error) {
			console.error('Error retrying webhook:', error.response?.description || error.message);
		}
	}, delay);
};


// Express Route for Webhook
const BOT_WEBHOOK_PATH = '/bot';
app.post(BOT_WEBHOOK_PATH, (req, res) => {
	bot.handleUpdate(req.body);
	res.sendStatus(200);
});

// Start Server and Setup Webhook
app.listen(PORT, async () => {
	console.log(`Server running on http://localhost:${PORT}`);

	const WEBHOOK_URL = `https://telegram-bot-production-e664.up.railway.app${BOT_WEBHOOK_PATH}`;
	try {
		await bot.telegram.setWebhook(WEBHOOK_URL);
		console.log(`Webhook set to ${WEBHOOK_URL}`);
	} catch (error) {
		if (error.response && error.response.error_code === 429) {
			const retryAfter = error.response.parameters.retry_after;
			retryWebhook(WEBHOOK_URL, retryAfter);
		} else {
			console.error('Error setting webhook:', error.response?.description || error.message);
		}
	}
});
