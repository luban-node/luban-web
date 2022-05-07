module.exports = () => {
  return async (ctx, next) => {
    ctx.success = (data) => {
      ctx.body = {
        code: ctx.errCode.SUCCESS,
        msg: 'success',
        data
      }
    }
    ctx.error = (code = ctx.errCode.ERROR, msg = 'error') => {
      ctx.body = {
        code,
        msg
      }
    }
    await next()
  }
}
