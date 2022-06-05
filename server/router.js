const router = require('koa-router')()
const multer = require('@koa/multer')
const qrController = require('./controller/qr')
const wmController = require('./controller/wm')
const uploadController = require('./controller/upload')
const ocrController = require('./controller/ocr')
const userController = require('./controller/user')
const messageController = require('./controller/message')
const imageController = require('./controller/image')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const fileFormat = (file.originalname).split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

const upload = multer({
  dest: 'public/uploads/',
  limits: { fileSize: 5 * 1025 * 1024, files: 1 },
  storage
})

router.prefix('/api')

router.post('/qr/create', qrController.create)
router.post('/wm/dy', wmController.dy)
router.post('/upload/image', upload.single('image'), uploadController.image)
router.post('/ocr', ocrController.ocr)
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/loginCallback', userController.loginCallback)
router.post('/logout', userController.logout)
router.get('/weibo/loginUrl', userController.getWeiboLoginUrl)
router.get('/weibo/loginQr', userController.getWeiboLoginQr)
router.get('/weibo/loginQrStatus', userController.getWeiboLoginQrStatus)
router.post('/message/create', messageController.create)
router.get('/message/show', messageController.show)
router.post('/image/bgColor', imageController.bgColor)

module.exports = router
