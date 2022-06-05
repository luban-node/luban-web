<template>
  <div id="index">
    <Header />
    <div class="main-cnt">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: { Header, Footer },
  created() {
    if (this.$route.path === "/") {
      this.$router.push("/tool/qr");
    }
  },
};
</script>

<style>
#index {
  height: 100%;
}

#index .main-cnt {
  padding: 0;
  margin-top: 0;
  height: 100%;
  min-height: auto;
  box-sizing: border-box;
  overflow-y: scroll;
}
</style>>
