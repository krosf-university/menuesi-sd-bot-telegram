import Telegraf from 'telegraf'
import photo from './commands/photo'

const BOT_TOKEN = `${process.env.BOT_TOKEN}`
const USERNAME = process.env.USERNAME
const PORT = Number(process.env.PORT) || 3000
const WEBHOOK_URL = `${process.env.WEBHOOK_URL}/bot${BOT_TOKEN}`

const bot = new Telegraf(BOT_TOKEN, { username: USERNAME })
bot.start(ctx => ctx.reply('Welcome!'))
bot.help(ctx => ctx.reply('Send me a sticker'))

bot.on('photo', photo)

const production = () => {
  bot.telegram.setWebhook(WEBHOOK_URL)
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)
}

const development = () => {
  bot.telegram.deleteWebhook()
  bot.startPolling()
}

process.env.NODE_ENV === 'production' ? production() : development()
