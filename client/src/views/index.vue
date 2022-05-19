<template>
  <div class="container">
    <el-container>
      <el-header class="header">
        <div class="container">
          <h1>Luban</h1>
        </div>
      </el-header>
      <el-container class="container">
        <el-aside width="200px">
          <el-scrollbar>
            <div class="side-nav">
              <ul style="margin-top:50px">
                <li class="nav-item">
                  <a href="/qr">生成二维码</a>
                </li>
                <li class="nav-item">
                  <a href="/dy/wm">抖音去水印</a>
                </li>
                <li class="nav-item">
                  <a href="/ocr">文字识别(OCR)</a>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <el-footer class="footer">
        <el-link href="https://github.com/Selenium39" target="_blank" type="info" :underline="false">© {{new Date().getFullYear()}} Selenium39</el-link>
        <el-link href="https://beian.miit.gov.cn/" target="_blank" type="info" :underline="false">湘ICP备2021019331号</el-link>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  created () {
    if (this.$route.path === '/') {
      this.$router.push('/qr')
    }
  }
}
</script>

<style scoped>
.header{
    height: 80px;
    background-color: #fff;
    color: #409eff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;
}
.container{
    width: 80%;
    padding: 0;
    margin: 0 auto;
}
.header .container{
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
}

.el-menu > .el-menu-item.is-active {
  border-bottom: none;
}

.side-nav {
    width: 100%;
    box-sizing: border-box;
    padding-right: 30px;
    transition: opacity .3s;
    opacity: 1;
}

.nav-item{
   height:40px;
}

.nav-item a {
    display: block;
    height: 40px;
    color: #444;
    line-height: 40px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
}

.nav-item a:hover {
    color: #409eff;
}

li{ list-style: none}

a{text-decoration:none}

.footer{
  height:50px;
  width: 80%;
  text-align: center;
  position: fixed;
  bottom: 0px;
}
</style>>
