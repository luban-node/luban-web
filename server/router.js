const router = require('koa-router')()
const qrController = require('./controller/qr')
router.prefix('/api')

router.post('/qr/create', qrController.create)

module.exports = router
