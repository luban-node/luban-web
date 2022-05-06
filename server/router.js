const router = require('koa-router')()
router.prefix('/api')

router.get('/', async (ctx, next) => {
  ctx.body = 'HelloWorld'
})

module.exports = router
