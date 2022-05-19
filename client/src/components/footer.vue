<template>
<div class="footer">
    <el-link href="https://github.com/Selenium39" target="_blank" type="info" :underline="false">© {{ new Date().getFullYear() }} Selenium39</el-link>
    <el-link href="https://beian.miit.gov.cn/" target="_blank" type="info" :underline="false">湘ICP备2021019331号</el-link>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
    height: 50px;
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0px;
}
</style>
