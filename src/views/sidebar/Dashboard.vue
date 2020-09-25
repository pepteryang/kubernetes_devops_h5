<template>
  <div>
    99999999999999999999999999999999
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    }
  }
};
</script>

<style scoped></style>
