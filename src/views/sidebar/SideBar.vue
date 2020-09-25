<template>
  <div class="sidebar">
    <el-menu
      :collapse="collapse"
      :default-active="onRoutes"
      active-text-color="#20a0ff"
      background-color="#324157"
      class="sidebar-el-menu"
      router
      text-color="#bfcbd9"
      unique-opened
    >
      <template v-for="item in menuList">
        <template v-if="item.children">
          <el-submenu :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i
              ><span slot="title">{{ item.label }}</span>
            </template>
            <!-- 三级菜单 -->
            <template v-for="subItem in item.children">
              <el-submenu
                :index="subItem.path"
                :key="subItem.path"
                v-if="subItem.children"
              >
                <template slot="title">{{ subItem.label }}</template>
                <el-menu-item
                  :index="threeItem.path"
                  :key="i"
                  v-for="(threeItem, i) in subItem.subs"
                >
                  <i :class="threeItem.icon"></i
                  ><span slot="title">{{ threeItem.title }}</span>
                </el-menu-item>
              </el-submenu>
              <!-- 二级菜单 -->
              <el-menu-item :index="subItem.path" :key="subItem.path" v-else>
                <i :class="subItem.icon"></i
                ><span slot="title">{{ subItem.label }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.icon"></i><span slot="title">{{ item.label }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  data: function() {
    return {
      collapse: false,
      menuList: ""
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  mounted: function() {
    //获取导航条
    this.menuList = JSON.parse(localStorage.getItem("roles"));
  },
  methods: {}
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 5;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 300px;
}

.sidebar > ul {
  height: 100%;
}
</style>
