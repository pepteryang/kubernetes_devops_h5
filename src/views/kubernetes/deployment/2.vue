<template>
  <div>
    <div>
      <el-form
        :inline="true"
        :model="formData"
        :rules="formRules"
        ref="formData"
      >
        <el-form-item prop="kubernetes_cluster">
          <el-select
            @change="getKubernetesProjectList"
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
            placeholder="请选择..."
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
            filterable
            lass="input-width"
            placeholder="请选择..."
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
    </div>
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
        @close="closeDialog()"
        title="镜像部署"
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
          <el-form-item prop="selectHarborName">
            <el-select
              @change="getDeployImagesList"
              clearable
              lass="input-width"
              placeholder="请选择镜像的存储地址"
              size="medium"
              style="width: 300px"
              v-model="dialogForm.selectHarborName"
              value-key="name"
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
          <el-form-item prop="selectImageName">
            <el-select
              clearable
              lass="input-width"
              placeholder="请选择你要部署的镜像"
              size="medium"
              style="width: 450px"
              v-model="dialogForm.selectImageName"
              value-key="name"
            >
              <el-option
                :key="item.id"
                :lable="item.tag_name"
                :value="item.tag_name"
                v-for="item in imagesList"
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
  GetActiveServicesList,
  GetDeployImagesList,
  GetKubernetesList,
  GetKubernetesProjectList,
  GetKubernetesProjectToComponentList,
  GetServicesInfoModelList,
  SearchApplicationServicesInfo
} from "../../../api/kubernetes";

import { GetHarborList } from "../../../api/harbor";

export default {
  name: "deploy",
  components: {
    "json-editor": JsonEditor,
    "table-template": tableTemplate
  },
  data() {
    return {
      loading: false,
      //按钮的名称
      buttonInfo: {
        DetailsName: "详情",
        ActiveName: "部署",
        DisableName: "记录",
        //按时是否显示
        visibleEdit: "",
        visibleActive: "",
        visibleDelete: ""
      },
      formData: {
        projectName: "",
        componentsName: "",
        kubernetes_cluster: ""
      },
      formRules: {
        kubernetes_cluster: [
          { type: "string", required: true, message: "请选择你部署的集群" }
        ],
        projectName: [
          { type: "string", required: true, message: "请选择项目" }
        ],
        componentsName: [
          { type: "string", required: true, message: "请选择组件" }
        ]
      },
      dialogForm: {
        selectImageName: "",
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
        DeployDialogVisible: false,
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
          prop: "kubernetes_cluster", //<String>  对应属性名
          label: "Kubernetes集群", //<String>   表头标签
          align: ""
        },
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
    this.getKubernetesList();
    this.getHarborList();
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
    getHarborList() {
      GetHarborList({
        type: "harbor"
      }).then(response => {
        console.log(response.data.results);
        if (response.status === 200) {
          this.harborList = response.data.results;
        }
      });
    },
    getKubernetesProjectList() {
      GetKubernetesProjectList({
        kubernetes_cluster: this.formData.kubernetes_cluster
      }).then(response => {
        if (response.status === 200) {
          console.log(response.data.results);
          this.projectList = response.data.results;
        }
      });
    },
    getActiveServicesList() {
      GetActiveServicesList().then(response => {
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
    getServicesInfoModelList() {
      GetServicesInfoModelList({
        project_name: this.formData.projectName.trim(),
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
    closeDialog() {
      this.dialogData.EditDialogVisible = false;
      //清除验证和数据
      this.$refs["dialogForm"].resetFields();
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
          })
            .then(response => {
              if ((response.status === 200) | (response.status === 201)) {
                console.log(response.data);
                //清除数据
                this.$refs[formName].clearValidate();
                //更新数据
                this.dialogData.DeployDialogVisible = false;
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    searchApplicationServicesInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          SearchApplicationServicesInfo({
            kubernetes_cluster: this.formData.kubernetes_cluster.trim(),
            project_name: this.formData.projectName.trim(),
            component_name: this.formData.componentsName.trim(),
            resources_model: "Deployment"
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
      this.getKubernetesList();
      this.dialogData.DeployDialogVisible = true;
    }
  }
};
</script>

<style scoped></style>
