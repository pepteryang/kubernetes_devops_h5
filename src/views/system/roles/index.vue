<template>
  <div>
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
                <el-button type="primary" @click="handleSearchFun"
                  >查询</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="handleExportFun"
                  >导出</el-button
                >
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
      <el-dialog
        :visible.sync="PatchRolesDialogVisible"
        @close="closeDialog('updateRolesForm')"
      >
        <el-form
          :model="updateRoles"
          :rules="updateRoles.formRules"
          ref="updateRolesForm"
        >
          <el-form-item prop="newRolesName">
            <el-input
              placeholder="请输入新的角色名称"
              v-model="updateRoles.newRolesName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="patchRolesInfo('updateRolesForm')"
              class="el-button--primary"
              >修改资料</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="AddRolesDialogVisible"
        @close="closeDialog('addRoleForm')"
      >
        <el-form :model="addRoleForm" ref="addRoleForm">
          <el-form-item prop="titleName">
            <el-input
              placeholder="请输入角色名称"
              v-model="addRoleForm.rolesName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="postRolesInfo('addRoleForm')"
              class="el-button--primary"
              >添加角色</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        :visible.sync="DetailsDialogVisible"
        @close="closeDialog('updateRoleData')"
        :modal-append-to-body="false"
      >
        <el-form :inline="true" :model="updateRoleData" ref="updateRoleData">
          <el-form-item>
            <el-select
              @change="getRoleMenuInfo()"
              filterable
              disabled
              lass="input-width"
              placeholder="请选择角色"
              v-model="updateRoleData.selectChangeFormRoleName"
              value-key="id"
            >
              <el-option
                :key="item.id"
                :lable="item.role_name"
                :value="item.role_name"
                v-for="item in rolesList"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="NavigationBarList.changButtonType">
            <el-button
              @click="patchRolesMenuInfo('')"
              class="el-button--primary"
              >保存</el-button
            >
          </el-form-item>
          <el-form-item v-else>
            <el-button @click="patchRolesMenuInfo" class="el-button--primary"
              >更新</el-button
            >
          </el-form-item>
        </el-form>
        <div>
          <el-tree
            :check-strictly="true"
            :data="NavigationBarList.SystemNavigationBarList"
            :default-checked-keys="NavigationBarList.roleMenuList"
            :props="NavigationBarList.defaultProps"
            :show-checkbox="true"
            default-expand-all
            ighlight-current
            node-key="id"
            ref="NavigationBarTree"
          >
          </el-tree>
        </div>
      </el-dialog>
    </div>
    <div>
      <!-- 就是隐藏dialog的时候要销毁这个dialog。
            度娘后发现给dialog加v-if，
            在关闭dialog的时候将v-if设置为false这样el-tree会直接将其从DOM结构中抹除，到此问题解决。-->
      <el-dialog
        :visible.sync="MemberRolesDialogVisible"
        @close="closeDialog('MemberRolesForm')"
        v-if="MemberRolesDialogVisible"
      >
        <!-- 系统角色配置管理-->
        <el-form
          :inline="true"
          :model="MemberRolesFormData"
          ref="MemberRolesForm"
        >
          <el-form-item>
            <el-select
              :default-first-option="true"
              @change="getRoleUserList()"
              collapse-tags
              filterable
              disabled=""
              lass="input-width"
              placeholder="请选择你要管理的角色："
              v-model="MemberRolesFormData.selectRoleName"
              value-key="id"
            >
              <el-option
                v-for="item in rolesList"
                :key="item.id"
                :lable="item.role_name"
                :value="item.role_name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!--使用allow-create属性即可通过在输入框中输入文字来创建新的条目。
                    注意此时filterable必须为真。本例还使用了default-first-option属性，
                      在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，
                      无需使用鼠标或键盘方向键进行定位。-->
            <el-select
              allow-create
              filterable
              lass="input-width"
              multiple
              placeholder="请选择你角色需要分配的用户："
              style="width:500px;height: auto"
              v-model="MemberRolesFormData.selectUsersName"
              value-key="id"
            >
              <el-option
                :key="item.id"
                :lable="item.username"
                :value="item.username"
                v-for="item in MemberRolesFormData.userList"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="MemberRolesFormData.changButtonType">
            <el-button
              @click="postRoleUserList('MemberRolesForm')"
              class="el-button--primary"
              >保存</el-button
            >
          </el-form-item>
          <el-form-item v-else>
            <el-button
              @click="postRoleUserList('MemberRolesForm')"
              class="el-button--primary"
              >更新</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TableBox from '@/components/tableBox/'
import { dateFormat } from '@/utils/datetime'
import { TreeSystemMenuList } from '@/api/menu'
import { GetUserInfo } from '@/api/user'
import { GetRolesInfo, PostRolesInfo, PatchRolesInfo } from '@/api/role'
import { GetRoleUserInfo, PostRoleUserInfo } from '@/api/roleuser'
import { GetRoleMenuInfo, PatchRolesMenuInfo } from '@/api/rolemenu'
import { DeleteRolesInfo } from '../../../api/role'
export default {
  name: 'Roles',
  components: {
    'table-box': TableBox
  },
  data() {
    return {
      //tables加载
      loading: true,
      //添加角色弹窗
      DetailsDialogVisible: false,
      AddRolesDialogVisible: false,
      PatchRolesDialogVisible: false,
      MemberRolesDialogVisible: false,
      //超链接行
      hyperlink: {
        isShow: false
      },
      operation: {
        width: 280,
        buttons: [
          {
            label: '详情',
            type: 'danger',
            methods: 'showDetailsDialog',
            size: 'mini'
          },
          {
            label: '编辑',
            type: 'primary',
            methods: 'showEditDialog',
            size: 'mini'
          },
          {
            label: '删除',
            type: 'danger',
            methods: 'deleteFunction',
            size: 'mini'
          },
          {
            label: '成员',
            type: 'warning',
            methods: 'MemberRolesFunction',
            size: 'mini'
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
        search_keys: ''
      },
      //用户下拉菜单
      userDataList: {
        userList: []
      },
      //表单数据
      addRoleForm: {
        rolesName: ''
      },
      // 数据源
      tableList: [],
      tableColumns: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'role_name', //<String>  对应属性名
          label: '角色名称', //<String>   表头标签
          align: ''
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: 'create_time', //<String>  对应属性名
          label: '创建时间', //<String>   表头标签
          formatter: dateFormat
        }
      ],
      //后台权限列表
      rolesList: [],
      //用户角色配置
      MemberRolesFormData: {
        //控制按钮显示
        changButtonType: true,
        selectUsersId: [],
        selectUsersName: [],
        selectRoleName: '',
        selectRoleId: '',
        userList: []
      },
      //加载系统导航条
      updateRoleData: {
        selectChangeFormRoleName: '',
        selectChangeFormId: ''
      },
      NavigationBarList: {
        SystemNavigationBarList: [],
        changButtonType: true,
        roleMenuList: [],
        defaultProps: {
          children: 'children',
          title: 'label'
        }
      },
      updateRoles: {
        newRolesName: '',
        uuid: '',
        formRules: {
          newRolesName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        }
      }
    }
  },
  created() {
    this.treeSystemMenuList()
    this.getRolesInfo()
    this.getRolesTableInfo()
    this.getUserInfo()
  },
  methods: {
    closeDialog(formName) {
      this.$refs[formName].resetFields()
    },
    //获取系统用户列表
    getUserInfo() {
      GetUserInfo().then(response => {
        if (response.status === 200) {
          this.MemberRolesFormData.userList = response.data.data
        }
      })
    },
    //获取角色列表
    getRolesInfo() {
      GetRolesInfo().then(response => {
        if (response.status === 200) {
          this.rolesList = response.data.data
        }
      })
    },
    //获取角色列表,用户tables数据
    getRolesTableInfo() {
      GetRolesInfo({
        page_size: this.listQuery.pageSize,
        page: this.listQuery.page
      }).then(response => {
        if (response.status === 200) {
          this.tableList = response.data.results
          this.listQuery.total = response.data.count
          this.listQuery.currentPage = response.data.next
          this.loading = false
        }
      })
    },
    //获取系统全部的菜单栏
    treeSystemMenuList() {
      TreeSystemMenuList().then(response => {
        this.NavigationBarList.SystemNavigationBarList = response.data.data
      })
    },
    //获取页面选择的角色的ID值
    getRoleIdByRoleName() {
      //首先val就是我取到的单个的值，可以输出看一下结果
      // console.log('val change', val)
      //这种情况是：我们能查找的是一个数组的情况下就要循环查找数据
      this.getRolesInfo()
      let val = this.rolesList
      val.forEach(item => {
        if (item.role_name === this.updateRoleData.selectChangeFormRoleName) {
          this.updateRoleData.selectChangeFormId = item.id
        }
      })
    },
    //拼接数据
    splicingId(data) {
      let ItemList = []
      data.forEach(item => {
        ItemList.push(item.id)
      })
      return ItemList
    },
    //通过角色ID获取角色的拥有的权限按钮
    //通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
    //(keys, leafOnly) 接收两个参数，
    // 1. 勾选节点的 key 的数组
    // 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false
    getRoleMenuInfo() {
      this.getRoleIdByRoleName()
      let uuid = this.updateRoleData.selectChangeFormId
      if (uuid) {
        GetRoleMenuInfo({
          uuid: this.updateRoleData.selectChangeFormId
        }).then(response => {
          if (response.status === 200 && response.data.code === 66666) {
            let data = response.data.data
            this.$refs.NavigationBarTree.setCheckedKeys(this.splicingId(data))
            this.NavigationBarList.changButtonType = false
            this.$message({
              type: 'success',
              message: response.data.message
            })
          } else {
            this.NavigationBarList.changButtonType = true
            this.$refs.NavigationBarTree.setCheckedKeys([])
            this.$message({
              type: 'warning',
              message: response.data.message
            })
          }
        })
      } else {
        this.$message({
          type: 'warning',
          message: '数据获取错误。'
        })
      }
    },
    //更新菜单权限
    patchRolesMenuInfo() {
      //上边的方法当获取单独的子节点时，不包括父节点
      // this.$refs.NavigationBarTree.getCheckedKeys()
      //获取子节点和父节点
      PatchRolesMenuInfo({
        role_id: this.updateRoleData.selectChangeFormId,
        menus_id: this.$refs.NavigationBarTree.getCheckedKeys().concat(
          this.$refs.NavigationBarTree.getHalfCheckedKeys()
        )
      }).then(response => {
        console.log(response.data)
        if (response.status === 200 && response.data.code === 66666) {
          this.$refs.NavigationBarTree.setCheckedKeys([])
          this.getRoleMenuInfo()
          ;(this.DetailsDialogVisible = false),
            this.$message({
              type: 'success',
              message: response.data.message
            })
        } else {
          this.$message({
            type: 'warning',
            message: response.data.message
          })
        }
      })
    },
    //拼接包含的用户名
    splicingUsername(data) {
      let ItemList = []
      data.forEach(item => {
        ItemList.push(item.username)
      })
      return ItemList
    },
    //通过用户查找ID
    getRoleIdByRoleNameForGetUsername() {
      //首先val就是我取到的单个的值，可以输出看一下结果
      // console.log('val change', val)
      //这种情况是：我们能查找的是一个数组的情况下就要循环查找数据
      this.getRolesInfo()
      let val = this.rolesList
      val.forEach(item => {
        if (item.role_name === this.MemberRolesFormData.selectRoleName) {
          this.MemberRolesFormData.selectRoleId = item.id
        }
      })
    },
    //通过用户名，查找用户ID
    getUserIdByUsername() {
      //首先val就是我取到的单个的值，可以输出看一下结果
      // console.log('val change', val)
      //这种情况是：我们能查找的是一个数组的情况下就要循环查找数据
      this.getUserInfo()
      let val = this.MemberRolesFormData.userList
      let ret = this.MemberRolesFormData.selectUsersName
      val.forEach(item => {
        ret.forEach(name => {
          if (item.username === name) {
            this.MemberRolesFormData.selectUsersId.push(item.id)
          }
        })
      })
    },
    //获取角色中的用户
    getRoleUserList() {
      this.getRoleIdByRoleNameForGetUsername()
      GetRoleUserInfo({
        uuid: this.MemberRolesFormData.selectRoleId
      }).then(response => {
        if (response.status === 200 && response.data.code === 66666) {
          //在赋值前清空列表
          this.MemberRolesFormData.selectUsersName = ''
          this.MemberRolesFormData.selectUsersName = this.splicingUsername(
            response.data.data
          )
          this.MemberRolesFormData.changButtonType = false
          this.$message({
            type: 'success',
            message: response.data.message
          })
        } else {
          //前清空列表
          this.MemberRolesFormData.selectUsersName = ''
          this.MemberRolesFormData.changButtonType = true
          this.$message({
            type: 'warning',
            message: response.data.message
          })
        }
      })
    },
    //保存角色中的用户
    postRoleUserList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getUserIdByUsername()
          PostRoleUserInfo({
            uuid: this.MemberRolesFormData.selectRoleId,
            users_id: this.MemberRolesFormData.selectUsersId
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.MemberRolesDialogVisible = false
              this.$refs[formName].resetFields()
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
            }
          })
        }
      })
    },
    postRolesInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PostRolesInfo({
            role_name: this.addRoleForm.rolesName
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.getRolesTableInfo()
              this.AddRolesDialogVisible = false
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
              this.getRolesTableInfo()
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    },
    patchRolesInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          PatchRolesInfo({
            role_name: this.updateRoles.newRolesName,
            uuid: this.updateRoles.uuid
          }).then(response => {
            if (response.status === 200 && response.data.code === 66666) {
              this.$refs[formName].resetFields()
              this.getRolesTableInfo()
              this.PatchRolesDialogVisible = false
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'warning',
                message: response.data.message
              })
              this.getRolesTableInfo()
              this.$refs[formName].resetFields()
            }
          })
        }
      })
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
      this.$emit('handleSelectionChange', val)
    },
    //分页数据大小
    handleSizeChange(pages_size) {
      this.listQuery.pageSize = pages_size
      this.getUserInfo()
    },
    //分页数据
    handleCurrentChange(page) {
      this.listQuery.page = page
      this.getUserInfo()
    },
    //控制新增弹窗
    handleAddButton() {
      this.AddRolesDialogVisible = true
    },
    handleButton(val) {
      if (val.methods === 'showDetailsDialog') {
        this.DetailsDialogVisible = true
        this.updateRoleData.selectChangeFormRoleName = val.row.role_name
        this.getRoleMenuInfo()
      } else if (val.methods === 'showEditDialog') {
        this.PatchRolesDialogVisible = true
        this.updateRoles.newRolesName = val.row.role_name
        this.updateRoles.uuid = val.row.id
      } else if (val.methods === 'MemberRolesFunction') {
        this.MemberRolesDialogVisible = true
        this.MemberRolesFormData.selectRoleName = ''
        this.MemberRolesFormData.selectRoleName = val.row.role_name
        this.getRoleUserList()
      } else if (val.methods === 'deleteFunction') {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            DeleteRolesInfo({
              uuid: val.row.id
            }).then(response => {
              if (response.status === 200 && response.data.code === 66666) {
                this.getRolesTableInfo()
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: response.data.message
                })
              }
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    }
  }
}
</script>

<style scoped></style>
