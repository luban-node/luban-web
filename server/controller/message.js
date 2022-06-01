const Message = require('../db/mysql/model/message')
const User = require('../db/mysql/model/user')
const WeiboUser = require('../db/mysql/model/weiboUser')
const errCode = require('../lib/errCode')

class MessageController {
   async create(ctx) {
      let { content } = ctx.request.body
      if (!content) return ctx.error(errCode.PARAMS_ERROR, '参数错误')
      else if (content.length > 100) {
         return ctx.error(errCode.MESSAGE_ERROR, '留言长度不能超过100个字符')
      }
      const user = ctx.state.user
      await Message.create({ content, userId: user.id, userType: user.userType })
      return ctx.success()
   }

   async show(ctx) {
      let messages = await Message.findAll({ attributes: ['id', 'content', 'createTime'], include: [{ model: User, attributes: ['nickname', 'avatar'] }, { model: WeiboUser, attributes: ['nickname', 'avatar'] }] })
      messages = messages.map(item => ({ id: item.id, content: item.content, createTime: item.createTime, nickname: (item.user || item.weibo_user).nickname, avatar: (item.user || item.weibo_user).avatar }))
      return ctx.success({ messages })
   }
}

module.exports = new MessageController()