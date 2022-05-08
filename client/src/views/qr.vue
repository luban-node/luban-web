<template>
  <div>
    <div style="margin-top:30px">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        size="small"
      >
        <el-form-item label="输入文字">
          <el-input
            v-model="form.text"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item
              label="宽度"
            >
              <el-input v-model="form.options.width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="放缩比例"
            >
              <el-input v-model="form.options.scale"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="内边距"
            >
              <el-input v-model="form.options.margin"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-form-item
              label="前景色"
            >
              <el-color-picker v-model="form.options.color.dark"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item
              label="背景色"
            >
              <el-color-picker v-model="form.options.color.light"></el-color-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="纠错级别">
          <el-radio
            v-model="form.options.errorCorrectionLevel"
            label="L"
          >
            L(7%)
          </el-radio>
          <el-radio
            v-model="form.options.errorCorrectionLevel"
            label="M"
          >
            M(15%)
          </el-radio>
          <el-radio
            v-model="form.options.errorCorrectionLevel"
            label="Q"
          >
            Q(25%)
          </el-radio>
          <el-radio
            v-model="form.options.errorCorrectionLevel"
            label="H"
          >
            H(30%)
          </el-radio>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="create"
          >
            生成二维码
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-divider />
    <div
      v-if="imgSrc"
      style="margin-top:10px;"
    >
      <el-row>
        <el-image
          :src="imgSrc"
        />
      </el-row>
      <el-row style="margin-top:10px">
        <el-button
          v-if="imgSrc"
          size="small"
          type="primary"
          @click="download"
        >
          下载二维码
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { qrCreate } from '../utils/api'
export default {
  name: 'Qr',
  data () {
    return {
      form: {
        text: 'Luban',
        options: {
          type: 'image/png',
          width: 180,
          margin: 0,
          scale: 1,
          color: {
            dark: '#000000',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'M'
        }
      },
      imgSrc: ''
    }
  },
  methods: {
    create () {
      qrCreate(this.form).then(res => {
        this.imgSrc = res.imgData
      })
    },
    download () {
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = '二维码'
      a.href = this.imgSrc
      a.dispatchEvent(event)
    }
  }
}
</script>

<style scoped>
</style>
