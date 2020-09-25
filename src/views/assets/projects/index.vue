<template>
  <div>
    <div>
      <el-dialog
        :visible.sync="AddProjectDialog"
        @close="closeDialog('ProjectDataForm')"
      >
        <el-form
          :model="ProjectDataForm"
          :rules="ProjectDataForm.formRules"
          ref="ProjectDataForm"
        >
          <el-form-item
            label-width="100px"
            label="项目名称："
            prop="project_name"
          >
            <el-input
              placeholder="请输入项目名称"
              v-model="ProjectDataForm.project_name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="项目编码："
            prop="project_code"
          >
            <el-input
              placeholder="请输入项目编码"
              v-model="ProjectDataForm.project_code"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="项目经理："
            prop="project_leader"
          >
            <el-input
              placeholder="请输入项目负责人"
              v-model="ProjectDataForm.project_leader"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="项目描述："
            prop="description"
          >
            <el-input
              placeholder="请输入项目描述"
              v-model="ProjectDataForm.description"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="addProjectDataFun('ProjectDataForm')"
              class="el-button--primary"
              >添加项目
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="PatchProjectDialog"
        @close="closeDialog('UpdateProjectDataForm')"
      >
        <el-form
          :model="UpdateProjectDataForm"
          :rules="UpdateProjectDataForm.UpdateFormRules"
          ref="UpdateProjectDataForm"
        >
          <el-form-item
            label-width="100px"
            label="项目名称："
            prop="new_project_name"
          >
            <el-input
              placeholder="请输入项目名称"
              v-model="UpdateProjectDataForm.new_project_name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="项目编码："
            prop="new_project_code"
          >
            <el-input
              placeholder="请输入项目编码"
              v-model="UpdateProjectDataForm.new_project_code"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="项目经理："
            prop="new_project_leader"
          >
            <el-input
              placeholder="请输入项目负责人"
              v-model="UpdateProjectDataForm.new_project_leader"
            ></el-input>
          </el-form-item>
          <el-form-item
            label-width="100px"
            label="项目描述："
            prop="new_description"
          >
            <el-input
              placeholder="请输入项目描述"
              v-model="UpdateProjectDataForm.new_description"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="patchProjectDataFun('UpdateProjectDataForm')"
              class="el-button--primary"
              >添加项目
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
        :searchAndExportForm="searchAndExportForm"
        @handleSearchFun="handleSearchFun"
        @handleExportFun="handleExportFun"
      ></table-box>
    </div>
  </div>
</template>

<script>
import TableBox from '@/components/tableBox/'
import {
  GetProjectInfo,
  PostProjectInfo,
  PatchProjectInfo,
  DeleteProjectInfo
} from '@/api/assets'

export default {
  name: 'Project',
  components: {
    'table-box': TableBox
  },
  data() {
    return {
      PatchProjectDialog: false,
      AddProjectDialog: false,
      loading: true,
      //超链接行
      hyperlink: {
        isShow: false
      },
      searchAndExportForm: {
        search_keys: ''
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
      tableList: [],
      tableColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'name', //<String>  对应属性名
          label: '项目名称' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'project_code', //<String>  对应属性名
          label: '项目编码' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'project_leader', //<String>  对应属性名
          label: '项目经理' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'description', //<String>  对应属性名
          label: '项目描述' //<String>   表头标签
        }
      ],
      ProjectDataForm: {
        project_name: '',
        project_code: '',
        project_leader: '',
        description: '',
        formRules: {
          project_name: [
            { type: 'string', required: true, message: '请输入项目名称' }
          ],
          project_code: [
            { type: 'string', required: true, message: '请输入项目编码' }
          ],
          project_leader: [
            { type: 'string', required: true, message: '请输入项目经理' }
          ],
          description: [
            { type: 'string', required: true, message: '请输入项目描述' }
          ]
        }
      },
      UpdateProjectDataForm: {
        new_uuid: '',
        new_project_name: '',
        new_project_code: '',
        new_project_leader: '',
        new_description: '',
        UpdateFormRules: {
          new_project_name: [
            { type: 'string', required: true, message: '请输入新的项目名称' }
          ],
          new_project_code: [
            { type: 'string', required: true, message: '请输入新的项目编码' }
          ],
          new_project_leader: [
            { type: 'string', required: true, message: '请输入新的项目经理' }
          ],
          new_description: [
            { type: 'string', required: true, message: '请输入新的项目描述' }
          ]
        }
      }
    }
  },
  created() {
    this.getProjectInfo()
  },
  methods: {
    //form关闭操作
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取项目数据列表
    getProjectInfo() {
      GetProjectInfo({
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
    addProjectDataFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PostProjectInfo({
            name: this.ProjectDataForm.project_name,
            description: this.ProjectDataForm.description,
            project_code: this.ProjectDataForm.project_code,
            project_leader: this.ProjectDataForm.project_leader
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.AddProjectDialog = false
              this.getProjectInfo()
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    },
    //添加数据
    patchProjectDataFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PatchProjectInfo({
            uuid: this.UpdateProjectDataForm.uuid,
            name: this.UpdateProjectDataForm.new_project_name,
            description: this.UpdateProjectDataForm.new_description,
            project_code: this.UpdateProjectDataForm.new_project_code,
            project_leader: this.UpdateProjectDataForm.new_project_leader
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.PatchProjectDialog = false
              this.getProjectInfo()
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
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
      this.getProjectInfo()
    },
    //分页数据
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getProjectInfo()
    },
    //禁用和删除按钮控制方法
    handleButton(val) {
      if (val.methods === 'showEditDialog') {
        this.PatchProjectDialog = true
        this.UpdateProjectDataForm.uuid = val.row.id
        this.UpdateProjectDataForm.new_project_leader = val.row.project_leader
        this.UpdateProjectDataForm.new_project_code = val.row.project_code
        this.UpdateProjectDataForm.new_description = val.row.description
        this.UpdateProjectDataForm.new_project_name = val.row.name
      } else if (val.methods === 'deleteFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteProjectInfo({
              uuid: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getProjectInfo()
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
    },
    //控制新增弹窗
    handleAddButton() {
      this.AddProjectDialog = true
    }
  }
}
</script>

<style scoped></style>
