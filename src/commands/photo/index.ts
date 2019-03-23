import { ContextMessageUpdate } from 'telegraf'
import moment = require('moment')
import request = require('request')
const photo = async (ctx: ContextMessageUpdate) => {
  const url = await ctx.telegram.getFileLink(
    ctx.message.photo[ctx.message.photo.length - 1].file_id,
  )
  request.post(
    'http://127.0.0.1:8081/image',
    {
      json: {
        id: 'telegram@' + ctx.from.id,
        chatid: ctx.chat.id,
        url,
        campus: ctx.message.caption,
        date: moment().format('DMMYYYY'),
      },
    },
    (error, res, body) => {
      if (error) {
        console.log(error)
        ctx.reply('Ha ocurrido un error')
        return
      }
      ctx.reply('Gracias!!')
      console.log(`statusCode: ${res.statusCode}`)
      console.log(body)
    },
  )
}

export default photo
