<template>
  <div style="width: 100%">
    <div class="message">
      <el-card shadow="always" class="message-card">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <el-timeline infinite-scroll-disabled="disabled">
            <el-timeline-item
              v-for="message in messages"
              :key="message.id"
              :timestamp="message.createTime"
              placement="top"
            >
              <el-card :body-style="{ padding: '5px', height: '100px' }">
                <div class="message-item">
                  <div class="message-avatar">
                    <el-avatar :size="48" :src="message.avatar"></el-avatar>
                  </div>
                  <div class="message-content">
                    <h4 style="margin-bottom: 0">{{ message.nickname }}:</h4>
                    <p>{{ message.content }}</p>
                  </div>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
      <div>
        <el-button @click="doMessage" type="primary" class="message-btn"
          >点击留言</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { showMessage, createMessage } from "../utils/api";
export default {
  name: "Message",
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    show() {
      showMessage().then((res) => {
        this.messages = res.messages;
      });
    },
    doMessage() {
      this.$prompt("", "请输入留言内容", {
        confirmButtonText: "留言",
        cancelButtonText: "取消",
        inputErrorMessage: "",
        inputType: "textarea",
        inputPlaceholder: "说点什么吧~",
        inputValidator: (value) => {
          if (!value) return "留言不能为空";
          if (value.length > 100) return "留言的长度不能超过100个字符";
        },
      }).then(({ value }) => {
        createMessage({ content: value }).then((res) => {
          this.show()
          this.$message({
            type: "success",
            message: "感谢您的留言",
          });
        });
      });
    },
  },
  created() {
    this.show();
  },
};
</script>

<style scoped>
.message {
  width: 800px;
  height: 80%;
  margin: auto;
}
.message-card {
  width: 100%;
  height: 650px;
  margin-top: 100px;
  text-align: left;
  overflow-y: scroll;
}
.message-btn {
  width: 100%;
  margin-top: 10px;
}

.message-item {
  padding-left: 10px;
}

.message-avatar {
  float: left;
  margin-top: 20px;
}

.message-content {
  float: left;
  margin-left: 16px;
}
</style>