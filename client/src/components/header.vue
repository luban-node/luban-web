<template>
  <div class="headerWrapper">
    <header class="header">
      <div class="container">
        <h1>
          <a>
            <img
              class="nav-logo"
              src="data:image/jpeg;base64,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"
            />
          </a>
        </h1>
        <ul class="nav">
          <li class="nav-item">
            <a
              :class="this.$route.path.includes('/tool') ? 'active' : ''"
              href="/tool"
              >工具</a
            >
          </li>
          <li class="nav-item">
            <div class="nav-gap"></div>
          </li>
          <li class="nav-item" v-if="!user">
            <a
              :class="this.$route.path.includes('/login') ? 'active' : ''"
              href="/login"
              >登录</a
            >
          </li>
          <li class="nav-item" v-else>
            <el-avatar
              class="user-avatar"
              :size="30"
              :src="user.avatar"
            ></el-avatar>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{ user.nickname
                }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { logout } from "../utils/api";
export default {
  data() {
    return {
      classObj: {
        active: true,
      },
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapMutations(["deleteUser"]),
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.doLogout();
          break;
      }
    },
    doLogout() {
      logout();
      this.deleteUser();
      this.$message({
        message: "您已退出登录",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.headerWrapper {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1500;
}

.header {
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

.container,
.page-container {
  width: 1140px;
  padding: 0;
  margin: 0 auto;
}

.header .container {
  height: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdfe6;
}

.header h1 {
  margin: 0;
  float: left;
  font-size: 32px;
  font-weight: 400;
}

.nav-log {
  vertical-align: sub;
}

.header .nav {
  float: right;
  height: 100%;
  line-height: 80px;
  background: transparent;
  padding: 0;
  margin: 0;
}

.header .nav-item {
  margin: 0;
  float: left;
  list-style: none;
  position: relative;
  cursor: pointer;
}

.header .nav:after {
  clear: both;
}

.header .nav-item a {
  text-decoration: none;
  color: #1989fa;
  opacity: 0.5;
  display: block;
  padding: 0 22px;
}

.header .nav-item a.active,
.header .nav-item a:hover {
  opacity: 1;
}

.header .nav-item a.active:after {
  content: "";
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: calc(50% - 15px);
  width: 30px;
  height: 2px;
  background: #409eff;
}

.header .nav-gap {
  position: relative;
  width: 1px;
  height: 80px;
  padding: 0 20px;
}

.header .nav-gap::before {
  content: "";
  position: absolute;
  top: calc(50% - 8px);
  width: 1px;
  height: 16px;
  background: #ebebeb;
}

a {
  color: #409eff;
  text-decoration: none;
}

.el-dropdown-link {
  cursor: pointer;
  color: #888;
  font-size: 16px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.user-avatar {
  vertical-align: middle;
}
</style>
