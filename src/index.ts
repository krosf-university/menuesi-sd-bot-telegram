import Telegraf from 'telegraf'
import commandArgs from './middleware/arguments'
import photo from './commands/photo'
import subscribe from './commands/subscribe'
import express = require('express')
import bodyParser = require('body-parser')
import { NotifyPayload } from './types'
const app = express()

app.use(bodyParser())

const BOT_TOKEN = `${process.env.BOT_TOKEN}`
const USERNAME = process.env.USERNAME
const PORT = Number(process.env.PORT) || 3000
const WEBHOOK_URL = `${process.env.WEBHOOK_URL}/bot${BOT_TOKEN}`

const bot = new Telegraf(BOT_TOKEN, { username: USERNAME })

bot.use(commandArgs)

bot.start(ctx => ctx.reply('Bienvenido a Menus ESI!'))
bot.help(ctx => ctx.reply('/subscribe campus'))
bot.command('subscribe', subscribe)
bot.on('photo', photo)

app.post('/', (req, res) => {
  const body = req.body as NotifyPayload
  body.users.forEach(user => {
    bot.telegram.sendPhoto(user.chatid, body.image)
    bot.telegram.sendMessage(user.chatid, user.campus)
  })
  res.writeHead(200)
  res.end()
})

const production = () => {
  bot.telegram.setWebhook(WEBHOOK_URL)
  app.listen(3000)
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT)
}

const development = () => {
  bot.telegram.deleteWebhook()
  app.listen(3000)
  bot.startPolling()
}

process.env.NODE_ENV === 'production' ? production() : development()
