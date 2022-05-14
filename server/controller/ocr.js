const path = require('path')
class OcrController {
  async ocr (ctx) {
    const { imgUrl, rectangle } = ctx.request.body
    console.log(imgUrl)
    console.log(rectangle)
    const { data: { text } } = await ctx.ocrScheduler.addJob('recognize', path.join(__dirname, '..', imgUrl), { rectangle })
    return ctx.success({ text })
  }
}

module.exports = new OcrController()
