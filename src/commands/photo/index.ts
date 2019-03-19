import { ContextMessageUpdate } from 'telegraf'
import request = require('request')

const photo = (ctx: ContextMessageUpdate) => {
  // console.log(ctx.from)
  // ctx.getChat().then(chat => console.log(chat.username))
  // ctx.telegram
  //   // @ts-ignore:2532
  //   .getFileLink(ctx.message.photo[ctx.message.photo.length-1].file_id)
  //   .then(fileUrl => {
  //     console.log(fileUrl)
  //   })
  const id = ctx.from.id
  request.get(`http://127.0.0.1/user?id=${id}&platform=telegram`)
  if (ctx.from.id === 90) {
  }
}

export default photo
