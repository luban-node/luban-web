class Upload {
  async image (ctx) {
    return ctx.success({ imgUrl: ctx.file.path })
  }
}

module.exports = new Upload()
