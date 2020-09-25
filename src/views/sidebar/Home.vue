<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div :class="{ 'content-collapse': collapse }" class="content-box">
      <v-tags></v-tags>
      <div class="content">
        <transition mode="out-in" name="move">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./SideBar.vue";
import vTags from "./tags.vue";
import bus from "./bus";

export default {
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>
