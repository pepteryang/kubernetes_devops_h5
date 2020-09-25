<template>
    <div>
        <div>
            <el-dialog
                :visible.sync="AddMenuDialogVisible"
                @close="closeDialog('AddMenuForm')"
            >
                <el-form
                    :model="AddMenuForm"
                    :rules="AddMenuForm.MenuRules"
                    ref="AddMenuForm"
                    label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item
                        label="菜单名称："
                        prop="titleName">
                        <el-input
                            placeholder="请输入菜单名称"
                            v-model="AddMenuForm.titleName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="菜单索引："
                        prop="pathName">
                        <el-input
                            placeholder="请输入索引"
                            v-model="AddMenuForm.pathName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="菜单图标："
                        prop="iconName">
                        <el-input
                            placeholder="请输入ICON"
                            v-model="AddMenuForm.iconName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="菜单排序："
                        prop="OrderNumber">
                        <el-input
                            placeholder="请输入菜单序列号"
                            v-model="AddMenuForm.OrderNumber"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="父菜单栏："
                        prop="parentMenu">
                        <el-select
                            filterable
                            lass="input-width"
                            placeholder="请选择父菜单"
                            v-model="AddMenuForm.parentMenu"
                            value-key="name">
                            <el-option
                                :key="item.id"
                                :lable="item.label"
                                :value="item.label"
                                v-for="item in menuList">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="postMenuList('AddMenuForm')" type="">添加菜单</el-button>
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
        <div>
            <el-dialog :visible.sync="PatchMenuDialogVisible" title="修改资源">
                <el-form
                    :model="patchMenuData"
                    :rules="patchMenuData.PatchMenuFormRules"
                    @close="closeDialog('patchMenuForm')"
                    ref="patchMenuForm"
                >
                    <el-form-item prop="newTitleName">
                        <el-input
                            placeholder="请输入菜单名称"
                            v-model="patchMenuData.newTitleName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="newPathName">
                        <el-input
                            placeholder="请输入索引"
                            v-model="patchMenuData.newPathName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="newIconName">
                        <el-input
                            placeholder="请输入ICON"
                            v-model="patchMenuData.newIconName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="newOrderNumber">
                        <el-input
                            placeholder="请输入菜单排序"
                            v-model="patchMenuData.newOrderNumber"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="newParentMenu">
                        <!--判断newParentMenu是否为空，v-if的使用。为空为一级菜单，屏蔽下拉框-->
                        <el-select
                            lass="input-width"
                            placeholder="请选择父菜单"
                            v-if="patchMenuData.newParentMenu"
                            v-model="patchMenuData.newParentMenu"
                            value-key="name"
                        >
                            <el-option
                                :key="item.id"
                                :lable="item.label"
                                :value="item.label"
                                v-for="item in menuList"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="patchSystemMenuWeb('patchMenuForm')" style="align-items: center" >更新菜单</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import TableBox from "@/components/tableBox/";
    import {
        GetSystemMenuInfo,
        PostSystemMenuInfo,
        PatchSystemMenuInfo,
        DeleteSystemMenuInfo
        } from "@/api/menu";
    
    export default {
        name: "Menu",
        components: {
            "table-box": TableBox
        },
        data() {
            return {
                listLoading: true,
                AddMenuDialogVisible:false,
                PatchMenuDialogVisible:false,
                loading: false,
                //超链接行
                hyperlink: {
                    isShow: false
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
                tableList: [],
                tableColumns: [
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "label", //<String>  对应属性名
                        label: "菜单名称", //<String>   表头标签
                        align: "",
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "parent_name", //<String>  对应属性名
                        label: "父菜单栏", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "path", //<String>  对应属性名
                        label: "菜单索引", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "order_number", //<String>  对应属性名
                        label: "菜单排序", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "icon", //<String>  对应属性名
                        label: "菜单图标", //<String>   表头标签
                    },
                    {
                        hasSort: true, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "create_time", //<String>  对应属性名
                        label: "创建时间", //<String>   表头标签
                    }
                ],
                AddMenuForm: {
                    titleName: "",
                    parentMenu: "",
                    iconName: "",
                    pathName: "",
                    OrderNumber:"",
                    MenuRules: {
                        titleName: [
                            {type: "string", required: true, message: "请输入按钮名称"}
                        ],
                        iconName: [
                            {type: "string", required: true, message: "请输入图标名称"}
                        ],
                        pathName: [
                            {type: "string", required: true, message: "请输入索引名称"}
                        ],
                        OrderNumber: [
                            {type: "string", required: true, message: "菜单排序号"}
                        ]
                    },
                },
                menuList: "",
                patchMenuData: {
                    uuid: "",
                    newTitleName: "",
                    newParentMenu: "",
                    newIconName: "",
                    newPathName: "",
                    newOrderNumber:"",
                    PatchMenuFormRules: {
                        newTitleName: [
                            {type: "string", required: true, message: "请输入按钮名称"}
                        ],
                        newIconName: [
                            {type: "string", required: true, message: "请输入图标名称"}
                        ],
                        newIndexName: [
                            {type: "string", required: true, message: "请输入索引名称"}
                        ],
                        newOrderNumber: [
                            {type: "string", required: true, message: "请输入菜单排序号"}
                        ]
                    }
                },
                paginationInfo: {
                    total: 0,
                    pages_size: 1,
                    limit: 10
                }
            };
        },
        created() {
            this.getSystemMenuInfo();
            this.getMenuList()
        },
        methods: {
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },
            //系统菜单接口
            getMenuList() {
                GetSystemMenuInfo().then(response => {
                    if (response.status === 200) {
                        this.menuList = response.data.data;
                    }
                });
            },
            //获取菜单接口
            getSystemMenuInfo() {
                GetSystemMenuInfo({
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
            postMenuList(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PostSystemMenuInfo({
                            path: this.AddMenuForm.pathName,
                            label: this.AddMenuForm.titleName,
                            icon: this.AddMenuForm.iconName,
                            parent_name: this.AddMenuForm.parentMenu,
                            order_number:this.AddMenuForm.OrderNumber
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.AddMenuDialogVisible = false;
                                this.getSystemMenuInfo();
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
            patchSystemMenuWeb(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PatchSystemMenuInfo({
                            uuid: this.patchMenuData.newId,
                            path: this.patchMenuData.newPathName,
                            label: this.patchMenuData.newTitleName,
                            icon: this.patchMenuData.newIconName,
                            parent_name: this.patchMenuData.newParentMenu,
                            order_number: this.patchMenuData.newOrderNumber
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.getSystemMenuInfo();
                                this.PatchMenuDialogVisible = false;
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
                this.getSystemMenuInfo();
            },
            //分页数据
            handleCurrentChange(page) {
                this.listQuery.page = page;
                this.getSystemMenuInfo();
            },
            //控制新增弹窗
            handleAddButton() {
                this.AddMenuDialogVisible = true;
            },
            //操作按钮控制方法
            handleButton(val) {
                if (val.methods === "showEditDialog") {
                    this.patchMenuData.newId = val.row.id;
                    this.patchMenuData.newTitleName = val.row.label;
                    this.patchMenuData.newParentMenu = val.row.parent_name;
                    this.patchMenuData.newIconName = val.row.icon;
                    this.patchMenuData.newPathName = val.row.path;
                    this.patchMenuData.newOrderNumber = val.row.order_number;
                    this.PatchMenuDialogVisible = true;
                } else if (val.methods === "deleteFunction") {
                    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        .then(() => {
                            DeleteSystemMenuInfo({
                                uuid: val.row.id
                            }).then(response => {
                                if (response.status === 200 && response.data.code === 66666) {
                                    this.getSystemMenuInfo();
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
