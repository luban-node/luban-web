const got = require('got')
const { baiduConfig } = require('../config')
const sharp = require('sharp')
const BASE64_IMG_REG = /^data:image\/(png|jpeg);base64,/

class ImageController {
    async bgColor(ctx) {
        const { image, width, height, background } = ctx.request.body
        const { r, g, b } = background
        const BASE64_IMG_PREFIX = image.match(BASE64_IMG_REG)[0]
        const { access_token } = await got.post(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${baiduConfig.clientId}&client_secret=${baiduConfig.clientSecret}`).json()
        const { foreground } = await got.post(`https://aip.baidubce.com/rest/2.0/image-classify/v1/body_seg?access_token=${access_token}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            form: {
                image: image.trimStart(BASE64_IMG_PREFIX),
                type: 'foreground'
            }
        }).json()
        const buffer = await sharp({
            create: {
                width,
                height,
                channels: 4,
                background: { r, g, b, alpha: 1 }
            }
        }).composite([
            { input: Buffer.from(foreground, 'base64') }
        ]).png().toBuffer()
        const img = BASE64_IMG_PREFIX + buffer.toString('base64')
        return ctx.success({ img })
    }
}

module.exports = new ImageController()