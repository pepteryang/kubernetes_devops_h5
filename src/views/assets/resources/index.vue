<template>
  <div>
    <div>
      <el-dialog
        :visible.sync="AddResourcesDialog"
        @close="closeDialog('AddResourceForm')"
      >
        <el-form
          :model="AddResourceForm"
          :rules="AddResourceForm.ResourceRules"
          class="demo-ruleForm"
          label-width="100px"
          ref="AddResourceForm"
        >
          <el-form-item label="资源名称" prop="resources_name">
            <el-input v-model="AddResourceForm.resources_name"></el-input>
          </el-form-item>
          <el-form-item label="资源地址" prop="resources_address">
            <el-input v-model="AddResourceForm.resources_address"></el-input>
          </el-form-item>
          <el-form-item label="访问端口" prop="resources_port">
            <el-input v-model="AddResourceForm.resources_port"></el-input>
          </el-form-item>
          <el-form-item label="网络协议" prop="network_protocol">
            <el-select
              placeholder="请选择网络协议"
              v-model="AddResourceForm.network_protocol"
            >
              <el-option label="http" value="http"></el-option>
              <el-option label="https" value="https"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="访问域名" prop="access_domain">
            <el-input v-model="AddResourceForm.access_domain"></el-input>
          </el-form-item>
          <el-form-item label="系统环境" prop="resources_env">
            <el-select
              placeholder="请选择系统环境"
              v-model="AddResourceForm.resources_env"
            >
              <el-option label="开发环境" value="dev"></el-option>
              <el-option label="测试环境" value="sit"></el-option>
              <el-option label="生产环境" value="prd"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="认证用户" prop="resources_username">
            <el-input v-model="AddResourceForm.resources_username"></el-input>
          </el-form-item>
          <el-form-item label="认证密码" prop="resources_password">
            <el-input v-model="AddResourceForm.resources_password"></el-input>
          </el-form-item>
          <el-form-item label="认证秘钥" prop="resources_token">
            <el-input v-model="AddResourceForm.resources_token"></el-input>
          </el-form-item>
          <el-form-item label="资源类型" prop="resources_type">
            <el-radio-group
              size="medium"
              v-model="AddResourceForm.resources_type"
            >
              <el-radio-button label="Kubernetes"></el-radio-button>
              <el-radio-button label="Harbor"></el-radio-button>
              <el-radio-button label="Prometheus"></el-radio-button>
              <el-radio-button label="Jenkins"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资源说明" prop="resources_desc">
            <el-input
              type="textarea"
              v-model="AddResourceForm.resources_desc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('AddResourceForm')" type="primary"
              >提交</el-button
            >
            <el-button @click="resetForm('AddResourceForm')" type="danger"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="UpdateResourcesDialog"
        @close="closeDialog('AddResourceForm')"
      >
        <el-form
          :model="UpdateResourceForm"
          :rules="UpdateResourceForm.ResourceRules"
          class="demo-ruleForm"
          label-width="100px"
          ref="UpdateResourceForm"
        >
          <el-form-item label="资源名称" prop="new_resources_name">
            <el-input
              v-model="UpdateResourceForm.new_resources_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源地址" prop="new_resources_address">
            <el-input
              v-model="UpdateResourceForm.new_resources_address"
            ></el-input>
          </el-form-item>
          <el-form-item label="访问端口" prop="new_resources_port">
            <el-input
              v-model="UpdateResourceForm.new_resources_port"
            ></el-input>
          </el-form-item>
          <el-form-item label="网络协议" prop="new_network_protocol">
            <el-select
              placeholder="请选择网络协议"
              v-model="UpdateResourceForm.new_network_protocol"
            >
              <el-option label="http" value="http"></el-option>
              <el-option label="https" value="https"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="访问域名" prop="new_access_domain">
            <el-input v-model="UpdateResourceForm.new_access_domain"></el-input>
          </el-form-item>
          <el-form-item label="系统环境" prop="new_resources_env">
            <el-select
              placeholder="请选择系统环境"
              v-model="UpdateResourceForm.new_resources_env"
            >
              <el-option label="开发环境" value="dev"></el-option>
              <el-option label="测试环境" value="sit"></el-option>
              <el-option label="生产环境" value="prd"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="认证用户" prop="new_resources_username">
            <el-input
              v-model="UpdateResourceForm.new_resources_username"
            ></el-input>
          </el-form-item>
          <el-form-item label="认证密码" prop="new_resources_password">
            <el-input
              v-model="UpdateResourceForm.new_resources_password"
            ></el-input>
          </el-form-item>
          <el-form-item label="认证秘钥" prop="new_resources_token">
            <el-input
              v-model="UpdateResourceForm.new_resources_token"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源类型" prop="new_resources_type">
            <el-radio-group
              size="medium"
              v-model="UpdateResourceForm.new_resources_type"
            >
              <el-radio-button label="Kubernetes"></el-radio-button>
              <el-radio-button label="Harbor"></el-radio-button>
              <el-radio-button label="Prometheus"></el-radio-button>
              <el-radio-button label="Jenkins"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="资源说明" prop="new_resources_desc">
            <el-input
              type="textarea"
              v-model="UpdateResourceForm.new_resources_desc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="patchOtherResource('UpdateResourceForm')"
              type="primary"
              >提交</el-button
            >
            <el-button @click="resetForm('UpdateResourceForm')" type="danger"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="DetailsDialog" width="70%">
        <div>
          <el-alert
            :closable="false"
            show-icon
            title="资源详细信息"
            type="success"
          >
          </el-alert>
        </div>
        <div>
          <el-table :data="ResourceDetails" border>
            <el-table-column prop="baseName" width="150px"></el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="baseValue"
            ></el-table-column>
          </el-table>
        </div>
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
import {
  GetOtherResource,
  PostOtherResource,
  PatchOtherResource,
  DeleteOtherResource
} from '@/api/assets'
import TableBox from '@/components/tableBox/'

export default {
  name: 'Resources',
  components: {
    'table-box': TableBox
  },
  data() {
    return {
      UpdateResourcesDialog: false,
      DetailsDialog: false,
      AddResourcesDialog: false,
      loading: true,
      //超链接行
      hyperlink: {
        isShow: false
      },
      searchAndExportForm: {
        search_keys: ''
      },
      operation: {
        width: 210,
        buttons: [
          {
            label: '详情',
            type: 'primary',
            methods: 'showDetailsDialog',
            size: 'mini'
          },
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
          label: '资源名称' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'type', //<String>  对应属性名
          label: '资源类型' //<String>   表头标签
        },

        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'env', //<String>  对应属性名
          label: '环境' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'address', //<String>  对应属性名
          label: '网络地址' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'port', //<String>  对应属性名
          label: '访问端口' //<String>   表头标签
        }
      ],
      //为了展示使用
      ResourceDetails: [],
      //添加资源
      AddResourceForm: {
        resources_name: '',
        network_protocol: 'https',
        resources_address: '',
        resources_port: '',
        resources_username: '',
        resources_password: '',
        resources_token: '',
        resources_type: 'Harbor',
        resources_desc: '',
        resources_env: '测试环境',
        access_domain: '',
        ResourceRules: {
          resources_name: [
            { required: true, message: '请输入资源名称', trigger: 'blur' },
            {
              min: 5,
              max: 50,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          resources_address: [
            { required: true, message: '请输入资源地址', trigger: 'blur' },
            {
              min: 5,
              max: 50,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          resources_port: [
            {
              required: true,
              message: '请输入资源地址的使用端口',
              trigger: 'blur'
            }
          ],
          resources_desc: [
            {
              required: true,
              message: '请输入资源地址的描述信息',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 500,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          access_domain: [
            { required: true, message: '请输入访问域名', trigger: 'blur' }
          ]
        }
      },
      //更新资源
      UpdateResourceForm: {
        uuid: '',
        new_resources_name: '',
        new_network_protocol: '',
        new_resources_address: '',
        new_resources_port: '',
        new_resources_username: '',
        new_resources_password: '',
        new_resources_token: '',
        new_resources_type: '',
        new_resources_desc: '',
        new_resources_env: '',
        new_access_domain: '',
        UpdateResourceRules: {
          new_resources_name: [
            { required: true, message: '请输入资源名称', trigger: 'blur' },
            {
              min: 5,
              max: 50,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          new_resources_address: [
            { required: true, message: '请输入资源地址', trigger: 'blur' },
            {
              min: 5,
              max: 50,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          new_resources_port: [
            {
              required: true,
              message: '请输入资源地址的使用端口',
              trigger: 'blur'
            }
          ],
          new_resources_desc: [
            {
              required: true,
              message: '请输入资源地址的描述信息',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 500,
              message: '长度在 5 到 20 个字符',
              trigger: 'blur'
            }
          ],
          new_access_domain: [
            { required: true, message: '请输入访问域名', trigger: 'blur' }
          ]
        }
      }
    }
  },
  created() {
    this.getOtherResource()
  },
  methods: {
    //form关闭操作
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取项目数据列表
    getOtherResource() {
      GetOtherResource({
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PostOtherResource({
            name: this.AddResourceForm.resources_name,
            address: this.AddResourceForm.resources_address,
            access_domain: this.AddResourceForm.access_domain,
            port: this.AddResourceForm.resources_port,
            network_protocol: this.AddResourceForm.network_protocol,
            username: this.AddResourceForm.resources_username,
            password: this.AddResourceForm.resources_password,
            type: this.AddResourceForm.resources_type,
            api_token: this.AddResourceForm.resources_token,
            env: this.AddResourceForm.resources_env,
            description: this.AddResourceForm.resources_desc
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.AddResourcesDialog = false
              this.getOtherResource()
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
    patchOtherResource(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PatchOtherResource({
            uuid: this.UpdateResourceForm.uuid,
            name: this.UpdateResourceForm.new_resources_name,
            address: this.UpdateResourceForm.new_resources_address,
            access_domain: this.UpdateResourceForm.new_access_domain,
            port: this.UpdateResourceForm.new_resources_port,
            network_protocol: this.UpdateResourceForm.new_network_protocol,
            username: this.UpdateResourceForm.new_resources_username,
            password: this.UpdateResourceForm.new_resources_password,
            type: this.UpdateResourceForm.new_resources_type,
            api_token: this.UpdateResourceForm.new_resources_token,
            env: this.UpdateResourceForm.new_resources_env,
            description: this.UpdateResourceForm.new_resources_desc
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.UpdateResourcesDialog = false
              this.getOtherResource()
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
      if (val.methods === 'showDetailsDialog') {
        this.DetailsDialog = true
        this.ResourceDetails = [
          {
            baseName: '资源ID：',
            baseValue: val.row.id
          },
          {
            baseName: '资源名称：',
            baseValue: val.row.name
          },
          {
            baseName: '访问地址：',
            baseValue: val.row.address
          },
          {
            baseName: '访问端口：',
            baseValue: val.row.port
          },
          {
            baseName: '访问域名：',
            baseValue: val.row.access_domain
          },
          {
            baseName: '网络协议：',
            baseValue: val.row.network_protocol
          },
          {
            baseName: '认证用户：',
            baseValue: val.row.username
          },
          {
            baseName: '认证密码：',
            baseValue: val.row.password
          },
          {
            baseName: '认证令牌：',
            baseValue: val.row.api_token
          },
          {
            baseName: '资源类型：',
            baseValue: val.row.type
          },
          {
            baseName: '资源环境：',
            baseValue: val.row.env
          },
          {
            baseName: '资源描述：',
            baseValue: val.row.description
          },
          {
            baseName: '创建时间：',
            baseValue: val.row.create_time
          }
        ]
      } else if (val.methods === 'showEditDialog') {
        this.UpdateResourceForm.uuid = val.row.id
        this.UpdateResourceForm.new_resources_name = val.row.name
        this.UpdateResourceForm.new_network_protocol = val.row.network_protocol
        this.UpdateResourceForm.new_resources_address = val.row.address
        this.UpdateResourceForm.new_resources_port = val.row.port
        this.UpdateResourceForm.new_resources_username = val.row.username
        this.UpdateResourceForm.new_resources_password = val.row.password
        this.UpdateResourceForm.new_resources_token = val.row.api_token
        this.UpdateResourceForm.new_resources_type = val.row.type
        this.UpdateResourceForm.new_resources_desc = val.row.description
        this.UpdateResourceForm.new_resources_env = val.row.env
        this.UpdateResourceForm.new_access_domain = val.row.access_domain
        this.UpdateResourcesDialog = true
      } else if (val.methods === 'deleteFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteOtherResource({
              uuid: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getOtherResource()
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
      } else {
        console.log('没有对因的方法')
      }
    },
    //控制新增弹窗
    handleAddButton() {
      this.AddResourcesDialog = true
    }
  }
}
</script>
