<template>
  <div>
    <div class="show">
      <div v-if="imgBase64">
        <el-image :src="imgBase64"></el-image>
      </div>
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        size="small"
        v-else
      >
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            drag
            action=""
            :show-file-list="false"
            :limit="1"
            :http-request="upload"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__text">
              将证件照拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件,且不超过4M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="选择背景颜色">
          <el-color-picker
            v-model="form.color"
            color-format="rgb"
            :predefine="predefineColors"
          >
          </el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isUploading"
            @click="changeBgColor"
            size="small"
            type="primary"
            >开始证件照换底色</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="imgBase64"
            @click="download"
            size="small"
            type="primary"
            >下载证件照</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { bgColor } from "../utils/api";
export default {
  name: "bgcolor",
  data() {
    return {
      predefineColors: [
        "rgb(255,255,255)",
        "rgb(0,0,0)",
        "rgb(0,0,255)",
        "rgb(255,0,0)",
      ],
      form: {
        color: "rgb(255,0,0)",
      },
      imgBase64: "",
      isUploading: false,
    };
  },
  methods: {
    upload(fileObj) {
      const file = fileObj.file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgBase64 = reader.result;
      };
    },
    changeBgColor() {
      this.isUploading = true;
      const [r, g, b] = this.form.color.match(/\d+/g).map(Number);
      let image = new Image();
      image.src = this.imgBase64;
      image.onload = () => {
        bgColor({
          image: this.imgBase64,
          width: image.width,
          height: image.height,
          background: { r, g, b },
        }).then((res) => {
          this.imgBase64 = res.img;
          this.isUploading = false;
        });
      };
    },
    download() {
      const a = document.createElement("a");
      const event = new MouseEvent("click");
      a.download = "证件照";
      a.href = this.imgBase64;
      a.dispatchEvent(event);
    },
  },
};
</script>

<style scoped>
.show {
  width: 60%;
  height: 400px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 350px;
  text-align: center;
}

.show /deep/ .el-upload el-upload--text {
  width: 100%;
  height: 400px;
}

.show /deep/ .el-upload-dragger {
  width: 100%;
  height: 400px;
}

.show /deep/ .el-upload {
  display: inline;
  text-align: center;
  cursor: pointer;
  outline: 0;
  height: 400px;
}
</style>