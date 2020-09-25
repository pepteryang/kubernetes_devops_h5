<template>
    <div>
        <div>
            <el-form :inline="true" :model="JenkinsFormData">
                <el-form-item>
                    <el-select
                        @change="getJenkinsAllJobsList"
                        filterable
                        lass="input-width"
                        placeholder="请选择Jenkins"
                        v-model="JenkinsFormData.JenkinsName"
                        value-key="name"
                    >
                        <el-option
                            :key="item.id"
                            :lable="item.name"
                            :value="item.name"
                            v-for="item in jenkinsList"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select
                        @change="getJenkinsAllJobsList"
                        filterable
                        lass="input-width"
                        placeholder="请选择Jenkins视图"
                        v-model="jenkinsViewsData.viewName"
                        value-key="name"
                    >
                        <el-option
                            :key="item.id"
                            :lable="item.name"
                            :value="item.name"
                            v-for="item in jenkinsViewsList"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-table
                :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                style="width: 100%"
            >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    align="center"
                    label="序号"
                    type="index"
                    width="55"
                ></el-table-column>
                <el-table-column  label="项目名称" prop="fullname">
                    <template slot-scope="scope">
                        <span style="display:block">{{ scope.row.fullname }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="颜色" prop="color">
                    <template slot-scope="scope">
                        <span style="display:block">{{ scope.row.color }}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" prop="color">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="getJenkinsBuildJob(scope.index, scope.row)">构建</el-button>
                        <el-button size="small" type="info" @click="getJenkinsBuildConsoleOutput(scope.index, scope.row)">日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :current-page="currentPage"
                :total="tableList.length"
                :page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
        <div>
            <el-dialog
                :visible.sync="logDialogVisibleViews"
            >
                <el-card>
                    <div v-for="item in this.logs_data.slice(-50)" >
                        {{item}}
                    </div>
                </el-card>
            </el-dialog>
        </div>
    </div>
    
</template>

<script>
    import {
        GetJenkinsList,
        GetJenkinsAllJobsList,
        GetJenkinsAllViews,
        GetJenkinsJobInfo,
        GetJenkinsBuildJob,
        GetJenkinsBuildInfo,
        GetJenkinsBuildConsoleOutput,
    } from "../../api/jenkins";
    import moment from "moment";
    
    export default {
        name: "harborInfo.vue",
        data() {
            return {
                logDialogVisibleViews:false,
                jenkinsViewsList:[],
                tableList:[],
                currentPage: 1, //  el-pagination 初始页
                pageSize: 10, //  el-pagination 每页的数据
                jenkinsList:"",
                //数据表单
                JenkinsFormData: {
                    JenkinsName: "",
                    JenkinsId:"",
                },
                jenkinsViewsData:{
                    viewName:"",
                },
                //存放临时数据
                logs_data:[],
                //弹出框变量
                dialogData: {
                    dialogDeleteVisible: false,
                    dialogVisible: false
                },
                rowsData: {
                    thisRowData: {},
                    deleteThisData: [],
                    multipleSelection: []
                },
                //分页配置
                paginationQueryForm: {
                    currentRow: null,
                    visibleA: false,
                    currentPage: 1, //初始页
                    currentPageA: 1,
                    midiLength: "",
                    list: [], //后台数据长度
                    requestResult: true
                }
            };
        },
        created() {
            this.getJenkinsList();
        },
        mounted: function () {
        },
        
        computed: {
        
        },
        methods: {
            getJenkinsList() {
                GetJenkinsList({
                    type: "Jenkins"
                }).then(response => {
                    //打印访问状态
                    if (response.status === 200 && response.data.code === 66666) {
                        this.jenkinsList=response.data.data
                    }
                });
            },
            getJenkinsAllJobsList(val) {
                this.jenkinsList.forEach((v) => {
                    if (val === v.name) {
                        this.JenkinsFormData.JenkinsId = v.id
                        GetJenkinsAllJobsList({
                            pk: v.id
                        }).then(response => {
                            if (response.status === 200) {
                                this.tableList = response.data;
                                console.log(response.data)
                                this.getJenkinsAllViews()
                            }
                        });
                    }
                });
            },
            getJenkinsAllViews() {
                GetJenkinsAllViews({
                    pk: this.JenkinsFormData.JenkinsId
                }).then(response => {
                    if (response.status === 200) {
                        this.jenkinsViewsList = response.data
                    }
                });
            },
            getJenkinsJobInfo(index, row) {
                GetJenkinsJobInfo({
                    job_name: row.name,
                    pk:this.JenkinsFormData.JenkinsId
                }).then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                    }
                });
            },
            getJenkinsBuildJob(index, row) {
                GetJenkinsBuildJob({
                    job_name: row.name,
                    pk:this.JenkinsFormData.JenkinsId
                }).then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                    }
                });
            },
            getJenkinsBuildInfo(index, row) {
                GetJenkinsBuildInfo({
                    job_name: row.name,
                    pk:this.JenkinsFormData.JenkinsId
                }).then(response => {
                    if (response.status === 200) {
                        console.log(response.data)
                    }
                });
            },
            getJenkinsBuildConsoleOutput(index, row) {
                GetJenkinsBuildConsoleOutput({
                    job_name: row.name,
                    pk:this.JenkinsFormData.JenkinsId
                }).then(response => {
                    if (response.status === 200) {
                        this.logDialogVisibleViews=true
                        this.logs_data = response.data
                    }
                });
            },
            handleCancel() {
                this.dialogData.dialogDeleteVisible = false;
                this.rowsData.deleteThisData = []; //重置删除的内容
            },
            handleDelete(index, row) {
                this.idx = index;
                this.msg = row; //选中的当前数据的记录
                if (this.rowsData.deleteThisData.length > 1) {
                    this.rowsData.deleteThisData = [];
                } else {
                    this.rowsData.deleteThisData.push({
                        tag_name: this.msg.tag_name,
                        repo_name: this.msg.repo_name,
                        pk: this.selectHarborId
                    }); //把单行删除的每条数据的id添加进放删除数据的数组
                }
                this.dialogData.dialogDeleteVisible = true;
            },
            handleSelectionChange(val) {
                this.rowsData.multipleSelection = val;
                // console.log(this.rowsData.multipleSelection);
            },
            dateFormat: function (row, column) {
                // console.log(row, column);
                const date = row[column.property];
                if (date === undefined) {
                    return "";
                }
                //这里的格式根据需求修改
                return moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            // size-change	pageSize 改变时会触发	每页条数size
            // current-change	currentPage 改变时会触发	当前页currentPage
            handleSizeChange: function(size) {
                this.pagesize = size
                console.log(this.pagesize) // 每页下拉显示数据
            },
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage
                console.log(this.currentPage) // 点击第几页
            }
        }
    };
</script>

<style scoped>
</style>
