<template>
  <div>
    <el-select filterable placeholder="请选择" v-model="selectValue">
      <el-option
        :key="item.value"
        :label="item.label"
        :value="item.value"
        v-for="item in options"
      >
      </el-option>
    </el-select>
    <!-- <el-button @click="clickme()">默认按钮</el-button> -->
    <!-- <input type="text" :value="value"> -->
  </div>
</template>

<script>
export default {
  name: "selectTemplate",
  data() {
    return {
      options: [],
      selectValue: ""
    };
  },
  methods: {
    //转换下拉框下的字段
    _dataTransform(data) {
      let _data = [];
      for (let i = 0; i < data.length; i++) {
        _data[i] = {};
        _data[i].label = data[i][this.fileType.label];
        _data[i].value = data[i][this.fileType.value];
      }
      return _data;
    }
  },
  watch: {
    //判断下拉框的值是否有改变
    svalue(val, oldVal) {
      if (val != oldVal) {
        this.$emit("input", this.selectValue);
      }
    }
  },
  props: {
    url: {
      type: String
    }, //导入的url地址
    value: {
      type: String
    } //接受外部v-model传入的值
  },
  mounted() {
    //初始话下拉框的值
    this.svalue = this.value;
    //远程请求回来的数据
  }
};
</script>
