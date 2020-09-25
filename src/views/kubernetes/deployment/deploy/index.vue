<template>
  <div>
    <div>
      <el-dialog
        :visible.sync="KubernetesDeployApplicationDialogVisible"
        @close="closeDialog('kubernetesDeployDataForm')"
      >
        <el-form
          :model="kubernetesDeployData"
          :rules="kubernetesDeployData.formRules"
          ref="kubernetesDeployDataForm"
        >
          <el-form-item
            label-width="120px"
            label="K8S集群："
            prop="kubernetes_cluster"
          >
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择Kubernetes集群"
              @change="getKubernetesNamespaceList"
              v-model="kubernetesDeployData.kubernetes_cluster"
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
            label="命名空间："
            prop="kubernetes_cluster_namespace"
          >
            <el-select
              filterable
              lass="input-width"
              placeholder="Kubernetes命名空间"
              v-model="kubernetesDeployData.kubernetes_cluster_namespace"
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
          <el-form-item
            label-width="120px"
            label="镜像仓库："
            prop="Harbor_cluster"
          >
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择Harbor地址"
              v-model="kubernetesDeployData.Harbor_cluster"
              value-key="name"
              @change="getHarborRepoTagName"
            >
              <el-option
                :key="item.id"
                :lable="item.name"
                :value="item.name"
                v-for="item in harborList"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="120px"
            label="镜像名称："
            prop="deploy_image"
          >
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择你需要部署的镜像"
              v-model="kubernetesDeployData.deploy_image"
              value-key="name"
            >
              <el-option
                :key="item.id"
                :lable="item.tag_name"
                :value="item.tag_name"
                v-for="item in imageList"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="KubernetesDeployApplicationFun"
              >部署</el-button
            >
            <el-button type="warning">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="KubernetesDeploySystemDialogVisible"
        @close="closeDialog('kubernetesDeployDataForm')"
      >
        <el-form
          :model="kubernetesDeployData"
          :rules="kubernetesDeployData.formRules"
          ref="kubernetesDeployDataForm"
        >
          <el-form-item
            label-width="120px"
            label="K8S集群："
            prop="kubernetes_cluster"
          >
            <el-select
              filterable
              lass="input-width"
              placeholder="请选择Kubernetes集群"
              @change="getKubernetesNamespaceList"
              v-model="kubernetesDeployData.kubernetes_cluster"
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
          <el-form-item>
            <el-button type="primary">部署</el-button>
            <el-button type="warning">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="DetailsDeploymentDialogVisible">
        <json-editor
          ref="DetailJsonEditor"
          v-model="DetailsDeploymentDataResources_content"
        ></json-editor>
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
              <el-button type="primary" @click="handleSearchFun">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="handleExportFun">导出</el-button>
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
import { dateFormat } from '@/utils/datetime'
import TableBox from '@/components/tableBox/'
import JsonEditor from '@/components/JsonEditor/'
import {
  GetResourcesInfo,
  GetKubernetesList,
  DeployKubernetesServices
} from '@/api/kubernetes'
import { GetHarborList, getHarborRepoInfo } from '@/api/harbor'

import { GetKubernetesNamespaces } from '@/api/kubernetesCluster'

import { GetProjectInfo } from '@/api/assets'
export default {
  name: 'Deployment',
  components: {
    'table-box': TableBox,
    'json-editor': JsonEditor
  },
  data() {
    return {
      KubernetesDeployApplicationDialogVisible: false,
      DetailsDeploymentDialogVisible: false,
      KubernetesDeploySystemDialogVisible: false,
      DetailsDeploymentDataResources_content: '',
      loading: true,
      //超链接行
      hyperlink: {
        isShow: false
      },
      changesViews: '',
      //按钮栏的配置
      operation: {
        width: 300,
        buttons: [
          {
            label: '详情',
            type: 'danger',
            methods: 'showDetailsDialog',
            size: 'mini'
          },
          {
            label: '部署',
            type: 'primary',
            methods: 'DeploymentButtonFun',
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
      kubernetesDeployData: {
        select_project_code: '',
        deploy_image: '',
        kubernetes_cluster: '',
        kubernetes_cluster_namespace: '',
        Harbor_cluster: '',
        harbor_cluster_id: '',
        select_project: '',
        select_project_module: '',
        resources_type: '',
        resources_id: '',
        ShowNamespaceHarbor: '',
        notShowNamespaceHarbor: ''
      },
      tableList: [], // 数据源
      harborList: [],
      projectList: [],
      kubernetesList: [],
      kubernetesNamespaceList: [],
      imageList: [],
      tableColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'resources_name', //<String>  对应属性名
          label: '名称', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'resources_type', //<String>  对应属性名
          label: '类型', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'project_name', //<String>  对应属性名
          label: '项目', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'projectModule_name', //<String>  对应属性名
          label: '模块', //<String>   表头标签
          align: ''
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'modify_time', //<String>  对应属性名
          label: '更新时间', //<String>   表头标签
          align: '',
          formatter: dateFormat
        }
      ]
    }
  },
  created() {
    this.getResourcesInfo()
  },
  methods: {
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取菜单接口
    getResourcesInfo() {
      GetResourcesInfo({
        page: this.listQuery.page,
        page_size: this.listQuery.pageSize
      }).then(response => {
        if (response.status === 200) {
          this.tableList = response.data.results
          this.listQuery.total = response.data.count
          this.listQuery.currentPage = response.data.next
          this.loading = false
        }
      })
    },
    //获取项目数据列表
    getProjectInfo() {
      GetProjectInfo().then(response => {
        if (response.status === 200) {
          //在赋值前清空列表
          this.projectList = response.data.data
          this.loading = false
        } else {
          //
        }
      })
    },
    getProjectCodeByProjectName() {
      this.projectList.forEach(v => {
        if (this.kubernetesDeployData.select_project === v.name) {
          this.kubernetesDeployData.select_project_code = v.project_code
        }
      })
    },
    getHarborList() {
      GetHarborList({
        type: 'Harbor'
      }).then(response => {
        //打印访问状态
        if (response.status === 200 && response.data.code === 66666) {
          this.harborList = response.data.data
        }
      })
    },
    getHarborRepoTagName(val) {
      this.getProjectCodeByProjectName()
      this.harborList.forEach(v => {
        if (val === v.name) {
          this.kubernetesDeployData.harbor_cluster_id = v.id
          getHarborRepoInfo({
            pk: v.id,
            repo_name:
              this.kubernetesDeployData.select_project_code +
              '/' +
              this.kubernetesDeployData.select_project_module
          }).then(response => {
            if (response.status === 200) {
              // reverse 倒序排列，sort，正序
              this.imageList = response.data.reverse()
            }
          })
        }
      })
    },
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
      this.kubernetesList.forEach(v => {
        if (val === v.name) {
          console.log(v.id)
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
    //根据条件显示
    changeDeployTypeViews(val) {
      if (
        val === 'DaemonSet' ||
        val === 'Deployment' ||
        val === 'StatefulSet'
      ) {
        this.KubernetesDeployApplicationDialogVisible = true
      } else {
        this.KubernetesDeploySystemDialogVisible = true
      }
    },
    KubernetesDeployApplicationFun() {
      DeployKubernetesServices({
        deploy_project_name: this.kubernetesDeployData.select_project,
        deploy_project_code: this.kubernetesDeployData.select_project_code,
        deploy_image_name: this.kubernetesDeployData.deploy_image,
        deploy_kubernetes_cluster_name: this.kubernetesDeployData
          .kubernetes_cluster,
        deploy_namespace: this.kubernetesDeployData
          .kubernetes_cluster_namespace,
        deploy_harbor_id: this.kubernetesDeployData.harbor_cluster_id,
        deploy_project_module: this.kubernetesDeployData.select_project_module,
        deploy_resources_type: this.kubernetesDeployData.resources_type,
        deploy_resources_id: this.kubernetesDeployData.resources_id,
        deploy_name: localStorage.getItem('username')
      }).then(response => {
        console.log(response.data)
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
        this.DetailsDeploymentDataResources_content = JSON.parse(
          val.row.resources_content
        )
        this.DetailsDeploymentDialogVisible = true
      } else if (val.methods === 'DeploymentButtonFun') {
        this.kubernetesDeployData.select_project = val.row.project_name
        this.kubernetesDeployData.select_project_module =
          val.row.projectModule_name
        this.kubernetesDeployData.resources_type = val.row.resources_type
        this.kubernetesDeployData.resources_id = val.row.id

        this.getProjectInfo()
        this.getHarborList()
        this.getKubernetesList()
        this.changeDeployTypeViews(val.row.resources_type)
      }
    }
  }
}
</script>

<style scoped></style>
