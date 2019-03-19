import { ContextMessageUpdateArgs } from '../../types'
import request = require('request')
import emoji = require('node-emoji')
const help = '/subscribe esi'

const subscribe = (ctx: ContextMessageUpdateArgs) => {
  if (ctx.command.args.length < 1) {
    ctx.reply(help)
  } else {
    const user = {
      id: ctx.from.id,
      username: ctx.from.username,
      campus: ctx.command.args[0],
    }
    request.post(
      'http://127.0.0.1/subscribe',
      {
        json: user,
      },
      (error, res, body) => {
        if (error) {
          console.log(error)
          ctx.reply('No se ha podido registrar su preferencia')
          return
        }
        ctx.reply(emoji.emojify('Se ha registado su preferencia :tada:'))
        console.log(`statusCode: ${res.statusCode}`)
        console.log(body)
      },
    )
  }
}

export default subscribe
