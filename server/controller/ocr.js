const path = require('path')
const errCode = require('../lib/errCode')
class OcrController {
  async ocr(ctx) {
    const { imgUrl, rectangle } = ctx.request.body
    if (!imgUrl || !rectangle) return ctx.error(errCode.PARAMS_ERROR, '参数错误')
    const { data: { text } } = await ctx.ocrScheduler.addJob('recognize', path.join(__dirname, '..', imgUrl), { rectangle })
    return ctx.success({ text })
  }
}

module.exports = new OcrController()
