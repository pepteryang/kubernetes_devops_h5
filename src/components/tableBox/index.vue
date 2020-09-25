<template>
  <div>
    <!-- 插槽功能使用，筛选占位-->
    <slot name="tableHeader"></slot>
    <el-table
      :data="tableList"
      @selection-change="handleSelectionChange"
      border
      font-size="9px"
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
        align="center"
        fixed="left"
        label="序号"
        type="index"
        v-if="indexShow"
        width="50"
      >
        <template slot-scope="scope">
          <span>{{
            (listQuery.page - 1) * listQuery.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <!-- 插槽功能使用，在模板中占有一个可以填充的位置，可以插入任何东西-->
      <slot name="hyperlink"></slot>
      <!-- 数据列-->
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
        v-for="column in tableColumns"
      >
      </el-table-column>
      <!--操作按钮-->
      <el-table-column :width="operation.width" align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            :icon="item.icon"
            :key="key"
            :size="item.size"
            :type="item.type"
            @click="handleButton(scope.row, item.methods)"
            v-for="(item, key) in operation.buttons"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.page"
      :page-size.sync="listQuery.pageSize"
      :page-sizes="[10, 20, 30, 50]"
      :total="listQuery.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      background
      v-bind="$attrs"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TableBox',
  props: {
    selectColumns: {
      // 是否显示动态列功能，默认显示
      // 动态列功能
      type: Boolean,
      default: true
    },
    tableList: {
      // 表格数据
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    tableColumns: {
      // 表格列数据
      type: Array,
      required: true,
      default: function() {
        return []
      }
    },
    searchAndExportForm: {
      type: Object,
      required: true
    },
    operation: {
      // 按钮操作
      type: Object,
      default: () => {}
    },
    hyperlink: {
      type: Object,
      default: () => {}
    },
    isShow: {
      // 是否控制列的动态显示 默认控制
      type: Boolean,
      default: true
    },
    listQuery: {
      type: Object
    },
    formatter: {
      type: Function,
      default: function(row, column, cellValue) {
        return cellValue
      }
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50]
      }
    },
    selectionWith: {
      type: Number,
      required: false,
      default: 50
    },
    selectionShow: {
      // 多选   默认显示多选
      type: Boolean,
      default: true
    },
    indexShow: {
      // 序号列
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      multipleSelection: [] // 多行选中
    }
  },
  methods: {
    handleAddButton(val) {
      this.$emit('handleAddButton', val)
    },
    handleExportFun(val) {
      this.$emit('handleExportFun', val)
    },
    handleSearchFun(val) {
      this.$emit('handleSearchFun', val)
    },
    handleButton(row, methods) {
      this.$emit('handleButton', { row: row, methods: methods })
    },
    // 切换每页显示的数量
    handleSizeChange(size) {
      this.$emit('handleSizeChange', size)
      this.listQuery.page = 1
    },
    // 切换页码
    handleCurrentChange(index) {
      this.$emit('handleCurrentChange', index)
      this.listQuery.page = index
    },
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    }
  },
  mounted() {},
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.TableBox {
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
