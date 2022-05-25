const errCode = require('../lib/errCode')
const validator = require('validator')
const User = require('../db/mysql/model/user')
const { Op } = require("sequelize");
const Util = require('../lib/util')
const jwt = require('../lib/jwt')

class UserController {
   async register(ctx) {
      let { email, password, nickname } = ctx.request.body
      if (!email || !password || !nickname) {
         return ctx.error(errCode.PARAMS_ERROR, '参数错误')
      } else if (!validator.isEmail(email)) {
         return ctx.error(errCode.EMAIL_ERROR, '邮箱格式错误')
      } else if (nickname.length < 5 || nickname.length > 12) {
         return ctx.error(errCode.NICKNAME_ERROR, '昵称长度错误')
      }

      email = email.toLowerCase()

      // 检查邮箱或昵称是否重复
      let user = await User.findOne({
         where: {
            [Op.or]: {
               email,
               nickname
            }
         }
      })
      if (user) return ctx.error(errCode.USER_ALREADY_EXIST, '邮箱或用户名已存在')

      //创建新用户
      const salt = Math.random().toString(36).substring(2)
      password = Util.md5(`${password}${salt}`)
      const avatar = `https://dn-qiniu-avatar.qbox.me/avatar/${Util.md5(email)}?size=48`
      user = await User.create({ email, nickname, salt, password, avatar })
      return ctx.success()
   }

   async login(ctx) {
      let { email, password } = ctx.request.body
      if (!email || !password) {
         return ctx.error(errCode.PARAMS_ERROR, '参数错误')
      } else if (!validator.isEmail(email)) {
         return ctx.error(errCode.EMAIL_ERROR, '邮箱格式错误')
      }
      email = email.toLowerCase()
      let user = await User.findOne({
         where: {
            email
         }
      })
      if (!user) return ctx.error(errCode.USER_NOT_EXIST, '用户不存在')
      const userPassword = Util.md5(`${password}${user.salt}`)
      if (userPassword !== user.password) return ctx.error(errCode.PARAMS_ERROR, '密码错误')
      // 登录成功,创建token
      const token =  await jwt.createToken(user.toJSON())
      return ctx.success({ nickname: user.nickname, avatar: user.avatar,token})
   }

   async logout(ctx){
      const token = ctx.state.token
      await jwt.removeToken(token)
      return ctx.success()
   }

}

module.exports = new UserController()