import { Telegraf, Markup } from "telegraf";
import { config } from "dotenv";
config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start(async (ctx) => {
	const username = ctx.from.username;
	console.log(`User @${username} started the bot`);

	const keyboard = Markup.inlineKeyboard([
		[Markup.button.url("Play", "https://panda-tap.vercel.app")],
	]);

	await ctx.reply(`Hello @${username}, your bot is ready to work!`, keyboard);
});

bot
	.launch()
	.then(() => console.log("Bot launched successfully"))
	.catch((error) => console.error("Error launching bot:", error));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
