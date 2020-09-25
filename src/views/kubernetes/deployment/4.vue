<template>
  <div>
    <div>
      <el-form
        :inline="true"
        :model="formData"
        :rules="formRules"
        ref="formData"
      >
        <el-form-item prop="KubernetesName">
          <el-select
            @change="getResourcesCategoriesList"
            filterable
            lass="input-width"
            placeholder="请选择Kubernetes集群"
            v-model="formData.KubernetesName"
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
        <el-form-item prop="serviceModelName">
          <el-select
            @change="getDeploySystemServicesList"
            filterable
            lass="input-width"
            placeholder="请选择类型"
            v-model="formData.serviceModelName"
            value-key="name"
          >
            <el-option
              :key="item.id"
              :lable="item.name"
              :value="item.name"
              v-for="item in serviceModelList"
            >
            </el-option>
          </el-select>
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
              filterable
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
  GetDeploySystemServicesList,
  GetKubernetesList,
  GetResourcesCategoriesList
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
      //按钮的名称
      buttonInfo: {
        DetailsName: "详情",
        ActiveName: "部署",
        DisableName: "Serv",
        visibleEdit: "",
        visibleActive: "",
        visibleDelete: ""
      },
      formData: {
        KubernetesName: "",
        serviceModelName: ""
      },
      formRules: {
        selectKubernetesName: [
          { type: "string", required: true, message: "请选择你部署的集群" }
        ],
        serviceModelName: [
          { type: "string", required: true, message: "请选择你的资源类型" }
        ]
      },
      dialogForm: {
        selectKubernetesName: "",
        selectHarborName: ""
      },
      dialogData: {
        EditDialogVisible: false,
        DeployDialogVisible: false
      },
      serviceModelList: [],
      kubernetesList: [],
      tableList: [],
      listColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "kubernetes_cluster", //<String>  对应属性名
          label: "所属集群", //<String>   表头标签
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
    this.getKubernetesList();
    this.getDeploySystemServicesList();
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
    getResourcesCategoriesList() {
      GetResourcesCategoriesList({
        //后台需要判断，是否有值，有值，返回101的系统服务
        is_system: 101
      }).then(response => {
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.serviceModelList = response.data;
          this.getDeploySystemServicesList();
        }
      });
    },
    getDeploySystemServicesList() {
      GetDeploySystemServicesList({
        kubernetes_cluster: this.formData.KubernetesName,
        resources_model: this.formData.serviceModelName
      }).then(response => {
        console.log(response.status);
        console.log(response.data);
        if (response.status === 200) {
          this.tableList = response.data;
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
            kubernetes_name: this.dialogForm.selectKubernetesName
          }).then(response => {
            if (response.status === 200) {
              console.log(response.data);
              //清除数据
              this.$refs[formName].clearValidate();
              //更新数据
              this.dialogData.DeployDialogVisible = false;
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
