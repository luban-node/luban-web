const jwt = require('jsonwebtoken')
const redis = require('../db/redis')
const {jwtConfig} = require('../config')
const {v4:uuid} = require('uuid')

class Jwt{
   async createToken(payload){
      const tokenId = uuid()
      const token = await jwt.sign(payload,jwtConfig.key)
      await redis.setex(tokenId,jwtConfig.expire,token)
      return tokenId
   }

   async removeToken(tokenId){
       if(tokenId){
           await redis.del(tokenId)
       }
   }

   async getPayload(tokenId){
       let token = null
      if(tokenId) token = await redis.get(tokenId)
      if(!token) throw new Error()
      const payload = await jwt.verify(token,jwtConfig.key)
      // 验证成功,刷新token时间
      await redis.expire(tokenId,jwtConfig.expire)
      return payload
   }
}

module.exports = new Jwt()

