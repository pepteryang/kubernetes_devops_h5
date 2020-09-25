<template>
    <div>
        <div>
            <el-dialog
                :visible.sync="AddProjectModuleDialog"
                @close="closeDialog('ProjectModuleDataForm')">
                <el-form
                    :model="AddProjectModuleDataForm"
                    :rules="AddProjectModuleDataForm.formRules"
                    ref="ProjectModuleDataForm">
                    <el-form-item
                        label-width="100px"
                        label="模块名称："
                        prop="projectModule_name">
                        <el-input
                            placeholder="请输入项目模块名称"
                            v-model="AddProjectModuleDataForm.projectModule_name"></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="所属项目："
                        prop="project_name">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="请选择所属项目"
                            v-model="AddProjectModuleDataForm.project_name"
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
                    <el-form-item>
                        <el-button
                            @click="addProjectModuleDataFun('ProjectModuleDataForm')"
                            class="el-button--primary"
                        >添加项目模块
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :visible.sync="EditProjectModuleDialog"
                @close="closeDialog('UpdateProjectModuleDataForm')">
                <el-form
                    :model="UpdateProjectModuleDataForm"
                    :rules="UpdateProjectModuleDataForm.UpdateFormRules"
                    ref="UpdateProjectModuleDataForm">
                    <el-form-item
                        label-width="100px"
                        label="模块名称："
                        prop="new_project_name">
                        <el-input
                            placeholder="请输入项目模块名称"
                            v-model="UpdateProjectModuleDataForm.new_projectModule_name"></el-input>
                    </el-form-item>
                    <el-form-item
                        label-width="100px"
                        label="所属项目："
                        prop="project_name">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="请选择所属项目"
                            v-model="UpdateProjectModuleDataForm.new_project_name"
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
                    <el-form-item>
                        <el-button
                            @click="patchProjectModuleDataFun('UpdateProjectModuleDataForm')"
                            class="el-button--primary">更新模块</el-button>
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
    import TableBox from "@/components/tableBox/";
    import {dateFormat} from "@/utils/datetime";
    import {
        GetProjectModuleInfo,
        PostProjectModuleInfo,
        PatchProjectModuleInfo,
        DeleteProjectModuleInfo,
        GetProjectInfo
    } from "@/api/assets";
    
    export default {
        name: "ProjectModule",
        components: {
            "table-box": TableBox
        },
        data() {
            return {
                EditProjectModuleDialog:false,
                AddProjectModuleDialog:false,
                loading: true,
                //超链接行
                hyperlink: {
                    isShow: false
                },
                //多次需要用的这个值，一个函数转换
                project_id:"",
                searchAndExportForm: {
                    search_keys: ""
                },
                operation: {
                    width: 150,
                    buttons: [
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
                        }
                    ]
                },
                listQuery: {
                    total: 0,
                    pageSize: 10,
                    page: 1,
                    size: 10
                },
                projectList:"",
                tableList: [],
                tableColumns: [
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "name", //<String>  对应属性名
                        align: "center",
                        label: "项目模块名称", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "project_name", //<String>  对应属性名
                        align: "center",
                        label: "项目名称", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "create_time", //<String>  对应属性名
                        label: "创建时间", //<String>   表头标签
                        align: "center",
                        formatter: dateFormat
                    }
                ],
                AddProjectModuleDataForm: {
                    projectModule_name: "",
                    project_name: "",
                    formRules: {
                        projectModule_name: [
                            {type: "string", required: true, message: "项目模块名称"}
                        ],
                        project_name: [
                            {type: "string", required: true, message: "请选择项目模"}
                        ],
                    }
                },
                UpdateProjectModuleDataForm: {
                    new_uuid: "",
                    new_project_name: "",
                    new_projectModule_name: "",
                    UpdateFormRules: {
                        new_project_name: [
                            {type: "string", required: true, message: "请输入新的项目模块名称"}
                        ],
                        new_projectModule_name: [
                            {type: "string", required: true, message: "请选择你的项目模块编码"}
                        ],
                    }
                }
            }
        },
        created() {
            this.getProjectModuleInfo();
            this.getProjectInfo();
        },
        methods: {
            //form关闭操作
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },
            //获取项目数据列表
            getProjectInfo() {
                GetProjectInfo().then(response => {
                    if (response.status === 200) {
                        //在赋值前清空列表
                        this.projectList = response.data.data;
                    } else {
                        //
                    }
                });
            },
            //获取项目模块数据列表
            getProjectModuleInfo() {
                GetProjectModuleInfo({
                    page: this.listQuery.page,
                    page_size: this.listQuery.pageSize
                }).then(response => {
                    if (response.status === 200) {
                        //在赋值前清空列表
                        this.tableList = response.data.results;
                        this.listQuery.total = response.data.count;
                        this.listQuery.currentPage = response.data.next;
                        this.loading = false;
                    } else {
                        //
                    }
                });
            },
            //获取projectID
            getProjectIdFun(val){
                this.projectList.forEach((v) => {
                    if(val === v.name){
                        this.project_id = v.id
                    }
                })
            },
            //添加数据
            addProjectModuleDataFun(formName) {
                this.getProjectIdFun(this.AddProjectModuleDataForm.project_name)
                console.log(this.project_id)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PostProjectModuleInfo({
                            name: this.AddProjectModuleDataForm.projectModule_name,
                            project_id: this.project_id,
                            project_name:this.AddProjectModuleDataForm.project_name
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.AddProjectModuleDialog = false;
                                this.getProjectModuleInfo();
                                this.$message({
                                    type: "success",
                                    message: response.data.message
                                });
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: response.data.message
                                });
                                this.$refs[formName].resetFields();
                            }
                        });
                    }
                });
            },
            //添加数据
            patchProjectModuleDataFun(formName) {
                this.getProjectIdFun(this.UpdateProjectModuleDataForm.new_project_name)
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PatchProjectModuleInfo({
                            uuid : this.UpdateProjectModuleDataForm.new_uuid,
                            name: this.UpdateProjectModuleDataForm.new_projectModule_name,
                            project_name: this.UpdateProjectModuleDataForm.new_project_name,
                            project_id : this.project_id
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.EditProjectModuleDialog= false;
                                this.getProjectModuleInfo();
                                this.$message({
                                    type: "success",
                                    message: response.data.message
                                });
                            } else {
                                this.$message({
                                    type: "warning",
                                    message: response.data.message
                                });
                                this.$refs[formName].resetFields();
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
                this.getProjectModuleInfo();
            },
            //分页数据
            handleCurrentChange(page) {
                this.listQuery.page = page;
                this.getProjectModuleInfo();
            },
            //禁用和删除按钮控制方法
            handleButton(val) {
                if (val.methods === "showEditDialog") {
                    this.EditProjectModuleDialog = true;
                    this.UpdateProjectModuleDataForm.new_uuid = val.row.id;
                    this.UpdateProjectModuleDataForm.new_projectModule_name = val.row.name;
                    this.UpdateProjectModuleDataForm.new_project_name = val.row.project_name;
                } else if (val.methods === "deleteFunction") {
                    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        .then(() => {
                            DeleteProjectModuleInfo({
                                uuid: val.row.id
                            }).then(response => {
                                if (response.status === 200 && response.data.code === 66666) {
                                    this.getProjectModuleInfo();
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
            //控制新增弹窗
            handleAddButton() {
                this.AddProjectModuleDialog = true;
            },
        }
    };
</script>

<style scoped></style>
