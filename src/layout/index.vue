<template>
  <div :class="classObj" class="app-wrapper">
    <div style="background:#007BFB;width:100%;height:60px;position: fixed;z-index:1002">
      <div style="width:120px;height:100%;float:left">
        <img src="./logo2.svg" style="margin-top:0px;width:120px;height:60px;opacity: 0.8;" />
      </div>
      <div style="width:300px;height:60px;float:left">
        <span style="color:white;line-height:60px;font-size:30px">污染源监测系统</span>
      </div>
      <div class="right-menu" style="line-height:60px;color:white;font-size:15px" >
        <screenfull id="screenfull" class="right-menu-item hover-effect" style="float:left;margin-right:20px"/>
         <i class="el-icon-s-check" style="float: left;line-height:60px;font-size:20px"/>
        <span :title="name" class="user">&nbsp;:&nbsp;{{ name }}</span>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/panbaoqiang/Pollution-source-monitoring-system">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div style="height:60px;width:100px;float:right;line-height:60px;color:white;font-size:15px">
        
      </div>
    </div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <div style="width:100%;height:calc(100vh - 90px);position:relative;top:90px">
        <el-scrollbar style="height:calc(100vh - 90px);">
          <el-card style="margin:10px 10px 5px 0px">
            <app-main />
          </el-card>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapGetters } from "vuex";
import Screenfull from '@/components/Screenfull';
export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Screenfull
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["sidebar", "name"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.right-menu {
  float: right;
  height: 100%;
  line-height: 60px; //图像高度

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 20px;

    .avatar-wrapper {
      margin-top: 0px;
      position: relative;

      .el-icon-caret-bottom {
        color:white;
        cursor: pointer;
        position: relative;
        right: -10px;
        line-height: 60px;
        font-size: 18px;
      }
    }
  }
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.fixed-header {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 1001;
  width: calc(100% - #{$sideBarWidth});
  height: 30px;
  transition: width 0.28s;
}
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
.user{
  color:white;
  max-width: 80px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
}
</style>
