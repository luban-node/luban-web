const qrCode = require('qrcode')
class QrController {
  async create (ctx) {
    const { text = 'Luban', options } = ctx.request.body
    const qrOptions = {
      type: 'image/png',
      width: 180,
      margin: 0,
      scale: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M',
      quality: 1
    }
    Object.assign(qrOptions, options)
    const imgData = await qrCode.toDataURL(text, qrOptions)
    return ctx.success({ imgData })
  }
}

module.exports = new QrController()
