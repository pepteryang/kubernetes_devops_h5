<template>
    <div>
        <div>
            <el-dialog
                :visible.sync="DetailCategoriesDialogVisible"
                @close="closeDialog('DetailCategoriesForm')">
                <el-form
                    :model="DetailCategoriesData"
                    ref="DetailCategoriesForm"
                >
                    <el-form-item
                        prop="Detail_resources_name">
                        <el-input
                            disabled
                            v-model="DetailCategoriesData.Detail_resources_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <json-editor
                            ref="DetailJsonEditor"
                            v-model="DetailCategoriesData.Detail_resources_templates_value"></json-editor>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :visible.sync="EditCategoriesDialogVisible"
                :rules="EditCategoriesData.EditRules"
                @close="closeDialog('EditCategoriesForm')">
                <el-form
                    :model="EditCategoriesData"
                    ref="EditCategoriesForm"
                >
                    <el-form-item
                        prop="new_resources_name">
                        <el-input
                            v-model="EditCategoriesData.Edit_resources_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <json-editor ref="EditJsonEditor" v-model="EditCategoriesData.Edit_resources_templates_value"></json-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="patchResourcesCategoriesInfo('EditCategoriesForm')" type="primary">创建资源
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :visible.sync="AddCategoriesDialogVisible"
                @close="closeDialog('AddCategoriesForm')">
                <el-form
                    :model="AddCategoriesData"
                    :rules="AddCategoriesData.formRules"
                    ref="AddCategoriesForm"
                >
                    <el-form-item
                        prop="resources_name">
                        <el-input
                            placeholder="请输入资源名称"
                            v-model="AddCategoriesData.resources_name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <json-editor ref="AddJsonEditor"
                                     v-model="AddCategoriesData.resources_templates_value"></json-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="postResourcesCategoriesInfo('AddCategoriesForm')" type="primary">创建资源
                        </el-button>
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
    import {dateFormat} from "@/utils/datetime";
    import TableBox from "@/components/tableBox/";
    import JsonEditor from "@/components/JsonEditor/";
    import {
        DeleteResourcesCategoriesInfo,
        GetResourcesCategoriesInfo,
        PatchResourcesCategoriesInfo,
        PostResourcesCategoriesInfo,
    } from "@/api/kubernetes";
    
    export default {
        name: "SystemService",
        components: {
            "json-editor": JsonEditor,
            "table-box": TableBox
        },
        data() {
            return {
                loading: false,
                DetailCategoriesDialogVisible:false,
                AddCategoriesDialogVisible:false,
                EditCategoriesDialogVisible: false,
                resourcesModelList:[
                    {
                        value:"1",
                        label:"系统服务"
                    },
                    {
                        value:"0",
                        label:"非系统服务"
                    }
                ],
                //超链接行
                hyperlink: {
                    isShow: false
                },
                tableList: [],
                tableColumns: [
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "resources_name", //<String>  对应属性名
                        label: "资源名称", //<String>   表头标签
                        align: ""
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "create_name", //<String>  对应属性名
                        label: "创建人", //<String>   表头标签
                        align: ""
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
                DetailCategoriesData:{
                    Detail_resources_name: "",
                    Detail_resources_templates_value: "",
                },
                AddCategoriesData: {
                    resources_name: "",
                    resources_templates_value: "",
                    formRules: {
                        resources_name: [
                            {type: "string", required: true, message: "请输入资源类型"}
                        ],
                    },
                },
                EditCategoriesData: {
                    uuid :"",
                    Edit_resources_name:"",
                    Edit_resources_templates_value:"",
                    EditRules: {
                        Edit_resources_name: [
                            {type: "string", required: true, message: "请输入资源类型"}
                        ],
                    },
                },
                selectedData: []
            };
        },
        created() {
            this.getResourcesCategoriesInfo();
        },
        methods: {
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },
            
            //获取菜单接口
            getResourcesCategoriesInfo() {
                GetResourcesCategoriesInfo({
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
            //新建菜单接口
            postResourcesCategoriesInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PostResourcesCategoriesInfo({
                            resources_name: this.AddCategoriesData.resources_name,
                            resources_templates: JSON.stringify(
                                JSON.parse(this.AddCategoriesData.resources_templates_value)),
                            create_name: localStorage.getItem('username'),
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.AddCategoriesDialogVisible = false;
                                this.getResourcesCategoriesInfo();
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
            patchResourcesCategoriesInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PatchResourcesCategoriesInfo({
                            uuid: this.EditCategoriesData.uuid,
                            resources_name: this.EditCategoriesData.new_resources_name,
                            resources_templates: JSON.stringify(
                                JSON.parse(this.EditCategoriesData.new_resources_templates_value)),
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.getResourcesCategoriesInfo();
                                this.EditCategoriesDialogVisible = false;
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
                this.getResourcesCategoriesInfo();
            },
            //分页数据
            handleCurrentChange(page) {
                this.listQuery.page = page;
                this.getResourcesCategoriesInfo();
            },
            //控制新增弹窗
            handleAddButton() {
                this.AddCategoriesDialogVisible = true;
            },
            //操作按钮控制方法
            handleButton(val) {
                if (val.methods === "showDetailsDialog") {
                    this.DetailCategoriesData.Detail_resources_name = val.row.resources_name;
                    this.DetailCategoriesData.Detail_resources_templates_value=JSON.parse(val.row.resources_templates);
                    this.DetailCategoriesDialogVisible=true;
                } else if (val.methods === "showEditDialog") {
                    this.EditCategoriesData.uuid = val.row.id;
                    this.EditCategoriesData.Edit_resources_name = val.row.resources_name;
                    this.EditCategoriesData.Edit_resources_templates_value=JSON.parse(val.row.resources_templates);
                    this.EditCategoriesDialogVisible=true;
                }else if (val.methods === "deleteFunction") {
                    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        .then(() => {
                            DeleteResourcesCategoriesInfo({
                                uuid: val.row.id
                            }).then(response => {
                                if (response.status === 200 && response.data.code === 66666) {
                                    this.getResourcesCategoriesInfo();
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
