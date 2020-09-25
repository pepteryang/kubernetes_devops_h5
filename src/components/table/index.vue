<template>
  <div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      highlight-current-row
      ref="multipleTable"
      show-overflow-tooltip
      stripe
      v-loading="loading"
    >
      <!--选择框-->
      <!--表格是够显示多选框-->
      <el-table-column
        :width="selectionWith"
        align="center"
        type="selection"
        v-if="selectionShow"
      ></el-table-column>
      <!--序号 自定义列序号-->
      <el-table-column
        :width="indexWidth"
        align="center"
        fixed="left"
        label="序号"
        type="index"
        v-if="indexShow"
      >
        <template slot-scope="scope">
          <span>{{ (page - 1) * size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!--数据源-->
      <el-table-column
        :align="column.align"
        :formatter="column.formatter"
        :key="column.key"
        :label="column.label"
        :prop="column.prop"
        :sortable="column.hasSort"
        :v-if="column.isShow"
        :width="column.width"
        header-align="center"
        show-overflow-tooltip
        v-for="(column, index) in tableColumns"
      >
      </el-table-column>
      <!--数据源-->
      <!--操作按钮-->
      <el-table-column align="center" label="操作" width="260">
        <template slot-scope="scope">
          <!-- 详情按钮-->
          <el-button
            :icon="buttonInfo.iconEdit"
            :lable="buttonInfo.DetailsName"
            :style="{ display: buttonInfo.visibleEdit }"
            :type="buttonInfo.colourEdit"
            @click="handleEdit(scope.$index, scope.row)"
            circle
            size="small"
            >{{ buttonInfo.DetailsName }}
          </el-button>
          <!-- 通过不同的页面，控制按键的颜色和名字-->
          <el-button
            :icon="
              scope.row.is_active
                ? buttonInfo.iconActive
                : buttonInfo.iconDelete
            "
            :style="{ display: buttonInfo.visibleActive }"
            :type="
              scope.row.is_active
                ? buttonInfo.colourActive
                : buttonInfo.colourDelete
            "
            @click="handleButton(scope.$index, scope.row)"
            circle
            size="small"
          >
            {{
              scope.row.is_active
                ? buttonInfo.ActiveName
                : buttonInfo.DisableName
            }}
          </el-button>
          <!-- 第三个按钮-->
          <el-button
            :icon="buttonInfo.iconOther"
            :lable="buttonInfo.OtherName"
            :style="{ display: buttonInfo.visibleOther }"
            :type="buttonInfo.colourOther"
            @click="handleOther(scope.$index, scope.row)"
            circle
            size="small"
            >{{ buttonInfo.OtherName }}
          </el-button>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "tabletemplate",
  props: {
    selectColumns: {
      // 是否显示动态列功能，默认显示
      // 动态列功能
      type: Boolean,
      default: true
    },
    tableData: {
      // 表格数据
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    tableColumns: {
      // 表格列数据
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    isShow: {
      // 是否控制列的动态显示 默认控制
      type: Boolean,
      default: true
    },
    formatter: {
      type: Function,
      default: function(row, column, cellValue) {
        return cellValue;
      }
    },
    page: {
      type: Number,
      default: 1
    },
    size: {
      type: Number,
      default: 10
    },
    selectionWith: {
      type: Number,
      required: false,
      default: 50
    },
    radioWidth: {
      type: Number,
      required: false,
      default: 40
    },
    indexWidth: {
      type: Number,
      required: false,
      default: 55
    },
    selectionShow: {
      // 多选   默认显示多选
      type: Boolean,
      default: true
    },
    radioShow: {
      // 单选 使用单选应将多选置为false
      type: Boolean,
      default: false
    },
    indexShow: {
      // 序号列
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    //按钮相关
    buttonInfo: {
      type: Object
    },
    DetailsName: {
      type: String,
      required: true
    },
    ActiveName: {
      type: String,
      required: true
    },
    OtherName: {
      type: String,
      required: true
    },
    DisableName: {
      type: String,
      required: true
    },
    visibleEdit: {
      type: String,
      required: true
    },
    visibleActive: {
      type: String,
      required: true
    },
    visibleOther: {
      type: String,
      required: true
    },
    visibleDelete: {
      type: String,
      required: true
    },

    handleEdit: {
      type: Function,
      default: function(index, row) {
        return row;
      }
    },
    handleButton: {
      type: Function,
      default: function(index, row) {
        return row;
      }
    },
    handleOther: {
      type: Function,
      default: function(index, row) {
        return row;
      }
    }
  },
  data() {
    return {
      tableColumnsCheckedShow: [],
      radioVal: -1
    };
  },
  methods: {
    handleSelectionChange(val) {
      // console.log(val);
      this.$emit("handleSelectionChange", val);
    },
    getRow(row) {
      // console.log(row);
      this.$emit("giveTableRowData", row);
    },
    reset() {
      this.radioVal = -1;
      this.$refs["multipleTable"].clearSelection();
    }
  },
  mounted() {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.tabletemplate {
  .selectColumn {
    margin-bottom: 10px;
    height: auto;
  }

  .operationSpan {
    display: inline-block;
    width: 0.7rem;
    margin: 0 0.05rem;
    min-width: 40px;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    /*font-family: "MicrosoftYaHei";*/
    font-weight: 400;
  }
}
</style>
