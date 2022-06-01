const errCode = require('../lib/errCode')
const unless = require('koa-unless')

module.exports = ()=>{
    const auth = async (ctx,next)=>{
       const ticket = ctx.request.get('Authorization')
       const token = (ticket&&ticket.split(' ')[0]==='Bearer')?ticket.split(' ')[1]:null
       if(token){
           try{
               ctx.state.user = await ctx.jwt.getPayload(token)
               ctx.state.token = token
           }catch(e){
               ctx.error(errCode.TOKEN_INVALID_OR_EXPIRE,'token无效或已过期')
               return
           }
       }else{
              ctx.error(errCode.UNAUTHORIZATION,'未授权,请先登录')
              return 
       }
       await next()
    }
    auth.unless = unless
    return auth
}