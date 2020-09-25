<template>
  <div>
    <el-dialog>
      <el-form
        :inline="true"
        :model="KuberneteDeployData"
        :rules="KuberneteDeployData.formRules"
        ref="KuberneteDeployDataForm"
      >
        <el-form-item prop="kubernetes_cluster">
          <el-select
            @change="getResourcesModelList"
            filterable
            lass="input-width"
            placeholder="请选择Kubernetes集群"
            v-model="formData.kubernetes_cluster"
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
        <el-form-item prop="projectName">
          <el-select
            @change="getKubernetesProjectToComponentList"
            filterable
            lass="input-width"
            placeholder="请选择项目名称"
            v-model="formData.projectName"
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
        <el-form-item prop="componentsName">
          <el-select
            @change="getResourcesModelList"
            filterable
            lass="input-width"
            placeholder="请选择服务名称"
            v-model="formData.componentsName"
            value-key="project_name"
          >
            <el-option
              :key="item.id"
              :lable="item.id"
              :value="item.name"
              v-for="item in componentsList"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="searchApplicationServicesInfo('formData')"
            type="primary"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <hr style=" height:2px;border:none;border-top:2px dotted #185598;" />
    <div>
      <table-template
        :ActiveName="buttonInfo.ActiveName"
        :DetailsName="buttonInfo.DetailsName"
        :DisableName="buttonInfo.DisableName"
        :buttonInfo="buttonInfo"
        :handleActive="handleDeploy"
        :handleDelete="handleListDeploy"
        :handleEdit="handleQueryInfo"
        :loading="loading"
        :selectColumns="false"
        :selectionShow="true"
        :tableColumns="listColumns"
        :tableData="tableList"
        :visibleActive="buttonInfo.visibleActive"
        :visibleDelete="buttonInfo.visibleDelete"
        :visibleEdit="buttonInfo.visibleEdit"
        border
      >
      </table-template>
    </div>
    <div>
      <el-dialog :visible.sync="dialogData.EditDialogVisible" title="详情">
        <template>
          <div>
            <json-editor ref="jsonEditor" v-model="value"></json-editor>
          </div>
        </template>
        <div class="dialog-footer" slot="footer">
          <el-button @click="dialogData.EditDialogVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="dialogData.DeployDialogVisible"
        title="服务部署"
      >
        <el-form
          :model="dialogForm"
          :rules="dialogForm.formRules"
          ref="dialogForm"
        >
          <el-form-item prop="selectKubernetesName">
            <el-select
              clearable
              lass="input-width"
              placeholder="请选择部署的集群"
              size="medium"
              style="width: 300px"
              v-model="dialogForm.selectKubernetesName"
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
        </el-form>

        <div class="dialog-footer" slot="footer">
          <el-button @click="DeployToApi('dialogForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../../utils/datetime";
import tableTemplate from "@/components/table/";
import JsonEditor from "@/components/JsonEditor/";
import {
  DeploymentServiceInfo,
  GetDeployImagesList,
  GetKubernetesList,
  GetKubernetesProjectList,
  GetKubernetesProjectToComponentList,
  GetResourcesCategoriesList,
  GetServicesInfoModelList,
  OtherServicesInfo,
  SearchApplicationServicesInfo
} from "../../../api/kubernetes";

export default {
  name: "deploy",
  components: {
    "json-editor": JsonEditor,
    "table-template": tableTemplate
  },
  data() {
    return {
      loading: false,
      buttonInfo: {
        //按钮的名称
        DetailsName: "详情",
        ActiveName: "部署",
        DisableName: "Serv",
        //按钮显示,为空显示，none 为不显示
        visibleEdit: "",
        visibleActive: "",
        visibleDelete: ""
      },
      formData: {
        kubernetes_cluster: "",
        componentsName: "",
        projectName: ""
      },
      formRules: {
        kubernetes_cluster: [
          { type: "string", required: true, message: "请选择你部署的集群" }
        ],
        componentsName: [
          { type: "string", required: true, message: "请选择服务名称" }
        ],
        projectName: [
          { type: "string", required: true, message: "请选择项目名称" }
        ]
      },
      dialogForm: {
        selectKubernetesName: "",
        selectHarborName: "",
        formRules: {
          selectKubernetesName: [
            { type: "string", required: true, message: "请选择你部署的集群" }
          ],
          selectImageName: [
            { type: "string", required: true, message: "请选择部署的镜像文件" }
          ],
          selectHarborName: [
            { type: "string", required: true, message: "请选择镜像仓库" }
          ]
        }
      },
      dialogData: {
        EditDialogVisible: false,
        DeployDialogVisible: false
      },
      projectList: [],
      componentsList: [],
      serviceModelList: [],
      resourcesModelList: [],
      kubernetesList: [],
      harborList: [],
      imagesList: [],
      tableList: [],
      listColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "project_name", //<String>  对应属性名
          label: "服务名称", //<String>   表头标签
          align: ""
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "component_name", //<String>  对应属性名
          label: "所属组件", //<String>   表头标签
          align: ""
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "resources_model", //<String>  对应属性名
          label: "资源类型", //<String>   表头标签
          align: ""
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "modify_name", //<String>  对应属性名
          label: "更新人", //<String>   表头标签
          align: ""
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "modify_time", //<String>  对应属性名
          label: "更新时间", //<String>   表头标签
          align: "",
          formatter: dateFormat
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "create_time", //<String>  对应属性名
          label: "创建时间", //<String>   表头标签
          align: "",
          formatter: dateFormat
        }
      ],
      value: "",
      selectedData: []
    };
  },
  created() {
    this.getActiveServicesList();
    this.getKubernetesProjectList();
    this.getKubernetesList();
  },
  methods: {
    getKubernetesList() {
      GetKubernetesList({
        type: "kubernetes"
      }).then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.kubernetesList = response.data.results;
        }
      });
    },
    getKubernetesProjectList() {
      GetKubernetesProjectList({
        kubernetes_cluster: this.formData.kubernetes_cluster
      }).then(response => {
        if (response.status === 200) {
          this.projectList = response.data.results;
        }
      });
    },
    getActiveServicesList() {
      OtherServicesInfo().then(response => {
        console.log(response.status);
        console.log(response.data.results);
        if (response.status === 200) {
          this.tableList = response.data;
        }
      });
    },
    getKubernetesProjectToComponentList() {
      console.log(this.formData.projectName);
      GetKubernetesProjectToComponentList({
        project_name: this.formData.projectName
      }).then(response => {
        console.log(response.status);
        console.log(response.data.results);
        if (response.status === 200) {
          this.componentsList = response.data.results;
        }
      });
    },
    getResourcesModelList() {
      GetResourcesCategoriesList().then(response => {
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.resourcesModelList = response.data;
        }
      });
    },
    getServicesInfoModelList() {
      GetServicesInfoModelList({
        project_name: this.formData.projectName.trim,
        component_name: this.formData.componentsName.trim(),
        resources_model: this.formData.resourcesModel.trim()
      }).then(response => {
        if (response.status === 200) {
          console.log(response.data.results);
          this.tableList = response.data.results;
        }
      });
    },
    getDeployImagesList() {
      GetDeployImagesList({
        harborName: this.dialogForm.selectHarborName.trim(),
        project_name: this.selectedData["project_name"].trim(),
        component_name: this.selectedData["component_name"].trim()
      }).then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.imagesList = response.data;
        }
      });
    },
    handleQueryInfo(index, row) {
      this.value = JSON.parse(row.content);
      this.dialogData.EditDialogVisible = true;
    },
    DeployToApi(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          DeploymentServiceInfo({
            id: this.selectedData["id"],
            resources_model: this.selectedData["resources_model"],
            deploy_name: "peter",
            image_name: this.dialogForm.selectImageName,
            kubernetes_name: this.dialogForm.selectKubernetesName,
            kubernetes_cluster: this.dialogForm.selectKubernetesName
          }).then(response => {
            console.log(response.status);
            if (response.status === 200 || response.status === 201) {
              console.log(response.data);
              //清除数据
              // this.$refs[formName].clearValidate();
              this.$refs[formName].resetFields();
              //更新数据
              this.dialogData.DeployDialogVisible = false;
            }
          });
        }
      });
    },
    searchApplicationServicesInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          SearchApplicationServicesInfo({
            kubernetes_cluster: this.formData.kubernetes_cluster,
            project_name: this.formData.projectName,
            component_name: this.formData.componentsName
          }).then(response => {
            console.log(response.data);
            if (response.status === 200) {
              this.tableList = response.data;
            }
          });
        }
      });
    },
    handleListDeploy(index, row) {
      console.log(row);
    },
    handleDeploy(index, row) {
      console.log(row);
      this.selectedData = row;
      this.dialogData.DeployDialogVisible = true;
    }
  }
};
</script>

<style scoped></style>
