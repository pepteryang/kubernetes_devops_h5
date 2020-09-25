<template>
  <div>
    <div>
      <el-dialog
        @close="closeDialog('AddDatabaseInfoForm')"
        :visible.sync="AddDatabaseInfoForm.dialogTableVisible"
        title="数据库信息"
      >
        <!-- 添加数据的表单 -->
        <el-form
          :model="AddDatabaseInfoForm"
          :rules="AddDatabaseInfoForm.FormRules"
          class="demo-ruleForm"
          label-width="120px"
          ref="AddDatabaseInfoForm"
        >
          <el-form-item label="数据库标签：" prop="database_label">
            <el-input
              placeholder="请输入数据库标签"
              v-model="AddDatabaseInfoForm.database_label"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库地址：" prop="database_address">
            <el-input
              placeholder="请输入数据库的IP地址"
              v-model="AddDatabaseInfoForm.database_address"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库端口：" prop="database_port">
            <el-input
              placeholder="请输入数据库的端口"
              v-model="AddDatabaseInfoForm.database_port"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库类型：" prop="database_type">
            <el-select
              placeholder="请选择数据库类型"
              v-model="AddDatabaseInfoForm.database_type"
            >
              <el-option abel="Oracle" value="oracle">Oracle</el-option>
              <el-option abel="MySql" value="mysql">Mysql</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务名称：" prop="database_services_name">
            <el-input
              placeholder="请输入数据库服务名称"
              v-model="AddDatabaseInfoForm.database_services_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库名称：" prop="database_name">
            <el-input
              placeholder="请输入数据库名称"
              v-model="AddDatabaseInfoForm.database_name"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="数据库用户：" prop="database_user">
            <el-input
              placeholder="请输入数据库的用户"
              v-model="AddDatabaseInfoForm.database_user"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码：" prop="database_password">
            <el-input
              placeholder="请输入数据库用户密码"
              v-model="AddDatabaseInfoForm.database_password"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属项目：" prop="database_project">
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择项目"
              v-model="AddDatabaseInfoForm.database_project"
              value-key="name"
            >
              <el-option
                :key="item.id"
                :lable="item.name"
                :value="item.name"
                v-for="item in projectList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属环境：" prop="database_env">
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择环境"
              v-model="AddDatabaseInfoForm.database_env"
              value-key="name"
            >
              <el-option
                :key="item.id"
                :lable="item.name"
                :value="item.name"
                v-for="item in envList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明：" prop="database_editor">
            <el-input
              type="textarea"
              :rows="2"
              v-model="AddDatabaseInfoForm.database_editor"
            ></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button @click="AddDatabaseInfoForm.dialogTableVisible = false"
            >取 消
          </el-button>
          <el-button
            @click="AddDatabaseInfoFun('AddDatabaseInfoForm')"
            type="primary"
            >确 定
          </el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="EditDialog" title="数据库信息修改">
        <!-- 更新的表单 -->
        <el-form
          :model="UpdateDatabaseInfoForm"
          :rules="UpdateDatabaseInfoForm.UpdateRules"
          @close="closeDialog"
          ref="UpdateDatabaseInfoForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="数据库标签：" prop="update_database_label">
            <el-input
              placeholder="请输入数据库标签"
              v-model="UpdateDatabaseInfoForm.update_database_label"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库地址：" prop="update_database_address">
            <el-input
              placeholder="请输入数据库的IP地址"
              v-model="UpdateDatabaseInfoForm.update_database_address"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库端口：" prop="update_database_port">
            <el-input
              placeholder="请输入数据库的端口"
              v-model="UpdateDatabaseInfoForm.update_database_port"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库类型：" prop="update_database_type">
            <el-select
              placeholder="请选择数据库类型"
              v-model="UpdateDatabaseInfoForm.update_database_type"
            >
              <el-option abel="Oracle" value="oracle">Oracle</el-option>
              <el-option abel="MySql" value="mysql">Mysql</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务名称：" prop="update_database_services_name">
            <el-input
              placeholder="请输入数据库服务名称"
              v-model="UpdateDatabaseInfoForm.update_database_services_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库名称：" prop="update_database_name">
            <el-input
              placeholder="请输入数据库名称"
              v-model="UpdateDatabaseInfoForm.update_database_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库用户：" prop="update_database_user">
            <el-input
              placeholder="请输入数据库的用户"
              v-model="UpdateDatabaseInfoForm.update_database_user"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码：" prop="update_database_password">
            <el-input
              placeholder="请输入数据库用户密码"
              v-model="UpdateDatabaseInfoForm.update_database_password"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属项目：" prop="update_database_project">
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择项目"
              v-model="UpdateDatabaseInfoForm.update_database_project"
              value-key="name"
            >
              <el-option
                :key="item.id"
                :lable="item.name"
                :value="item.name"
                v-for="item in projectList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属项目：" prop="update_database_env">
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择环境"
              v-model="UpdateDatabaseInfoForm.update_database_env"
              value-key="name"
            >
              <el-option
                :key="item.id"
                :lable="item.name"
                :value="item.name"
                v-for="item in envList"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="说明：" prop="update_database_editor">
            <el-input
              type="textarea"
              :rows="2"
              v-model="UpdateDatabaseInfoForm.update_database_editor"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="EditDialog = false">取 消</el-button>
        <el-button
          @click="updateDatabaseInfo('UpdateDatabaseInfoForm')"
          type="primary"
          >确 定
        </el-button>
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
      <el-row :gutter="24">
        <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
          <div>
            <table-box
              :searchAndExportForm="searchAndExportForm"
              @handleSearchFun="handleSearchFun"
              @handleExportFun="handleExportFun"
              @handleSelectionChange="handleSelectionChange"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"
              :hyperlink="hyperlink"
              :listQuery="listQuery"
              :loading="loading"
              :operation="operation"
              :tableColumns="tableColumns"
              :tableList="databaseList"
              :total="listQuery.total"
              @handleButton="handleButton"
              @handleAddButton="handleAddButton"
            >
            </table-box>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TableBox from '@/components/tableBox/'
import {
  DeleteDatabaseInfo,
  GetDatabaseInfo,
  GetEnvInfo,
  GetProjectInfo,
  PatchDatabaseInfo,
  PostDatabaseInfo
} from '@/api/assets'

export default {
  name: 'Databases',
  components: {
    'table-box': TableBox
  },
  data() {
    return {
      loading: true,
      EditDialog: false,
      AddDatabaseDialog: false,
      envList: [],
      databaseList: [],
      projectList: [],
      //超链接行
      hyperlink: {
        isShow: false
      },
      searchAndExportForm: {
        search_keys: ''
      },
      UpdateDatabaseInfoForm: {
        update_uuid: '',
        update_database_label: '',
        update_database_services_name: '',
        update_database_address: '',
        update_database_type: '',
        update_database_name: '',
        update_database_user: '',
        update_database_password: '',
        update_database_port: '',
        update_database_env: '',
        update_database_project: '',
        update_database_editor: '',
        UpdateRules: {
          update_database_label: [
            { type: 'string', required: true, message: '请输入数据库的标签' }
          ],
          update_database_address: [
            { type: 'string', required: true, message: '请输入数据库的地址' }
          ],
          Update_database_type: [
            { type: 'string', required: true, message: '请输入数据库类型' }
          ],
          update_database_name: [
            { type: 'string', required: true, message: '请输入数据库名字' }
          ],
          update_database_user: [
            { type: 'string', required: true, message: '请输入数据库的用户' }
          ],
          update_database_password: [
            {
              type: 'string',
              required: true,
              message: '请输入数据库用户的密码'
            }
          ],
          update_database_port: [
            { type: 'string', required: true, message: '请输入数据库的端口' }
          ],
          update_database_env: [
            { type: 'string', required: true, message: '请输入数据库的环境' }
          ],
          update_database_project: [
            { type: 'string', required: true, message: '请输入数据库所属项目' }
          ],
          update_database_editor: [
            { type: 'string', required: true, message: '请输入数据的说明' }
          ]
        }
      },
      AddDatabaseInfoForm: {
        dialogTableVisible: false,
        database_label: '',
        database_services_name: '',
        database_address: '',
        database_type: '',
        database_name: '',
        database_user: '',
        database_password: '',
        database_port: '',
        database_env: '',
        database_project: '',
        database_editor: '',
        FormRules: {
          database_label: [
            { type: 'string', required: true, message: '请输入数据库的标签' }
          ],
          database_address: [
            { type: 'string', required: true, message: '请输入数据库的地址' }
          ],
          database_type: [
            { type: 'string', required: true, message: '请输入数据库类型' }
          ],
          database_name: [
            { type: 'string', required: true, message: '请输入数据库名字' }
          ],
          database_user: [
            { type: 'string', required: true, message: '请输入数据库的用户' }
          ],
          database_password: [
            {
              type: 'string',
              required: true,
              message: '请输入数据库用户的密码'
            }
          ],
          database_port: [
            { type: 'string', required: true, message: '请输入数据库的端口' }
          ],
          database_env: [
            { type: 'string', required: true, message: '请输入数据库的环境' }
          ],
          database_project: [
            { type: 'string', required: true, message: '请输入数据库所属项目' }
          ],
          database_editor: [
            { type: 'string', required: true, message: '请输入数据的说明' }
          ]
        }
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
          prop: 'database_label', //<String>  对应属性名
          label: '数据库标签' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'database_address', //<String>  对应属性名
          label: '数据库地址' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'database_name', //<String>  对应属性名
          label: '数据库名称' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'database_type', //<String>  对应属性名
          label: '类型' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'database_user', //<String>  对应属性名
          label: '用户' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'database_password', //<String>  对应属性名
          label: '密码' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'database_url', //<String>  对应属性名
          label: '连接串' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'project_env', //<String>  对应属性名
          label: '所属环境' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'project_name', //<String>  对应属性名
          label: '所属项目' //<String>   表头标签
        }
      ]
    }
  },
  created() {
    this.getEnvInfo()
    this.getProjectInfo()
    this.getDatabaseInfo()
  },
  methods: {
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取数据库信息列表
    getDatabaseInfo() {
      GetDatabaseInfo({
        page: this.listQuery.page,
        page_size: this.listQuery.pageSize
      }).then(response => {
        if (response.status === 200) {
          //在赋值前清空列表
          this.databaseList = response.data.results
          this.listQuery.total = response.data.count
          this.listQuery.currentPage = response.data.next
          this.loading = false
        } else {
          console.log(response)
        }
      })
    },
    //获取环境数据列表
    getEnvInfo() {
      GetEnvInfo().then(response => {
        if (response.status === 200) {
          //在赋值前清空列表
          this.envList = response.data.results
        } else {
          console.log(response)
        }
      })
    },
    //获取项目数据列表
    getProjectInfo() {
      GetProjectInfo().then(response => {
        if (response.status === 200) {
          //在赋值前清空列表
          this.projectList = response.data.results
        } else {
          console.log(response)
        }
      })
    },
    //添加数据库数据
    AddDatabaseInfoFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PostDatabaseInfo({
            database_label: this.AddDatabaseInfoForm.database_label,
            database_services_name: this.AddDatabaseInfoForm
              .database_services_name,
            database_address: this.AddDatabaseInfoForm.database_address,
            database_type: this.AddDatabaseInfoForm.database_type,
            database_name: this.AddDatabaseInfoForm.database_name,
            database_user: this.AddDatabaseInfoForm.database_user,
            database_password: this.AddDatabaseInfoForm.database_password,
            database_port: this.AddDatabaseInfoForm.database_port,
            database_url:
              this.AddDatabaseInfoForm.database_address +
              ':' +
              this.AddDatabaseInfoForm.database_port +
              '/' +
              this.AddDatabaseInfoForm.database_services_name,
            project_env: this.AddDatabaseInfoForm.database_env,
            project_name: this.AddDatabaseInfoForm.database_project,
            database_editor: this.AddDatabaseInfoForm.database_editor
          }).then(response => {
            if ((response.status === 200) & (response.data.code === 66666)) {
              this.getDatabaseInfo()
              this.AddDatabaseInfoForm.dialogTableVisible = false
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
            }
          })
        }
      })
    },
    //添加数据库数据
    updateDatabaseInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PatchDatabaseInfo({
            uuid: this.UpdateDatabaseInfoForm.update_uuid,
            database_label: this.UpdateDatabaseInfoForm.update_database_label,
            database_services_name: this.UpdateDatabaseInfoForm
              .update_database_services_name,
            database_address: this.UpdateDatabaseInfoForm
              .update_database_address,
            database_type: this.UpdateDatabaseInfoForm.update_database_type,
            database_name: this.UpdateDatabaseInfoForm.update_database_name,
            database_user: this.UpdateDatabaseInfoForm.update_database_user,
            database_password: this.UpdateDatabaseInfoForm
              .update_database_password,
            database_port: this.UpdateDatabaseInfoForm.update_database_port,
            database_url:
              this.UpdateDatabaseInfoForm.update_database_address +
              ':' +
              this.UpdateDatabaseInfoForm.update_database_port +
              '/' +
              this.UpdateDatabaseInfoForm.update_database_services_name,
            project_env: this.UpdateDatabaseInfoForm.update_database_env,
            project_name: this.UpdateDatabaseInfoForm.update_database_project,
            database_editor: this.UpdateDatabaseInfoForm.update_database_editor
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.getDatabaseInfo()
              this.EditDialog = false
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
    //控制新增弹窗
    handleAddButton() {
      this.AddDatabaseInfoForm.dialogTableVisible = true
    },
    // 多行选中
    handleSelectionChange(val) {
      // console.log(val);
      this.$emit('handleSelectionChange', val)
    },
    //分页数据大小
    handleSizeChange(pages_size) {
      this.listQuery.pageSize = pages_size
      this.getDatabaseInfo()
    },
    //分页数据
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getDatabaseInfo()
    },
    //按钮控制方法
    handleButton(val) {
      if (val.methods === 'showEditDialog') {
        this.UpdateDatabaseInfoForm.update_uuid = val.row.id
        this.UpdateDatabaseInfoForm.update_database_label =
          val.row.database_label
        this.UpdateDatabaseInfoForm.update_database_services_name =
          val.row.database_services_name
        this.UpdateDatabaseInfoForm.update_database_address =
          val.row.database_address
        this.UpdateDatabaseInfoForm.update_database_type = val.row.database_type
        this.UpdateDatabaseInfoForm.update_database_name = val.row.database_name
        this.UpdateDatabaseInfoForm.update_database_user = val.row.database_user
        this.UpdateDatabaseInfoForm.update_database_password =
          val.row.database_password
        this.UpdateDatabaseInfoForm.update_database_port = val.row.database_port
        this.UpdateDatabaseInfoForm.update_database_env = val.row.project_env
        this.UpdateDatabaseInfoForm.update_database_project =
          val.row.project_name
        this.UpdateDatabaseInfoForm.update_database_editor =
          val.row.database_editor
        this.EditDialog = true
      } else if (val.methods === 'deleteFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteDatabaseInfo({
              uuid: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getDatabaseInfo()
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
