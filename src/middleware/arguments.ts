import { ContextMessageUpdateArgs } from '../types'

const commandArgs = (ctx: ContextMessageUpdateArgs, next: any) => {
  if (ctx.updateType === 'message') {
    const text = ctx.update.message.text.toLowerCase()
    if (text.startsWith('/')) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/)
      let args = [] as String[]
      let command: String
      if (match !== null) {
        if (match[1]) {
          command = match[1]
        }
        if (match[2]) {
          args = match[2].split(' ')
        }
      }
      ctx.command = {
        raw: text,
        command,
        args,
      }
      console.log(ctx.command)
    }
  }
  return next()
}

export default commandArgs
