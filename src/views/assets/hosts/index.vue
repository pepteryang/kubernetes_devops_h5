<template>
  <div>
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
              <el-form-item>
                <el-button type="primary" plain @click="handleImportFun"
                  >导入</el-button
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
              @handleButton="handleButton"
              @handleSelectionChange="handleSelectionChange"
              @handleCurrentChange="handleCurrentChange"
              @handleSizeChange="handleSizeChange"
              @handleAddButton="handleAddButton"
            >
            </table-box>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-dialog :visible.sync="DetailsDialog" width="70%">
        <el-row :gutter="10">
          <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
            <div>
              <el-alert
                :closable="false"
                show-icon
                title="主机基本信息"
                type="success"
              >
              </el-alert>
            </div>
            <div>
              <el-table :data="hostDetails.HostBaseDetails" border>
                <el-table-column prop="baseName"></el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="baseValue"
                ></el-table-column>
              </el-table>
            </div>
          </el-col>
          <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
            <div>
              <el-alert
                :closable="false"
                show-icon
                title="主机系统详细信息"
                type="info"
              >
              </el-alert>
            </div>
            <div>
              <div>
                <el-table :data="hostDetails.HostSystemDetails" border>
                  <el-table-column prop="systemName"></el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    prop="systemValue"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </el-col>
          <el-col :lg="8" :md="8" :sm="8" :xl="8" :xs="8">
            <div>
              <el-alert
                :closable="false"
                show-icon
                title="主机修改记录"
                type="warning"
              >
              </el-alert>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
    <el-dialog
      :visible.sync="AddHostDialog"
      @close="closeDialog('addHostForm')"
    >
      <div>
        <el-form
          :model="addHostFormDialog"
          :rules="addHostFormDialog.formRules"
          ref="addHostForm"
        >
          <el-row>
            <el-col>
              <el-divider></el-divider>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="主机名称："
                label-width="100px"
                prop="Add_Hostname"
              >
                <el-input
                  autocomplete="off"
                  placeholder="主机名称"
                  v-model="addHostFormDialog.Hostname"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="IDC机房："
                label-width="100px"
                prop="host_idc"
              >
                <el-select
                  filterable
                  lass="input-width"
                  placeholder="请选择父菜单"
                  v-model="addHostFormDialog.host_idc"
                  value-key="name"
                >
                  <el-option
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name"
                    v-for="item in idcList"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="IP地址："
                label-width="100px"
                prop="Interface"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入IP地址"
                  v-model="addHostFormDialog.Interface"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="部署环境："
                label-width="100px"
                prop="deploy_evn"
              >
                <el-select
                  filterable
                  lass="input-width"
                  placeholder="请选择父菜单"
                  v-model="addHostFormDialog.deploy_evn"
                  value-key="name"
                >
                  <el-option
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name"
                    v-for="item in envList"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="登录端口："
                label-width="100px"
                prop="remote_port"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入SSH端口号"
                  v-model="addHostFormDialog.remote_port"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="所属项目："
                label-width="100px"
                prop="project_name"
              >
                <el-select
                  filterable
                  lass="input-width"
                  placeholder="请选择父菜单"
                  v-model="addHostFormDialog.project_name"
                  value-key="name"
                >
                  <el-option
                    :key="item.id"
                    :lable="item.name"
                    :value="item.name"
                    v-for="item in projectList"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-divider></el-divider>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="购买时间："
                label-width="100px"
                prop="purchasing"
              >
                <el-date-picker
                  placeholder="选择日期"
                  type="date"
                  v-model="addHostFormDialog.purchasing"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="过期时间："
                label-width="100px"
                prop="expire"
              >
                <el-date-picker
                  placeholder="选择日期"
                  type="date"
                  v-model="addHostFormDialog.expire"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-divider></el-divider>
            </el-col>
            <el-col>
              <el-form-item
                label="Root密码："
                label-width="100px"
                prop="root_password"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入ROOT密码"
                  v-model="addHostFormDialog.root_password"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="运维账号："
                label-width="100px"
                prop="operation_username"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入运维操作账号"
                  v-model="addHostFormDialog.operation_username"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="运维密码："
                label-width="100px"
                prop="operation_password"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入运维操作账号的密码"
                  v-model="addHostFormDialog.operation_password"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="程序账号："
                label-width="100px"
                prop="application_username"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入程序运行的账号"
                  v-model="addHostFormDialog.application_username"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="程序密码："
                label-width="100px"
                prop="application_password"
              >
                <el-input
                  autocomplete="off"
                  placeholder="请输入程序运行账号的密码"
                  v-model="addHostFormDialog.application_password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-button @click="AddHostDialog = false">取 消</el-button>
          <el-button @click="addHostDataFun('addHostForm')" type="primary"
            >确 定</el-button
          >
        </div>
      </div>
    </el-dialog>
    <div>
      <el-dialog
        :visible.sync="EditDialog"
        @close="closeDialog('hostEditFrom')"
      >
        <div>
          <el-form
            :model="hostEditDialog.editFromData"
            :rules="hostEditDialog.editFromData.formRules"
            ref="hostEditFrom"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="主机名称："
                  label-width="100px"
                  prop="hostname"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="主机名称"
                    v-model="hostEditDialog.editFromData.hostname"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="IDC机房："
                  label-width="100px"
                  prop="host_idc"
                >
                  <el-select
                    filterable
                    lass="input-width"
                    placeholder="请选择父菜单"
                    v-model="hostEditDialog.editFromData.host_idc"
                    value-key="name"
                  >
                    <el-option
                      :key="item.id"
                      :lable="item.name"
                      :value="item.name"
                      v-for="item in idcList"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="主机地址："
                  label-width="100px"
                  prop="interface"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入IP地址"
                    v-model="hostEditDialog.editFromData.interface"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="部署环境："
                  label-width="100px"
                  prop="deploy_evn"
                >
                  <el-select
                    filterable
                    lass="input-width"
                    placeholder="请选择父菜单"
                    v-model="hostEditDialog.editFromData.deploy_evn"
                    value-key="name"
                  >
                    <el-option
                      :key="item.id"
                      :lable="item.name"
                      :value="item.name"
                      v-for="item in envList"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="登录端口："
                  label-width="100px"
                  prop="remote_port"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入SSH端口号"
                    v-model="hostEditDialog.editFromData.remote_port"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="所属项目："
                  label-width="100px"
                  prop="project_name"
                >
                  <el-select
                    filterable
                    lass="input-width"
                    placeholder="请选择父菜单"
                    v-model="hostEditDialog.editFromData.project_name"
                    value-key="name"
                  >
                    <el-option
                      :key="item.id"
                      :lable="item.name"
                      :value="item.name"
                      v-for="item in projectList"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-divider></el-divider>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="购买时间："
                  label-width="100px"
                  prop="purchasing"
                >
                  <el-date-picker
                    placeholder="选择日期"
                    type="date"
                    v-model="hostEditDialog.editFromData.purchasing"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="过期时间："
                  label-width="100px"
                  prop="expire"
                >
                  <el-date-picker
                    placeholder="选择日期"
                    type="date"
                    v-model="hostEditDialog.editFromData.expire"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="MAC地址："
                  label-width="100px"
                  prop="host_mac"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入主机MAC地址"
                    v-model="hostEditDialog.editFromData.host_mac"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="CPU核数："
                  label-width="100px"
                  prop="host_cpu"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入主机CPU核数"
                    v-model="hostEditDialog.editFromData.host_cpu"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="系统类型："
                  label-width="100px"
                  prop="system_type"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入系统类型"
                    v-model="hostEditDialog.editFromData.system_type"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="内存大小："
                  label-width="100px"
                  prop="host_memory"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入内存大小"
                    v-model="hostEditDialog.editFromData.host_memory"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="系统架构："
                  label-width="100px"
                  prop="system_architecture"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="系统架构"
                    v-model="hostEditDialog.editFromData.system_architecture"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="硬盘大小："
                  label-width="100px"
                  prop="hard_disk"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="硬盘大小"
                    v-model="hostEditDialog.editFromData.hard_disk"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="处理类型："
                  label-width="100px"
                  prop="cpu_info"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入运维操作账号"
                    v-model="hostEditDialog.editFromData.cpu_info"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-divider></el-divider>
              </el-col>
              <el-col>
                <el-form-item
                  label="Root密码："
                  label-width="100px"
                  prop="root_password"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入ROOT密码"
                    v-model="hostEditDialog.editFromData.root_password"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="运维账号："
                  label-width="100px"
                  prop="operation_username"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入运维操作账号"
                    v-model="hostEditDialog.editFromData.operation_username"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="运维密码："
                  label-width="100px"
                  prop="operation_password"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入运维操作账号的密码"
                    v-model="hostEditDialog.editFromData.operation_password"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="程序账号："
                  label-width="100px"
                  prop="application_username"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入程序运行的账号"
                    v-model="hostEditDialog.editFromData.application_username"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="程序密码："
                  label-width="100px"
                  prop="application_password"
                >
                  <el-input
                    autocomplete="off"
                    placeholder="请输入程序运行账号的密码"
                    v-model="hostEditDialog.editFromData.application_password"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div>
            <el-button @click="EditDialog = false">取 消</el-button>
            <el-button @click="updateHostDataFun('hostEditFrom')" type="primary"
              >确 定
            </el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TableBox from '@/components/tableBox/'
import {
  DeleteHostInfo,
  exportHostInfoData,
  GetEnvInfo,
  GetHostInfo,
  getHostRecordInfo,
  GetIDCInfo,
  GetProjectInfo,
  PatchHostInfo,
  PostHostInfo,
  UpdateHostInfoForAnsbile
} from '@/api/assets'

export default {
  name: 'listHost',
  components: {
    'table-box': TableBox
  },
  data() {
    return {
      DetailsDialog: false,
      EditDialog: false,
      AddHostDialog: false,
      loading: true,
      //超链接行
      hyperlink: {
        isShow: true
      },
      idcList: [],
      envList: [],
      searchAndExportForm: {
        search_keys: ''
      },
      projectList: [],
      hostDetails: {
        HostBaseDetails: [],
        HostSystemDetails: [],
        name: '',
        value: ''
      },
      addHostFormDialog: {
        name: '',
        eth1: '',
        remote_port: '',
        purchasing: '',
        expire: '',
        root_password: '',
        operation_username: '',
        operation_password: '',
        application_username: '',
        application_password: '',
        host_idc: '',
        deploy_evn: '',
        project_name: '',
        formRules: {
          Hostname: [
            { type: 'string', required: true, message: '请输入主机名称' }
          ],
          Interface: [
            { type: 'string', required: true, message: '请输入IP地址' }
          ],
          remote_port: [
            { type: 'string', required: true, message: '请输入远程端口名称' }
          ],
          root_password: [
            { type: 'string', required: true, message: '请输入Root密码' }
          ],
          operation_username: [
            { type: 'string', required: true, message: '请输入运维使用的账号' }
          ],
          operation_password: [
            { type: 'string', required: true, message: '请输入运维账号的密码' }
          ],
          host_idc: [
            { type: 'string', required: true, message: '请选择机器的机房' }
          ],
          deploy_evn: [
            { type: 'string', required: true, message: '请选择部署的环境' }
          ],
          project_name: [
            { type: 'string', required: true, message: '请选择机器所属项目' }
          ]
        }
      },
      hostEditDialog: {
        editFromData: {
          id: '',
          hostname: '',
          interface: '',
          remote_port: '',
          purchasing: '',
          expire: '',
          root_password: '',
          operation_username: '',
          operation_password: '',
          application_username: '',
          application_password: '',
          host_idc: '',
          deploy_evn: '',
          project_name: '',
          host_mac: '',
          host_cpu: '',
          hard_disk: '',
          host_memory: '',
          system_type: '',
          system_architecture: '',
          cpu_info: '',
          formRules: {
            Hostname: [
              { type: 'string', required: true, message: '请输入主机名称' }
            ],
            Interface: [
              { type: 'string', required: true, message: '请输入IP地址' }
            ],
            remote_port: [
              { type: 'string', required: true, message: '请输入远程端口名称' }
            ],
            root_password: [
              { type: 'string', required: true, message: '请输入Root密码' }
            ],
            operation_username: [
              {
                type: 'string',
                required: true,
                message: '请输入运维使用的账号'
              }
            ],
            operation_password: [
              {
                type: 'string',
                required: true,
                message: '请输入运维账号的密码'
              }
            ],
            host_idc: [
              { type: 'string', required: true, message: '请选择机器的机房' }
            ],
            deploy_evn: [
              { type: 'string', required: true, message: '请选择部署的环境' }
            ],
            project_name: [
              { type: 'string', required: true, message: '请选择机器所属项目' }
            ]
          }
        }
      },
      operation: {
        width: 280,
        buttons: [
          {
            label: '详情',
            type: 'danger',
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
          },
          {
            label: '更新',
            type: 'warning',
            methods: 'UpdateFunction',
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
          prop: 'eth1', //<String>  对应属性名
          label: '访问地址' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'remote_port', //<String>  对应属性名
          label: '远程端口' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'env', //<String>  对应属性名
          label: '部署环境' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'project', //<String>  对应属性名
          label: '所属项目' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'cpu', //<String>  对应属性名
          label: 'CPU' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'host_memory', //<String>  对应属性名
          label: '内存' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'hard_disk', //<String>  对应属性名
          label: '硬盘' //<String>   表头标签
        }
      ]
    }
  },
  created() {
    this.getHostInfo()
    this.getEnvInfo()
    this.getIDCInfo()
    this.getProjectInfo()
  },
  methods: {
    //form关闭操作
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取数据列表
    getHostInfo() {
      GetHostInfo({
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
          console.log(response.data)
        }
      })
    },
    //获取数据列表
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
    //获取IDC机房数据列表
    getIDCInfo() {
      GetIDCInfo().then(response => {
        if (response.status === 200) {
          //在赋值前清空列表
          this.idcList = response.data.results
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
    addHostDataFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PostHostInfo({
            name: this.addHostFormDialog.Hostname,
            eth1: this.addHostFormDialog.Interface,
            remote_port: this.addHostFormDialog.remote_port,
            expire: this.addHostFormDialog.expire,
            purchasing: this.addHostFormDialog.purchasing,
            root_password: this.addHostFormDialog.root_password,
            operation_username: this.addHostFormDialog.operation_username,
            operation_password: this.addHostFormDialog.operation_password,
            application_username: this.addHostFormDialog.application_username,
            application_password: this.addHostFormDialog.application_password,
            idc: this.addHostFormDialog.host_idc,
            env: this.addHostFormDialog.deploy_evn,
            project: this.addHostFormDialog.project_name
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.$message({
                type: 'success',
                message: response.data.message
              })
              UpdateHostInfoForAnsbile({
                host_id: response.data.data.id
              }).then(response => {
                console.log(response.data)
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
    updateHostDataFun(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PatchHostInfo({
            name: this.hostEditDialog.editFromData.hostname,
            eth1: this.hostEditDialog.editFromData.interface,
            remote_port: this.hostEditDialog.editFromData.remote_port,
            expire: this.hostEditDialog.editFromData.expire,
            purchasing: this.hostEditDialog.editFromData.purchasing,
            root_password: this.hostEditDialog.editFromData.root_password,
            operation_username: this.hostEditDialog.editFromData
              .operation_username,
            operation_password: this.hostEditDialog.editFromData
              .operation_password,
            application_username: this.hostEditDialog.editFromData
              .application_username,
            application_password: this.hostEditDialog.editFromData
              .application_password,
            idc: this.hostEditDialog.editFromData.host_idc,
            evn: this.hostEditDialog.editFromData.deploy_evn,
            project: this.hostEditDialog.editFromData.project_name,
            mac_address: this.hostEditDialog.editFromData.host_mac,
            cpu: this.hostEditDialog.editFromData.host_cpu,
            hard_disk: this.hostEditDialog.editFromData.hard_disk,
            host_memory: this.hostEditDialog.editFromData.host_memory,
            system: this.hostEditDialog.editFromData.system_type,
            system_cpu_arch: this.hostEditDialog.editFromData
              .system_architecture,
            cpu_info: this.hostEditDialog.editFromData.cpu_info,
            id: this.hostEditDialog.editFromData.id
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.EditDialog = false
              this.getHostInfo()
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
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    },
    handleSearchFun(val) {
      console.log(val)
    },
    handleImportFun(){},
    handleExportFun() {
      exportHostInfoData()
        .then(response => {
          console.log(response.headers)
          const link = document.createElement('a')
          let blob = new Blob([response.data], {
            type: 'application/vnd.ms-excel'
          })
          link.style.display = ''
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          this.$message.error({
            title: '错误',
            desc: '网络连接错误'
          })
          console.log(error)
        })
    },
    // 多行选中
    handleSelectionChange(val) {
      // console.log(val);
      this.$emit('handleSelectionChange', val)
    },
    //分页数据大小
    handleSizeChange(pages_size) {
      this.listQuery.pageSize = pages_size
      this.getHostInfo()
    },
    //分页数据
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getHostInfo()
    },
    handleAddButton() {
      this.AddHostDialog = true
    },
    //按钮操作函数
    handleButton(val) {
      if (val.methods === 'showDetailsDialog') {
        this.DetailsDialog = true
        this.hostDetails.HostBaseDetails = [
          {
            baseName: '主机地址：',
            baseValue: val.row.eth1
          },
          {
            baseName: '远程端口：',
            baseValue: val.row.remote_port
          },
          {
            baseName: 'ROOT密码：',
            baseValue: val.row.root_password
          },
          {
            baseName: '运维用户名：',
            baseValue: val.row.operation_username
          },
          {
            baseName: '运维用户密码：',
            baseValue: val.row.operation_password
          },
          {
            baseName: '应用程序用户：',
            baseValue: val.row.application_username
          },
          {
            baseName: '程序用户密码：',
            baseValue: val.row.application_password
          },
          {
            baseName: '创建时间：',
            baseValue: val.row.purchasing
          },
          {
            baseName: '过期时间：',
            baseValue: val.row.expire
          },
          {
            baseName: '所属机房：',
            baseValue: val.row.idc
          },
          {
            baseName: '所属业务：',
            baseValue: val.row.project
          },
          {
            baseName: '部署的环境：',
            baseValue: val.row.env
          }
        ]
        this.hostDetails.HostSystemDetails = [
          {
            systemName: '主机名：',
            systemValue: val.row.name
          },
          {
            systemName: 'MCA地址：',
            systemValue: val.row.mac_address
          },
          {
            systemName: 'CPU核数：',
            systemValue: val.row.cpu
          },
          {
            systemName: '硬盘大小：',
            systemValue: val.row.hard_disk
          },
          {
            systemName: 'CPU型号：',
            systemValue: val.row.cpu_info
          },
          {
            systemName: '系统类型：',
            systemValue: val.row.system
          },
          {
            systemName: '系统架构：',
            systemValue: val.row.system_cpu_arch
          }
        ]
        getHostRecordInfo({
          host_name: val.row.eth1
        }).then(response => {
          console.log(response)
        })
      } else if (val.methods === 'showEditDialog') {
        this.EditDialog = true
        //初始化数据
        this.hostEditDialog.editFromData.hostname = val.row.name
        this.hostEditDialog.editFromData.interface = val.row.eth1
        this.hostEditDialog.editFromData.remote_port = val.row.remote_port
        this.hostEditDialog.editFromData.purchasing = val.row.purchasing
        this.hostEditDialog.editFromData.expire = val.row.expire
        this.hostEditDialog.editFromData.root_password = val.row.root_password
        this.hostEditDialog.editFromData.operation_username =
          val.row.operation_username
        this.hostEditDialog.editFromData.operation_password =
          val.row.operation_password
        this.hostEditDialog.editFromData.application_username =
          val.row.application_username
        this.hostEditDialog.editFromData.application_password =
          val.row.application_password
        this.hostEditDialog.editFromData.host_idc = val.row.idc
        this.hostEditDialog.editFromData.deploy_evn = val.row.env
        this.hostEditDialog.editFromData.project_name = val.row.project
        this.hostEditDialog.editFromData.host_mac = val.row.mac_address
        this.hostEditDialog.editFromData.host_cpu = val.row.cpu
        this.hostEditDialog.editFromData.hard_disk = val.row.hard_disk
        this.hostEditDialog.editFromData.host_memory = val.row.host_memory
        this.hostEditDialog.editFromData.system_type = val.row.system
        this.hostEditDialog.editFromData.system_architecture =
          val.row.system_cpu_arch
        this.hostEditDialog.editFromData.cpu_info = val.row.cpu_info
        this.hostEditDialog.editFromData.id = val.row.id
      } else if (val.methods === 'deleteFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteHostInfo({
              id: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getHostInfo()
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
      } else if (val.methods === 'UpdateFunction') {
        this.$confirm('确定更新此主机！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            UpdateHostInfoForAnsbile({
              host_id: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getHostInfo()
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
    }
  }
}
</script>

<style scoped></style>
