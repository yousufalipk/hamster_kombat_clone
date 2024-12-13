const express = require('express');
const { Telegraf } = require('telegraf');

const { BOT_TOKEN, PORT } = require('./Config/env.js');

const bot = new Telegraf(BOT_TOKEN);
const app = express();

bot.on('text', (ctx) => {
	ctx.reply('Received your message!');
});

app.post('/webhook', (req, res) => {
	bot.handleUpdate(req.body, res);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
