<template>
  <div>
    <div>
      <el-form ref="form" :model="form" size="small">
        <el-form-item label="输入抖音app复制链接地址">
          <el-input v-model="form.url" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="dy">
            抖音去水印
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div v-if="noWmUrl">
      <el-row>
        <video
          ref="videoPlayer"
          :src="noWmUrl"
          controls
          style="height: 500px"
        ></video>
      </el-row>
    </div>
  </div>
</template>

<script>
import { dyWm } from "../utils/api";
export default {
  name: "DyWm",
  data() {
    return {
      form: {
        url: "6.10 IVy:/ 没有 %%迎新日的青春感穿搭 %%宅家照样变好看 %%livephoto  https://v.douyin.com/FAGeRdf/ 复制此链接，打开Dou音搜索，直接观看视频！",
      },
      noWmUrl: "",
    };
  },
  methods: {
    dy() {
      dyWm(this.form).then((res) => {
        this.noWmUrl = res.noWmUrl;
      });
    },
  },
};
</script>

<style>
</style>
