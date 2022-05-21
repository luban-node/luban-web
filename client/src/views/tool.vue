<template>
  <div>
    <el-scrollbar class="page-component__scroll">
      <div class="page-container page-component">
        <div
          class="page-component__nav el-scrollbar side-nav"
          style="opacity: 1"
        >
          <ul>
            <li class="nav-item">
              <a href="/tool/qr">生成二维码</a>
            </li>
            <li class="nav-item">
              <a href="/tool/dy/wm">抖音去水印</a>
            </li>
            <li class="nav-item">
              <a href="/tool/ocr">文字识别(OCR)</a>
            </li>
          </ul>
        </div>
        <div class="page-component__content">
          <div class="content content">
            <router-view />
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.page-component__content {
  padding-left: 270px;
  padding-bottom: 100px;
  box-sizing: border-box;
}

.page-component__scroll {
  height: calc(100% - 80px);
  margin-top: 80px;
}

.page-container {
  width: 1140px;
  padding: 0;
  margin: 0 auto;
}

.page-component.page-container {
  padding: 0;
}

.page-component .side-nav {
  height: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  padding-right: 0;
}

.side-nav {
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  transition: opacity 0.3s;
}

.side-nav ul {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.side-nav .nav-item a {
  font-size: 16px;
  color: #333;
  line-height: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: block;
  position: relative;
  transition: 0.15s ease-out;
  font-weight: 700;
}

.page-component .page-component__nav {
  width: 240px;
  position: fixed;
  top: 0;
  bottom: 0;
  margin-top: 80px;
  transition: padding-top 0.3s;
}

.page-component .content {
  padding-top: 50px;
}

a {
  color: #409eff;
  text-decoration: none;
}
</style>
