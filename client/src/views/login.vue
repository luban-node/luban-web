<template>
  <div class="login">
    <div class="login-main">
      <div class="login-info">
        <div class="login-tabs">
          <div class="login-pane cur-pointer active">
            {{ isLogin ? "账号登录" : "账号注册" }}
          </div>
          <div class="login-paneDrive"></div>
          <div class="login-pane cur-pointer">微博登录</div>
        </div>
        <div class="login-form">
          <el-form :rules="rules" ref="form" :model="form">
            <el-form-item prop="email">
              <el-input
                v-model="form.email"
                placeholder="请输入邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item v-if="!isLogin" prop="nickname">
              <el-input
                v-model="form.nickname"
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
            <div v-if="isLogin">
              <el-form-item>
                <el-button
                  plain
                  style="width: 100%"
                  round
                  type="primary"
                  @click="doLogin"
                  >立即登录</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="12">
                    <el-link
                      :underline="false"
                      type="primary"
                      @click="toRegister"
                      >没有账号，立即注册></el-link
                    >
                  </el-col>
                  <el-col :span="4" style="float: right">
                    <el-link :underline="false" type="info">忘记密码</el-link>
                  </el-col>
                </el-row>
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item>
                <el-button
                  plain
                  style="width: 100%"
                  round
                  type="primary"
                  @click="doRegister"
                  >立即注册</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-link
                  :underline="false"
                  type="primary"
                  @click="toLogin"
                  style="text-align: center; display: block"
                  >登录已有账号</el-link
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { register, login } from "../utils/api";
import { mapMutations } from "vuex";
export default {
  data() {
    const checkNickname = (rule, value, callback) => {
      if (!this.isLogin) {
        if (value === "") {
          callback(new Error("请输入昵称"));
        } else if (value.length < 5 || value.length > 12) {
          callback(new Error("昵称长度在5到12个字符之间"));
        }
      }
      callback();
    };
    return {
      isLogin: true,
      form: {
        email: "",
        nickname: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度在6-30个字符之间",
            trigger: "blur",
          },
        ],
        nickname: [{ validator: checkNickname, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["setUser"]),
    toRegister() {
      this.isLogin = false;
    },
    toLogin() {
      this.isLogin = true;
    },
    doRegister() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          register(this.form)
            .then((res) => {
              this.$message({
                message: "注册成功",
                type: "success",
              });
              this.isLogin = true;
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "warning",
              });
            });
        } else {
          return false;
        }
      });
    },
    doLogin() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          login(this.form)
            .then((res) => {
              this.$message({
                message: `${res.nickname} 欢迎您`,
                type: "success",
              });
              this.setUser(res);
              this.$router.push("/tool/qr");
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "warning",
              });
            });
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    isLogin: function (oldValue, newValue) {
      this.$refs["form"].clearValidate();
    },
  },
};
</script>

<style scoped>
.login {
  flex: 1 1;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-main {
  width: 348px;
  height: 477px;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-main .login-info {
  position: relative;
  width: 348px;
  height: 477px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.login-main .login-info .login-tabs {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 320px;
  height: 34px;
}

.login-pane {
  display: flex;
  align-items: center;
  height: 34px;
  font-size: 24px;
  line-height: 34px;
  color: #666;
}

.cur-pointer {
  cursor: pointer;
}

.login-tabs .login-pane.active {
  color: #2b2b2b;
  font-weight: 600;
}

.login-tabs .login-paneDrive {
  width: 0;
  height: 24px;
  border: 1px solid #ddd;
  margin: 5px 0 0;
}

.login-main .login-info .login-form {
  margin-top: 37px;
  width: 348px;
  height: 477px;
  padding: 0 13px;
}
</style>
