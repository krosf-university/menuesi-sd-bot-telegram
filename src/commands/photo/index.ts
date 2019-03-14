import { ContextMessageUpdate } from 'telegraf'

const photo = (ctx: ContextMessageUpdate) => {
  console.log(ctx.from)
  ctx.getChat().then(chat => console.log(chat.username))
  ctx.telegram
    // @ts-ignore:2532
    .getFileLink(ctx.message.photo[ctx.message.photo.length-1].file_id)
    .then(file => {
      console.log(file)
    })
}

export default photo
