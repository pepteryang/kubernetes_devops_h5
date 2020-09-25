<template>
  <div>
    <div>
      <web-ssh
        :wsURL="wsURL"
        :kubernetesTerminalDialogShow.sync="kubernetesTerminalDialogShow"
      ></web-ssh>
    </div>
    <div>
      <el-form
        :inline="true"
        :model="kubernetesDeployInfoData"
        ref="kubernetesDeployInfoForm"
      >
        <el-form-item
          label-width="120px"
          prop="kubernetes_cluster"
        >
          <el-select
            filterable
            lass="input-width"
            placeholder="请选择Kubernetes集群"
            @change="getKubernetesNamespaceList"
            v-model="kubernetesDeployInfoData.kubernetes_cluster"
            value-key="name"
          >
            <el-option
              :key="item.id"
              :lable="item.name"
              :value="item.name"
              v-for="item in kubernetesList"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label-width="120px"
          prop="kubernetes_cluster_namespace"
        >
          <el-select
            filterable
            lass="input-width"
            placeholder="Kubernetes命名空间"
            @change="getPodsInKubernetesNamespaces"
            v-model="kubernetesDeployInfoData.kubernetes_cluster_namespace"
            value-key="name"
          >
            <el-option
              :key="item.id"
              :lable="item.name"
              :value="item.name"
              v-for="item in kubernetesNamespaceList"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
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
import WebSsh from "@/components/webssh/"
import { dateFormat } from '@/utils/datetime'
import { GetKubernetesList } from '@/api/kubernetes'

import {
  GetKubernetesNamespaces,
  GetPodsInKubernetesNamespaces,
  GetPodsForAllNamespaces,
  DeleteNamespacePod
} from '@/api/kubernetesCluster'

export default {
  name: 'DeployInfo',
  components: {
    'table-box': TableBox,
    'web-ssh':  WebSsh
  },
  data() {
    return {
      wsURL:"",
      socket:null,
      kubernetesTerminalDialogShow:false,
      selectKubernetesClusterId:"",
      loading: true,
      //超链接行
      hyperlink: {
        isShow: false
      },
      //按钮栏的配置
      operation: {
        width: 350,
        buttons: [
          {
            label: '日志',
            type: 'danger',
            methods: 'showLogsDialog',
            size: 'mini'
          },
          {
            label: 'SSH',
            type: 'primary',
            methods: 'showWebSSHDialog',
            size: 'mini'
          },
          {
            label: '重启',
            type: 'warning',
            methods: 'ChangePasswordFunction',
            size: 'mini'
          },
          {
            label: '回滚',
            type: 'danger',
            methods: 'deleteFunction',
            size: 'mini'
          },{
            label: '回收',
            type: 'danger',
            methods: 'deleteNamespacePodFunction',
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
      kubernetesDeployInfoData: {
        kubernetes_cluster: '',
        kubernetes_cluster_namespace: ''
      },
      searchAndExportForm: {
        search_keys: ''
      },
      kubernetesNamespaceList: '',
      kubernetesList: '',
      tableList: [], // 数据源
      tableColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'name', //<String>  对应属性名
          label: 'Pod名字', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'namespace', //<String>  对应属性名
          label: '命名空间', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'kind', //<String>  对应属性名
          label: '资源类型', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'phase', //<String>  对应属性名
          label: 'Pod状态', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'pod_ip', //<String>  对应属性名
          label: 'Pod地址' //<String>   表头标签
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'node_ip', //<String>  对应属性名
          label: 'node地址' //<String>   表头标签
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'start_time', //<String>  对应属性名
          label: '创建时间', //<String>   表头标签
          formatter: dateFormat
        }
      ]
    }
  },
  created() {
    this.getKubernetesList()
  },
  methods: {
    getKubernetesList() {
      GetKubernetesList({
        type: 'Kubernetes'
      }).then(response => {
        //打印访问状态
        if (response.status === 200 && response.data.code === 66666) {
          this.kubernetesList = response.data.data
        }
      })
    },
    getKubernetesNamespaceList(val) {
      this.getPodsForAllNamespaces()
      this.kubernetesList.forEach(v => {
        if (val === v.name) {
          this.selectKubernetesClusterId = v.id
          GetKubernetesNamespaces({
            kubernetes_pk: v.id
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.kubernetesNamespaceList = response.data.data
            }
          })
        }
      })
    },
    getPodsForAllNamespaces() {
      GetPodsForAllNamespaces({
        kubernetes_cluster: this.kubernetesDeployInfoData.kubernetes_cluster
      }).then(response => {
        if (response.status === 200 && response.data.code === 66666) {
          this.tableList = response.data.data
          this.loading = false
        }
      })
    },

    getPodsInKubernetesNamespaces() {
      GetPodsInKubernetesNamespaces({
        kubernetes_namespace: this.kubernetesDeployInfoData
          .kubernetes_cluster_namespace,
        kubernetes_cluster: this.kubernetesDeployInfoData.kubernetes_cluster
      }).then(response => {
        if (response.status === 200 && response.data.code === 66666) {
          this.tableList = response.data.data
          this.loading = false
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
      this.getResourcesInfo()
    },
    //分页数据
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getResourcesInfo()
    },
    
    //控制新增弹窗
    handleAddButton() {
      this.AddResourcePoolDialogVisible = true
    },
    //操作按钮控制方法
    handleButton(val) {
      if (val.methods === 'showDetailsDialog') {
        console.log(val)
      } else if (val.methods === 'showWebSSHDialog') {
        this.wsURL= process.env.VUE_APP_WS_URL + '/ws/' + val.row.namespace + '/' + val.row.name + '/' + this.selectKubernetesClusterId
        this.kubernetesTerminalDialogShow = true
        showLogsDialog
      } else if (val.methods === 'showLogsDialog') {
        this.wsURL= process.env.VUE_APP_WS_URL + '/wsLog/' + val.row.namespace + '/' + val.row.name + '/' + this.selectKubernetesClusterId
        this.kubernetesTerminalDialogShow = true
      } else if (val.methods === 'deleteNamespacePodFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteNamespacePod({
              kubernetes_cluster:this.kubernetesDeployInfoData.kubernetes_cluster,
              pod_name: val.row.name,
              namespace:val.row.namespace
            }).then(response => {
              console.log(response.data)
              if (response.status === 200 && response.data.code === 66666) {
                this.getResourcesInfo()
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
