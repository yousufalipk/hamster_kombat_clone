const { Telegraf } = require("telegraf");
const dotenv = require('dotenv');
dotenv.config();

const { BOT_TOKEN, PORT } = require('./Config/env');
const bot = new Telegraf(BOT_TOKEN);
const express = require("express");
const app = express();

app.use(express.json());

const web_link = "https://t.me/pandatap_mini_bot/pandatap";
const community_link = "https://t.me/kvantsarcadetask";

// Bot commands
bot.start(async (ctx) => {
	console.log('Bot started!');
	const chatId = ctx.message.chat.id;
	const userId = ctx.message.from.id;
	const startPayload = ctx.startPayload;

	const urlSent = `${web_link}`;

	ctx.replyWithMarkdown(`*Hey, Welcome to Panda Tap!*`, {
		reply_markup: {
			inline_keyboard: [
				[{
					text: "👋 Start now!",
					web_app: { url: web_link }
				}],
				[{
					text: "Join our Community",
					url: community_link
				}]
			]
		}
	});
});

// Webhook route
app.post('/bot', (req, res) => {
	bot.handleUpdate(req.body, res);
	res.sendStatus(200);
});

// Express server for health check
app.get('/', (req, res) => {
	res.send('Bot is running');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
