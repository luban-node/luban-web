const Koa = require('koa')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const router = require('./router')
const errCode = require('./lib/errCode')
const comResp = require('./middlware/comResp')
const ocrScheduler = require('./lib/ocrScheduler')
const Util = require('./lib/util')
const jwt = require('./lib/jwt')
const auth = require('./middlware/auth')
const {noLoginApi} = require('./config')
const redis = require('./db/redis')

const app = new Koa({
  proxy: true,
  maxIpsCount: 1, // 服务器前只有一个代理
})

// error handler
onerror(app)

// lib
app.context.errCode = errCode
app.context.redis = redis
app.context.jwt = jwt
app.context.ocrScheduler = ocrScheduler

// middlewares
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.join(__dirname, '/public')))
app.use(comResp())
app.use(auth().unless({path:noLoginApi}))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${Util.getClientIp(ctx)} ${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
