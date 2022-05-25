const crypto = require('crypto')

class Util {
   static  getClientIp(ctx){
       const forwardedIp = ctx.ips[0]
       const req = ctx.req
       const ip = forwardedIp ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress
       ctx.__ip= ip&&ip.replace('::ffff:','')
       return ctx.__ip
   }

   static md5(item){
      return crypto.createHash('md5').update(item).digest('hex')
   }
}

module.exports = Util