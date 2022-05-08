const router = require('koa-router')()
const qrController = require('./controller/qr')
const wmController = require('./controller/wm')
router.prefix('/api')

router.post('/qr/create', qrController.create)
router.post('/wm/dy', wmController.dy)

module.exports = router
