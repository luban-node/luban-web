<template>
<div>
    <div id="index">
        <Header />
        <div class="main-cnt">
            <router-view />
        </div>
        <Footer/>
    </div>
</div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
    components: { Header,Footer },
    created() {
        if (this.$route.path === "/") {
            this.$router.push("/tool/qr");
        }
    },
};
</script>

<style>
#index .main-cnt {
    padding: 0;
    margin-top: 0;
    height: 100%;
    min-height: auto;
}

.main-cnt {
    margin-top: -80px;
    padding: 80px 0 340px;
    box-sizing: border-box;
    min-height: 100%;
}
</style>>
