<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" :model="fromData">
                    <el-form-item>
                        <el-select
                            @change="selectHarborListId"
                            filterable
                            lass="input-width"
                            placeholder="请选择Harbor"
                            v-model="fromData.harborName"
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
                    <el-form-item prop="harborProject">
                        <el-select
                            @change="selectHarborProjectDetail"
                            filterable
                            lass="input-width"
                            placeholder="请选择ProjectName"
                            v-model="fromData.harborProject"
                            value-key="project_name"
                        >
                            <el-option
                                :key="item.project_id"
                                :lable="item.project_id"
                                :value="item.project_name"
                                v-for="item in harborProjectList"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="projectDetail">
                        <el-select
                            @change="selectHarborRepoTagName"
                            filterable
                            lass="input-width"
                            placeholder="请选择HarborTagName"
                            v-model="fromData.repoTagName"
                            value-key="name"
                        >
                            <el-option
                                :key="item.id"
                                :lable="item.repo_name"
                                :value="item.repo_name"
                                v-for="item in harborProjectDetail"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <el-table
                    :data="harborRepoList"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    style="width: 100%"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column
                        align="center"
                        fixed
                        label="序号"
                        type="index"
                        width="55"
                    ></el-table-column>
                    <el-table-column fixed label="项目名称" prop="repo_name">
                        <template slot-scope="scope">
                            <span style="display:block">{{ scope.row.repo_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="镜像名称" prop="tag_name">
                        <template slot-scope="scope">
                            <span style="display:block">{{ scope.row.tag_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="镜像大小" prop="tag_size">
                        <template slot-scope="scope">
                            <span style="display:block">{{ scope.row.tag_size }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :formatter="dateFormat"
                        label="创建时间"
                        prop="create_time"
                        show-overflow-tooltip
                        sortable
                    >
                    </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-row>
                                <el-col :span="15">
                                    <el-button
                                        @click="handleDelete(scope.$index, scope.row)"
                                        type="danger"
                                    >删除镜像
                                    </el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                <!--删除确认弹框-->
                <el-dialog
                    :visible.sync="dialogData.dialogDeleteVisible"
                    title="删除镜像"
                >
                    <h1>
                        <span style="color: red"><strong>确定删除？！</strong></span>
                    </h1>
                    <el-form>
                        <el-form-item label="当前行数据">
                            <el-col :span="18">
                                <el-input
                                    readonly
                                    v-model="rowsData.deleteThisData.tag_name"
                                ></el-input>
                            </el-col>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer" slot="footer">
                        <el-button @click="handleCancel">取 消</el-button>
                        <el-button @click="selectDelHarborRepoTag()">确 定</el-button>
                    </div>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {
        delHarborRepoTag,
        GetHarborList,
        getHarborProjectDetail,
        getHarborRepoInfo,
        getHarborProjectList
    } from "../../api/harbor";
    import moment from "moment";
    
    export default {
        name: "harborInfo.vue",
        data() {
            return {
                //弹框属性设置
                modifyForm: {
                    formLabelWidth: "100px",
                    mimian: "",
                    mimu: ""
                },
                //数据表单
                fromData: {
                    harborName: "",
                    harborProject: "",
                    projectDetail: "",
                    repoTagName: ""
                },
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
                    pageSize: 5, //    每页的数据
                    currentPageA: 1,
                    midiLength: "",
                    list: [], //后台数据长度
                    requestResult: true
                }
            };
        },
        created() {
            this.harbor_list();
        },
        mounted: function () {
            // this.harborList=JSON.parse(sessionStorage.getItem("harborList"))
        },
        
        computed: {
            //引用State中harborList的值
            ...mapGetters([
                "harborList",
                "harborProjectList",
                "selectHarborId",
                "harborProjectDetail",
                "harborRepoList"
            ])
        },
        methods: {
            ...mapActions(["getHarborList"]),
            harbor_list() {
                GetHarborList({
                    type: "Harbor"
                }).then(response => {
                    //打印访问状态
                    if (response.status === 200) {
                        //将HarborList存入Vuex
                        this.$store.commit("UPDATE_HARBOR_LIST", response.data.data);
                    }
                });
            },
            selectHarborListId(val) {
                this.harborList.forEach((v) => {
                    if (val === v.name) {
                        this.$store.commit("UPDATE_SELECT_HARBOR_ID", v.id);
                        getHarborProjectList({
                            pk: v.id
                        }).then(response => {
                            if (response.status === 200) {
                                this.$store.commit("UPDATE_HARBOR_PROJECT_LIST", response.data);
                            }
                        });
                    }
                });
            },
            selectHarborProjectDetail(val) {
                this.harborProjectList.forEach((v) => {
                    if (val === v.project_name) {
                        getHarborProjectDetail({
                            pk: this.selectHarborId,
                            project_id: v.project_id
                        }).then(response => {
                            if (response.status === 200) {
                                // console.log(response.data);
                                this.$store.commit("UPDATE_HARBOR_PROJECT_Detail", response.data);
                            }
                        });
                    }
                });
            },
            selectHarborRepoTagName(val) {
                this.harborProjectDetail.forEach((v) => {
                    if (val === v.repo_name) {
                        getHarborRepoInfo({
                            pk: this.selectHarborId,
                            repo_name: v.repo_name
                        }).then(response => {
                            if (response.status == 200) {
                                this.$store.commit("UPDATE_HARBOR_REPO_LIST", response.data);
                                // console.log(sessionStorage.getItem('harborProjectDetail'))
                            }
                        });
                    }
                });
            },
            selectDelHarborRepoTag() {
                this.rowsData.deleteThisData.forEach((v) => {
                    delHarborRepoTag({
                        pk: v.pk,
                        repo_name: v.repo_name,
                        tag_name: v.tag_name
                    }).then(response => {
                        if (response.status === 200) {
                            // console.log(response.data);
                        }
                    });
                });
                this.dialogData.dialogDeleteVisible = false;
                this.rowsData.deleteThisData = []; //重置删除的内容
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
            handleSizeChange(size) {
                this.paginationQueryForm.pagesize = size;
                // console.log(this.paginationQueryForm.pagesize); //每页下拉显示数据
            },
            handleCurrentChange(currentPage) {
                this.paginationQueryForm.currentPage = currentPage;
                // console.log(this.paginationQueryForm.currentPage); //点击第几页
            }
        }
    };
</script>

<style scoped></style>
