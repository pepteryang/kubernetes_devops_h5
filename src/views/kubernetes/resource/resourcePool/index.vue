<template>
    <div>
        <div>
            <el-dialog
                title="资源详情"
                :visible.sync="DetailResourcePoolDialogVisible"
                @close="closeDialog('DetailResourcePoolForm')">
                <el-form
                    :model="DetailResourcePoolData"
                    ref="DetailResourcePoolForm"
                >
                    <el-form-item
                        label-width="100px"
                        label="资源名称："
                        prop="Detail_resources_name">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_resources_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="所属项目："
                        prop="Detail_project_name">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_project_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="项目模块："
                        prop="Detail_projectModule_name">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_projectModule_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="创建人："
                        prop="Detail_create_name">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_create_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="创建时间："
                        prop="Detail_create_time">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_create_time"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="修改人："
                        prop="Detail_modify_name">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_modify_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="修改时间："
                        prop="Detail_modify_time">
                        <el-input
                            disabled
                            v-model="DetailResourcePoolData.Detail_modify_time"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <json-editor
                            ref="DetailJsonEditor"
                            v-model="DetailResourcePoolData.Detail_resources_content"></json-editor>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                title="创建资源"
                :visible.sync="AddResourcePoolDialogVisible"
                @close="closeDialog('AddResourcePoolForm')">
                <el-form
                    :model="AddResourcePoolData"
                    :rules="AddResourcePoolData.formRules"
                    ref="AddResourcePoolForm"
                >
                    <el-form-item
                        prop="resources_name">
                        <el-input
                            placeholder="请输入资源名称,命名规则：SIT-CAI-SMP-Deployment"
                            v-model="AddResourcePoolData.resources_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="AddResourcePoolData.is_system" >
                            <el-radio-button label="101">系统服务</el-radio-button>
                            <el-radio-button label="102">应用服务</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                    prop="resources_type">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="请选择资源类型"
                            v-model="AddResourcePoolData.resources_type"
                            @change="getCategoriesTemplate"
                            value-key="resources_name"
                        >
                            <el-option
                                :key="item.id"
                                :lable="item.resources_name"
                                :value="item.resources_name"
                                v-for="item in categoriesList"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        prop="project_name">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="所属项目"
                            v-model="AddResourcePoolData.project_name"
                            @change="getProjectModuleInfo"
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
                    <el-form-item
                        prop="projectModule_name">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="所属模块"
                            v-model="AddResourcePoolData.projectModule_name"
                            value-key="projectModule_name"
                        >
                            <el-option
                                :key="item.id"
                                :lable="item.name"
                                :value="item.name"
                                v-for="item in projectModuleList"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <json-editor ref="AddJsonEditor"
                                     v-model="AddResourcePoolData.resources_content"></json-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="postResourcesInfo('AddResourcePoolForm')" type="primary">创建资源
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :visible.sync="EditResourcePoolDialogVisible"
                @close="closeDialog('EditResourcePoolForm')">
                <el-form
                    :model="EditResourcePoolData"
                    :rules="EditResourcePoolData.EditRules"
                    ref="EditResourcePoolForm"
                >
                    <el-form-item
                        prop="Edit_resources_name">
                        <el-input
                            placeholder="请输入资源名称"
                            v-model="EditResourcePoolData.Edit_resources_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="EditResourcePoolData.Edit_is_system" >
                            <el-radio-button label="101">系统服务</el-radio-button>
                            <el-radio-button label="102">应用服务</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        prop="Edit_project_name">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="所属项目"
                            v-model="EditResourcePoolData.Edit_project_name"
                            @change="getProjectModuleInfo"
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
                    <el-form-item
                        prop="Edit_projectModule_name">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="所属模块"
                            v-model="EditResourcePoolData.Edit_projectModule_name"
                            value-key="projectModule_name"
                        >
                            <el-option
                                :key="item.id"
                                :lable="item.name"
                                :value="item.name"
                                v-for="item in projectModuleList"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <json-editor ref="EditJsonEditor" v-model="EditResourcePoolData.Edit_resources_content"></json-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="patchResourcesInfo('EditResourcePoolForm')" type="primary">更新资源</el-button>
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
              <el-col style="float:right" :lg="16" :md="16" :sm="16" :xl="16" :xs="16">
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
    import TableBox from "@/components/tableBox/";
    import JsonEditor from "@/components/JsonEditor/";
    import {
        GetResourcesCategoriesInfo,
        GetResourcesInfo,
        PostResourcesInfo,
        PatchResourcesInfo,
        DeleteResourcesInfo,
    } from "@/api/kubernetes";
    
    import {
        GetProjectModuleInfo,
        GetProjectInfo} from "@/api/assets";
    export default {
        name: "ResourcePool",
        components: {
            "json-editor": JsonEditor,
            "table-box": TableBox
        },
        data() {
            return {
                loading: false,
                DetailResourcePoolDialogVisible:false,
                AddResourcePoolDialogVisible:false,
                EditResourcePoolDialogVisible: false,
                //超链接行
                hyperlink: {
                    isShow: false
                },
                tableList: [],
                categoriesList:[],
                projectModuleList:[],
                projectList:[],
                tableColumns: [
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "resources_name", //<String>  对应属性名
                        label: "资源名称", //<String>   表头标签
                        align: "center",
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "is_system", //<String>  对应属性名
                        label: "服务类型", //<String>   表头标签
                        align: "center",
                        formatter: this.FormatSystemModel
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "create_name", //<String>  对应属性名
                        label: "创建人", //<String>   表头标签
                        align: "center",
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "project_name", //<String>  对应属性名
                        label: "所属项目", //<String>   表头标签
                        align: "center",
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "projectModule_name", //<String>  对应属性名
                        label: "所属模块", //<String>   表头标签
                        align: "center",
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "modify_name", //<String>  对应属性名
                        label: "修改人", //<String>   表头标签
                        align: "center",
                    },
                ],
                operation: {
                    width: 210,
                    buttons: [
                        {
                            label: "详情",
                            type: "danger",
                            methods: "showDetailsDialog",
                            size: "mini"
                        },
                        {
                            label: "编辑",
                            type: "primary",
                            methods: "showEditDialog",
                            size: "mini"
                        },
                        {
                            label: "删除",
                            type: "danger",
                            methods: "deleteFunction",
                            size: "mini"
                        },
                    ]
                },
                listQuery: {
                    total: 0,
                    pageSize: 10,
                    page: 1,
                    size: 10
                },
                searchAndExportForm: {
                    search_keys: ""
                },
                DetailResourcePoolData:{
                    Detail_resources_name: "",
                    Detail_is_system:"",
                    Detail_resources_content: "",
                    Detail_project_name:"",
                    Detail_projectModule_name:"",
                    Detail_create_name :"",
                    Detail_create_time:"",
                    Detail_modify_name:"",
                    Detail_modify_time:""
                },
                AddResourcePoolData: {
                    projectModuleId:"",
                    is_system:"102",
                    resources_name: "",
                    resources_content: "",
                    resources_type:"",
                    project_name:"",
                    projectModule_name:"",
                    formRules: {
                        resources_name: [
                            {type: "string", required: true, message: "请输入资源名称"}
                        ],
                        resources_type:[
                            {type: "string", required: true, message: "请选择资源类型"}
                        ],
                        project_name: [
                            {type: "string", required: true, message: "请选择项目名称"}
                        ],
                        projectModule_name:[
                            {type: "string", required: true, message: "请选项目组件"}
                        ]
                    },
                },
                EditResourcePoolData: {
                    uuid :"",
                    Edit_is_system:"",
                    Edit_resources_name:"",
                    Edit_resources_type_id:"",
                    Edit_resources_content:"",
                    Edit_project_name:"",
                    Edit_projectModule_name:"",
                    EditRules: {
                        Edit_resources_name: [
                            {type: "string", required: true, message: "请输入资源类型"}
                        ],
                        Edit_resources_type:[
                            {type: "string", required: true, message: "请选择资源类型"}
                        ]
                    },
                },
                selectedData: []
            };
        },
        created() {
            this.getResourcesInfo();
            this.getResourcesCategoriesInfo();
            this.getProjectInfo()
        },
        methods: {
            //格式化系统服务类型
            
            /**
             * @return {string}
             */
            FormatSystemModel(row) {
                let val = row.is_system
                if (val === "101") {
                    return "系统服务";
                } else {
                    return "应用服务";
                }
            },
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },
            //获取资源类型
            getResourcesCategoriesInfo() {
                GetResourcesCategoriesInfo().then(response => {
                    if (response.status === 200) {
                        this.categoriesList = response.data.data;
                        this.listQuery.total = response.data.count;
                        this.listQuery.currentPage = response.data.next;
                        this.loading=false
                    }
                });
            },
            //获取资源类型的模板值
            getCategoriesTemplate(val) {
                this.categoriesList.forEach((v) => {
                    if (val === v.resources_name) {
                        GetResourcesCategoriesInfo({
                            uuid: v.id,
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.AddResourcePoolData.resources_content = JSON.parse(
                                    response.data.data[0]['resources_templates']
                                )
                            }
                        });
                    }
                });
            },
            //获取项目模块数据列表
            getProjectModuleInfo(val) {
                this.projectList.forEach((v) => {
                    if (val === v.name){
                        GetProjectModuleInfo({
                            uuid:v.id
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                //在赋值前清空列表
                                this.projectModuleList = response.data.data;
                            } else {
                                //
                            }
                        });
                    }
                });
            },
            //获取项目数据列表
            getProjectInfo() {
                GetProjectInfo().then(response => {
                    if (response.status === 200) {
                        //在赋值前清空列表
                        this.projectList = response.data.data;
                        this.loading = false;
                    } else {
                        //
                    }
                });
            },
            //获取菜单接口
            getResourcesInfo() {
                GetResourcesInfo({
                    page: this.listQuery.page,
                    page_size: this.listQuery.pageSize
                }).then(response => {
                    if (response.status === 200) {
                        this.tableList = response.data.results;
                        this.listQuery.total = response.data.count;
                        this.listQuery.currentPage = response.data.next;
                        this.loading=false
                    }
                });
            },
            //新建资源接口
            postResourcesInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PostResourcesInfo({
                            resources_name: this.AddResourcePoolData.resources_name,
                            resources_type:this.AddResourcePoolData.resources_type,
                            resources_content: JSON.stringify(
                                JSON.parse(this.AddResourcePoolData.resources_content)),
                            create_name: localStorage.getItem('username'),
                            project_name:this.AddResourcePoolData.project_name,
                            projectModule_name:this.AddResourcePoolData.projectModule_name
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.AddResourcePoolDialogVisible = false;
                                this.getResourcesInfo();
                                this.$message({
                                    type: "success",
                                    message: response.data.message
                                });
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: response.data.message
                                });
                            }
                        });
                    }
                });
            },
            //更新菜单接口
            patchResourcesInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PatchResourcesInfo({
                            uuid: this.EditResourcePoolData.uuid,
                            resources_name: this.EditResourcePoolData.Edit_resources_name,
                            resources_type:this.EditResourcePoolData.Edit_resources_type_id,
                            resources_content: JSON.stringify(
                                JSON.parse(this.EditResourcePoolData.Edit_resources_content)),
                            project_name:this.EditResourcePoolData.Edit_project_name,
                            projectModule_name:this.EditResourcePoolData.Edit_projectModule_name,
                            modify_name:localStorage.getItem("username")
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.getResourcesInfo();
                                this.EditResourcePoolDialogVisible = false;
                                this.$refs[formName].resetFields();
                                this.$message({
                                    type: "success",
                                    message: response.data.message
                                });
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: response.data.message
                                });
                            }
                            
                        });
                    }
                });
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
                this.$emit("handleSelectionChange", val);
            },
            //分页数据大小
            handleSizeChange(pages_size) {
                this.listQuery.pageSize = pages_size;
                this.getResourcesInfo();
            },
            //分页数据
            handleCurrentChange(page) {
                this.listQuery.page = page;
                this.getResourcesInfo();
            },
            //控制新增弹窗
            handleAddButton() {
                this.AddResourcePoolDialogVisible = true;
            },
            //操作按钮控制方法
            handleButton(val) {
                if (val.methods === "showDetailsDialog") {
                    this.DetailResourcePoolData.Detail_resources_name = val.row.resources_name;
                    this.DetailResourcePoolData.Detail_resources_content=JSON.parse(val.row.resources_content);
                    this.DetailResourcePoolData.Detail_is_system = val.row.is_system;
                    this.DetailResourcePoolData.Detail_project_name = val.row.project_name;
                    this.DetailResourcePoolData.Detail_projectModule_name = val.row.projectModule_name;
                    this.DetailResourcePoolData.Detail_create_name = val.row.create_name;
                    this.DetailResourcePoolData.Detail_create_time = val.row.create_time;
                    this.DetailResourcePoolData.Detail_modify_name = val.row.modify_name;
                    this.DetailResourcePoolData.Detail_modify_time = val.row.modify_time;
                    this.DetailResourcePoolDialogVisible=true;
                } else if (val.methods === "showEditDialog") {
                    this.EditResourcePoolData.uuid = val.row.id;
                    this.EditResourcePoolData.Edit_is_system = val.row.is_system;
                    this.EditResourcePoolData.Edit_resources_type_id = val.row.resources_model;
                    this.EditResourcePoolData.Edit_resources_name = val.row.resources_name;
                    this.EditResourcePoolData.Edit_project_name = val.row.project_name;
                    this.EditResourcePoolData.Edit_projectModule_name = val.row.projectModule_name;
                    this.EditResourcePoolData.Edit_resources_content=JSON.parse(val.row.resources_content);
                    //编辑的时候，获取项目模块的值
                    this.getProjectModuleInfo(val.row.project_name);
                    this.EditResourcePoolDialogVisible=true;
                }else if (val.methods === "deleteFunction") {
                    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        .then(() => {
                            DeleteResourcesInfo({
                                uuid: val.row.id
                            }).then(response => {
                                if (response.status === 200 && response.data.code === 66666) {
                                    this.getResourcesInfo();
                                    this.$message({
                                        type: "success",
                                        message: response.data.message
                                    });
                                } else {
                                    this.$message({
                                        type: "warning",
                                        message: response.data.message
                                    });
                                }
                            });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除"
                            });
                        });
                }
            },
        }
    };
</script>

<style scoped></style>
