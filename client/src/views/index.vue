<template>
  <div class="container">
    <el-container>
      <el-header class="header">
        <div class="container" />
      </el-header>
      <el-container class="container">
        <el-aside width="200px">
          <el-scrollbar>
            <div class="side-nav">
              <ul>
                <li class="nav-item">
                  <a href="#">选项1</a>
                </li>
                <li class="nav-item">
                  <a href="#">选项2</a>
                </li>
              </ul>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header{
    height: 80px;
    background-color: #fff;
    color: #fff;
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
</style>>
