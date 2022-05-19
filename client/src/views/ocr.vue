<template>
<div>
    <div style="height:500px">
        <div class="show">
            <vueCropper v-if="imgBase64" ref="cropper" :img="imgBase64" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :original="option.original" :auto-crop="option.autoCrop" :fixed="option.fixed" :fixed-number="option.fixedNumber" :center-box="option.centerBox" :info-true="option.infoTrue" :fixed-box="option.fixedBox" :max-img-size="option.maxImgSize" style="background-image:none" @mouseenter.native="enter" @mouseleave.native="leave"></vueCropper>
            <el-upload v-else ref="uploader" class="avatar-uploader" drag multiple action="" :show-file-list="false" :limit="1" :http-request="upload">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="ocr" @mouseleave="leaveCard">
            <el-card v-for="(item,index) in ocrResult" :key="index" class="card-box" @mouseenter.native="enterCard(item)">
                <el-form size="small" label-width="100px" label-position="left">
                    <el-form-item label="识别结果">
                        <el-input v-model="item.text"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
    <div style="margin-top:10px">
        <el-button size="small" type="primary" style="width:60%" @click="doOcr">
            文字识别(OCR)
        </el-button>
    </div>
</div>
</template>

<script>
import { uploadImage, ocr } from '../utils/api'
export default {
    name: 'Ocr',
    data() {
        return {
            imgSrc: '',
            imgBase64: '',
            option: {
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: false, // 是否开启截图框宽高固定比例
                fixedNumber: [7, 5], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMove: false, // 时候可以移动原图
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: true, // 截图框是否被限制在图片里面
                infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                maxImgSize: 10000
            },
            ocrResult: []
        }
    },
    methods: {
        upload(fileObj) {
            const file = fileObj.file
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.imgBase64 = reader.result
            }
            const formData = new FormData()
            formData.append('image', file)
            uploadImage(formData).then(res => {
                this.imgUrl = res.imgUrl
            })
        },
        doOcr() {
            const cropAxis = this.$refs.cropper.getCropAxis()
            const imgAxis = this.$refs.cropper.getImgAxis()
            const cropWidth = this.$refs.cropper.cropW
            const cropHeight = this.$refs.cropper.cropH
            const position = [
                (cropAxis.x1 - imgAxis.x1) / this.$refs.cropper.scale,
                (cropAxis.y1 - imgAxis.y1) / this.$refs.cropper.scale,
                cropWidth / this.$refs.cropper.scale,
                cropHeight / this.$refs.cropper.scale
            ]
            const rectangle = {
                top: position[1],
                left: position[0],
                width: position[2],
                height: position[3]
            }
            if (this.imgUrl) {
                ocr({ imgUrl: this.imgUrl, rectangle }).then(res => {
                    this.ocrResult.push({
                        text: res.text,
                        cropInfo: {
                            width: cropWidth,
                            height: cropHeight,
                            left: cropAxis.x1,
                            top: cropAxis.y1
                        },
                        realInfo: rectangle
                    })
                })
            }
        },
        enterCard(item) {
            this.$refs.cropper.goAutoCrop() // 重新生成自动裁剪框
            this.$nextTick(() => {
                // if cropped and has position message, update crop box
                // 设置自动裁剪框的宽高和位置
                this.$refs.cropper.cropOffsertX = item.cropInfo.left
                this.$refs.cropper.cropOffsertY = item.cropInfo.top
                this.$refs.cropper.cropW = item.cropInfo.width
                this.$refs.cropper.cropH = item.cropInfo.height
            })
        },
        leaveCard() {
            this.$refs.cropper.clearCrop()
        },
        enter() {
            if (this.imgBase64 === '') {
                return
            }
            this.$refs.cropper.startCrop() // 开始裁剪
        },
        leave() {
            this.$refs.cropper.stopCrop() // 停止裁剪
        }
    }

}
</script>

<style scoped>
.show {
    width: 60%;
    height: 500px;
    float: left;
}

.ocr {
    width: 35%;
    float: right;
    height: 500px;
    overflow: auto;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 450px;
    text-align: center;
}

.show /deep/ .el-upload el-upload--text {
    width: 100%;
    height: 500px;
}

.show /deep/ .el-upload-dragger {
    width: 100%;
    height: 500px;
}

.show /deep/ .el-upload {
    display: inline;
    text-align: center;
    cursor: pointer;
    outline: 0;
    height: 500px;
}

.cropper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.card-box {
    margin-bottom: 10px
}
</style>
