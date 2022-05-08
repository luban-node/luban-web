const got = require('got')

const PHONE_AGENT = ' Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'

class WaterMarkController {
  async dy (ctx) {
    const { url } = ctx.request.body
    // 请求抖音链接中的url
    const shortUrl = /https:\/\/\S*/.exec(url)[0]
    const resp = await got.get(shortUrl, { headers: { 'user-agent': PHONE_AGENT } })
    // 获取视频唯一id
    const videoUrl = resp.redirectUrls[0]
    const videoId = /video\/(\d+)\//.exec(videoUrl)[1]
    const apiUrl = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${videoId}`
    const resp1 = await got.get(apiUrl, { headers: { 'user-agent': PHONE_AGENT } }).json()
    const videoObj = resp1.item_list[0]
    const noWmUrl = videoObj.video.play_addr.url_list[0].replace('wm', '')
    return ctx.success({ noWmUrl })
  }
}

module.exports = new WaterMarkController()
