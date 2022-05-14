const path = require('path')
const { createWorker, createScheduler } = require('tesseract.js')

const ocrScheduler = createScheduler()
;(async () => {
  for (let i = 0; i < 1; i++) { // 因为使用了pm2，只创建一个worker
    const worker = createWorker({
      langPath: path.join(__dirname, '..', 'lang-data'),
      cachePath: path.join(__dirname, '..')
    //   logger: m => console.log(m)
    })
    await worker.load()
    await worker.loadLanguage('chi_sim+jpn+eng')
    await worker.initialize('chi_sim+jpn+eng')
    console.log('ocrScheduler init finish')
    ocrScheduler.addWorker(worker)
  }
})()

module.exports = ocrScheduler
