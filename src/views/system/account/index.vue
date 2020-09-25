<template>
    <div>
        <div>
            <el-dialog
                @close="closeDialog('addUserForm')"
                :visible.sync="AddUserDialogVisible"
                title="添加用户">
                <!-- 添加用户的表单 -->
                <el-form
                    :model="addUserForm"
                    :rules="addUserForm.rules"
                    class="demo-ruleForm"
                    label-width="20px"
                    ref="addUserForm">
                    <el-form-item prop="username">
                        <el-input
                            autocomplete="new-username"
                            placeholder="请输入用户名"
                            v-model="addUserForm.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="alias">
                        <el-input
                            placeholder="请输入你的姓名"
                            v-model="addUserForm.alias"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            autocomplete="new-password"
                            placeholder="请输入密码"
                            type="password"
                            v-model="addUserForm.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="isAdmin">
                        <el-select
                            placeholder="请选择是否是超级管理员"
                            v-model="addUserForm.isAdmin">
                            <el-option abel="True" value="超级管理员"></el-option>
                            <el-option abel="False" value="普通用户">普通用户</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input
                            placeholder="请输入你的邮箱地址"
                            v-model="addUserForm.email"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="mobile">
                        <el-input
                            placeholder="请输入你的手机号码"
                            v-model="addUserForm.mobile"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="postUserInfo('addUserForm')" type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog :visible.sync="UserDetailsDialogVisible" width="70%">
                <div>
                    <el-alert
                        :closable="false"
                        show-icon
                        title="用户信息详情"
                        type="success"
                    >
                    </el-alert>
                </div>
                <div>
                    <el-table :data="UserDetails" border>
                        <el-table-column width="200px" prop="baseName"></el-table-column>
                        <el-table-column
                            :show-overflow-tooltip="true"
                            prop="baseValue"
                        ></el-table-column>
                    </el-table>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-dialog :visible.sync="UserEditDialogVisible" title="用户详情">
                <el-form
                    :model="EditUserData"
                    :rules="EditUserData.formRules"
                    @close="closeDialog('EditUserForm')"
                    label-width="100px"
                    ref="EditUserForm">
                    <el-row>
                        <el-form-item label="登录名称:" prop="newUserName">
                            <el-input
                                disabled
                                placeholder="用户名"
                                v-model="EditUserData.newUserName"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="用户姓名:" prop="newUserAlias">
                            <el-input
                                placeholder="姓名"
                                v-model="EditUserData.newUserAlias"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="用户邮箱:" prop="newUserEmail">
                            <el-input
                                placeholder="邮箱"
                                v-model="EditUserData.newUserEmail"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="用户手机:" prop="newUserPhone">
                            <el-input
                                placeholder="手机"
                                v-model="EditUserData.newUserPhone"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="是否管理员:" prop="newUserIsAdmin">
                            <el-select v-model="EditUserData.newUserIsAdmin">
                                <el-option abel="True" value="超级管理员"></el-option>
                                <el-option abel="False" value="普通用户"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                @click="patchUserInfo('EditUserForm')" class="el-button--primary">修改资料
                            </el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
        <div>
            <el-dialog
                :visible.sync="ChangeUserPasswordDialog"
                title="修改密码">
                <el-form
                    :model="ChangeUserPasswordData"
                    :rules="ChangeUserPasswordData.formRules"
                    @close="closeDialog('changeUserPasswordForm')"
                    label-width="100px"
                    ref="changeUserPasswordForm">
                    <el-form-item
                        label="用户名："
                        prop="UserName">
                        <el-input
                            disabled="disabled"
                            v-model="ChangeUserPasswordData.UserName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="新的密码:"
                        prop="newUserPassword"
                        v-if="ChangeUserPasswordData.visible">
                        <el-input
                            auto-complete="new-password"
                            placeholder="请输入需要修改的密码"
                            type="password"
                            v-model="ChangeUserPasswordData.newUserPassword">
                            <i
                                @click="changePassShow('show')"
                                class="el-icon-view"
                                slot="suffix"
                                style="cursor: pointer"
                                title="显示密码"
                            >
                            </i>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="新的密码:" prop="newUserPassword" v-else>
                        <el-input
                            auto-complete="new-password"
                            placeholder="请输入需要修改的密码"
                            type="text"
                            v-model="ChangeUserPasswordData.newUserPassword"
                        >
                            <i
                                @click="changePassShow('hide')"
                                class="el-icon-circle-close"
                                slot="suffix"
                                style="cursor: pointer"
                                title="隐藏密码">
                            </i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            @click="changeUserPassword('changeUserPasswordForm')"
                            class="el-button--primary"
                        >提交密码
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
    import TableBox from "@/components/tableBox/";
    import {GetUserInfo, PatchUserInfo, PostUserInfo} from "@/api/user";
    import {dateFormat} from "@/utils/datetime";
    import {DeleteUserInfo} from "../../../api/user";
    
    export default {
        name: "UserManagement.vue",
        components: {
            "table-box": TableBox
        },
        data() {
            return {
                UserDetailsDialogVisible:false,
                UserEditDialogVisible: false,
                ChangeUserPasswordDialog: false,
                AddUserDialogVisible: false,
                loading: true,
                //超链接行
                hyperlink: {
                    isShow: false
                },
                //按钮栏的配置
                operation: {
                    width: 300,
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
                            label: "修改密码",
                            type: "warning",
                            methods: "ChangePasswordFunction",
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
                searchAndExportForm: {
                    search_keys: ""
                },
                addUserForm: {
                    username: "",
                    password: "",
                    email: "",
                    alias: "",
                    isAdmin: "普通用户",
                    rules: {
                        username: [
                            {required: true, message: "请输入用户名", trigger: "blur"},
                        ],
                        alias: [
                            {required: true, message: "请输入用户的姓名", trigger: "blur"},
                        ],
                        password: [
                            {required: true, message: "请输入符合要求的密码", trigger: "blur"},
                        ],
                        email: [
                            {required: true, message: "请输正确的邮箱地址", trigger: "blur"},
                        ],
                        mobile: [
                            {required: true, message: "请输正确的手机号码", trigger: "blur"},
                        ]
                    },
                },
                //用户详情
                UserDetails: [],
                //按钮的名称
                EditUserData: {
                    newUserName: "",
                    newUserAlias: "",
                    newUserEmail: "",
                    newUserPhone: "",
                    userID: "",
                    formRules: {
                        newUserName: [
                            {required: true, message: "请输入用户名", trigger: "blur"},
                        ],
                        newUserAlias: [
                            {required: true, message: "请输入用户的姓名", trigger: "blur"},
                        ],
                        newUserEmail: [
                            {required: true, message: "请输正确的邮箱地址", trigger: "blur"},
                        ],
                        newUserPhone: [
                            {required: true, message: "请输正确的手机号码", trigger: "blur"},
                        ]
                    }
                },
                ChangeUserPasswordData: {
                    UserName:"",
                    newUserPassword: "",
                    newUserPasswordAgain: "",
                    userID: "",
                    dialogVisible: false,
                    visible: true
                },
                tableList: [], // 数据源
                tableColumns: [
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "username", //<String>  对应属性名
                        label: "用户名", //<String>   表头标签
                        align: "",
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "alias", //<String>  对应属性名
                        label: "姓名", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "email", //<String>  对应属性名
                        label: "邮箱地址", //<String>   表头标签
                    },
                    {
                        hasSort: false, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "phone", //<String>  对应属性名
                        label: "电话号码", //<String>   表头标签
                    },
                    {
                        hasSort: true, //<Boolean> 是否排序
                        isShow: true, //<Boolean> 是否展示
                        prop: "create_time", //<String>  对应属性名
                        label: "创建时间", //<String>   表头标签
                        formatter: dateFormat
                    }
                ]
            };
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            //隐藏和显示密码
            changePassShow(value) {
                this.ChangeUserPasswordData.visible = !(value === "show");
            },
            //将form表单重置
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },
            getAdminValue(val) {
                if (val == "超级管理员") {
                    return "True";
                } else {
                    return "False";
                }
            },
            postUserInfo(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PostUserInfo({
                            username: this.addUserForm.username,
                            creator: localStorage.getItem('username'),
                            alias: this.addUserForm.alias,
                            password: this.addUserForm.password,
                            is_admin: this.getAdminValue(this.addUserForm.isAdmin),
                            phone: this.addUserForm.mobile,
                            email: this.addUserForm.email
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.AddUserDialogVisible = false;
                                this.getUserInfo();
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
            getUserInfo() {
                GetUserInfo({
                    page_size: this.listQuery.pageSize,
                    page: this.listQuery.page
                }).then(response => {
                    if (response.status === 200) {
                        this.tableList = response.data.results;
                        this.listQuery.total = response.data.count;
                        this.listQuery.currentPage = response.data.next;
                        this.loading = false
                    }
                });
            },
            //按钮控制方法
            handleButton(val) {
                if (val.methods === "showDetailsDialog") {
                    this.UserDetails = [
                        {
                            baseName: "用户ID：",
                            baseValue: val.row.id
                        },
                        {
                            baseName: "用户姓名：",
                            baseValue: val.row.alias
                        },
                        {
                            baseName: "用户登录名：",
                            baseValue: val.row.username
                        },
                        {
                            baseName: "用户邮箱：",
                            baseValue: val.row.email
                        },
                        {
                            baseName: "用户电话：",
                            baseValue: val.row.phone
                        },
                        {
                            baseName: "最后登录时间：",
                            baseValue: val.row.last_login
                        },
                        {
                            baseName: "创建时间：",
                            baseValue: val.row.create_time
                        },
                    ];
                    this.UserDetailsDialogVisible = true
                } else if (val.methods === "showEditDialog") {
                    this.EditUserData.newUserName = val.row.username;
                    this.EditUserData.newUserAlias = val.row.alias;
                    this.EditUserData.newUserEmail = val.row.email;
                    this.EditUserData.newUserPhone = val.row.phone;
                    this.EditUserData.userID = val.row.id;
                    if (val.row.is_admin === false) {
                        this.EditUserData.newUserIsAdmin = "普通用户";
                    } else {
                        this.EditUserData.newUserIsAdmin = "超级管理员";
                    }
                    this.UserEditDialogVisible = true
                }
                else if (val.methods ==="ChangePasswordFunction") {
                    this.ChangeUserPasswordData.UserName = val.row.username;
                    this.ChangeUserPasswordData.userID = val.row.id;
                    this.ChangeUserPasswordDialog = true
                }
                else if (val.methods === "deleteFunction") {
                    this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        })
                        .then(() => {
                            DeleteUserInfo({
                                uuid: val.row.id
                            }).then(response => {
                                if (response.status === 200 && response.data.code === 66666) {
                                    this.getUserInfo();
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
            patchUserInfo(formName) {
                let admin_value = "";
                if (this.EditUserData.newUserIsAdmin === "超级管理员") {
                    admin_value = true;
                } else {
                    admin_value = false;
                }
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PatchUserInfo({
                            uuid: this.EditUserData.userID,
                            alias: this.EditUserData.newUserAlias,
                            email: this.EditUserData.newUserEmail,
                            phone: this.EditUserData.newUserPhone,
                            is_admin: admin_value
                        }).then(response => {
                            if (response.status === 200 && response.data.code === 66666) {
                                this.$refs[formName].resetFields();
                                this.UserEditDialogVisible=false;
                                this.getUserInfo();
                            }
                        });
                    }
                });
            },
            //修改用户密码
            changeUserPassword(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        PatchUserInfo({
                            uuid: this.ChangeUserPasswordData.userID,
                            password: this.ChangeUserPasswordData.newUserPassword
                        }).then(response => {
                            if (response.status === 200) {
                                this.ChangeUserPasswordDialog = false;
                                this.this.$refs[formName].resetFields();
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
                this.$emit("handleSelectionChange", val);
            },
            //分页数据大小
            handleSizeChange(pages_size) {
                this.listQuery.pageSize = pages_size;
                this.getUserInfo();
            },
            //分页数据
            handleCurrentChange(page) {
                this.listQuery.page = page;
                this.getUserInfo();
            },
            //控制新增弹窗
            handleAddButton() {
                this.AddUserDialogVisible = true;
            },
        }
    };
</script>

<style scoped></style>
