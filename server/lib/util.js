class Util {
   static  getClientIp(ctx){
       const forwardedIp = ctx.ips[ctx.ips.length-1]
       const req = ctx.req
       const ip = forwardedIp ||
       req.connection.remoteAddress ||
       req.socket.remoteAddress ||
       req.connection.socket.remoteAddress
       ctx.__ip= ip&&ip.replace('::ffff:','')
       return ctx.__ip
   }
}

module.exports = Util