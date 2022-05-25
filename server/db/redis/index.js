const Redis = require("ioredis");
const {redisConfig} = require('../../config')
const redis = new Redis(redisConfig.url)
redis.on('ready',()=>{
    console.log(`redis连接成功:${redisConfig.url}`)
})
module.exports = redis