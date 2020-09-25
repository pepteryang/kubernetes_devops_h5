<template>
  <div>
    <div>
      <el-dialog
        :visible.sync="AddIDCDialog"
        @close="closeDialog('IDCInfoForm')"
      >
        <el-form :inline="true" :model="AddIDCInfoForm" ref="IDCInfoForm">
          <el-form-item prop="name">
            <el-input
              placeholder="请输入机房的名称"
              v-model="AddIDCInfoForm.name"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="addIDCDataFun('IDCInfoForm')"
              class="el-button--primary"
              >添加机房</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="PatchIDCDialog"
        @close="closeDialog('PatchIDCForm')"
      >
        <el-form :inline="true" :model="PatchIDCInfoForm" ref="PatchIDCForm">
          <el-form-item prop="new_name">
            <el-input
              placeholder="请输入机房的名称"
              v-model="PatchIDCInfoForm.new_name"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="PatchIDCDataFun('PatchIDCForm')"
              class="el-button--primary"
              >更新机房
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <slot name="tableHeader">
      <div>
        <el-row :gutter="24">
          <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
            <el-button type="primary" @click="handleAddButton">新增</el-button>
          </el-col>
          <el-col style="float:right" :lg="9" :md="9" :sm="9" :xl="9" :xs="9">
            <el-form
              :inline="true"
              :model="searchAndExportForm"
              ref="searchAndExportForm"
            >
              <el-form-item prop="search_keys">
                <el-input v-model="searchAndExportForm.search_keys"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearchFun"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="handleExportFun"
                  >导出</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </slot>
    <div>
      <table-box
        :searchAndExportForm="searchAndExportForm"
        @handleSearchFun="handleSearchFun"
        @handleExportFun="handleExportFun"
        @handleSelectionChange="handleSelectionChange"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @handleButton="handleButton"
        @handleAddButton="handleAddButton"
        :hyperlink="hyperlink"
        :listQuery="listQuery"
        :loading="loading"
        :operation="operation"
        :tableColumns="tableColumns"
        :tableList="tableList"
        :total="listQuery.total"
      ></table-box>
    </div>
  </div>
</template>

<script>
import TableBox from '@/components/tableBox/'
import {
  GetIDCInfo,
  PostIDCInfo,
  PatchIDCInfo,
  DeleteIDCInfo
} from '@/api/assets'

export default {
  name: 'IDCInfo',
  components: {
    'table-box': TableBox
  },
  data() {
    return {
      PatchIDCDialog: false,
      AddIDCDialog: false,
      loading: true,
      //超链接行
      hyperlink: {
        isShow: false
      },
      operation: {
        width: 150,
        buttons: [
          {
            label: '编辑',
            type: 'primary',
            methods: 'showEditDialog',
            size: 'mini'
          },
          {
            label: '删除',
            type: 'danger',
            methods: 'deleteFunction',
            size: 'mini'
          }
        ]
      },
      listQuery: {
        total: 0,
        pageSize: 10,
        page: 1,
        size: 10
      },
      searchAndExportForm: {
        search_keys: ''
      },
      tableList: [],
      tableColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'name', //<String>  对应属性名
          label: '机房名称' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'create_time', //<String>  对应属性名
          label: '创建时间' //<String>   表头标签
        }
      ],
      AddIDCInfoForm: {
        name: ''
      },
      PatchIDCInfoForm: {
        new_name: '',
        uuid: ''
      }
    }
  },
  created() {
    this.getIDCInfo()
  },
  methods: {
    //form关闭操作
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取IDC机房数据列表
    getIDCInfo() {
      GetIDCInfo({
        page: this.listQuery.page,
        page_size: this.listQuery.pageSize
      }).then(response => {
        if (response.status === 200) {
          //在赋值前清空列表
          this.tableList = response.data.results
          this.listQuery.total = response.data.count
          this.listQuery.currentPage = response.data.next
          this.loading = false
        } else {
          //
        }
      })
    },
    //添加数据
    addIDCDataFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PostIDCInfo({
            name: this.AddIDCInfoForm.name
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.AddIDCDialog = false
              this.getIDCInfo()
              this.$refs[formName].resetFields()
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
              this.getIDCInfo()
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    },
    //添加数据
    PatchIDCDataFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PatchIDCInfo({
            name: this.PatchIDCInfoForm.new_name,
            uuid: this.PatchIDCInfoForm.uuid
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.getIDCInfo()
              this.$refs[formName].resetFields()
              this.PatchIDCDialog = false
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
              this.getIDCInfo()
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    },
    handleSearchFun(val) {
      console.log(val)
    },
    handleExportFun(val) {
      console.log(val)
    },
    // 多行选中
    handleSelectionChange(val) {
      // console.log(val);
      this.$emit('handleSelectionChange', val)
    },
    //分页数据大小
    handleSizeChange(pages_size) {
      this.listQuery.pageSize = pages_size
      this.getIDCInfo()
    },
    //分页数据
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getIDCInfo()
    },
    //控制新增弹窗
    handleAddButton() {
      this.AddIDCDialog = true
    },
    //操作按钮控制方法
    handleButton(val) {
      if (val.methods === 'showEditDialog') {
        this.PatchIDCDialog = true
        this.PatchIDCInfoForm.new_name = val.row.name
        this.PatchIDCInfoForm.uuid = val.row.id
      } else if (val.methods === 'deleteFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteIDCInfo({
              uuid: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getIDCInfo()
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: response.data.message
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>

<style scoped></style>
