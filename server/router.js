const router = require('koa-router')()
const multer = require('@koa/multer')
const qrController = require('./controller/qr')
const wmController = require('./controller/wm')
const uploadController = require('./controller/upload')
const ocrController = require('./controller/ocr')
const userController = require('./controller/user')

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
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)

module.exports = router
