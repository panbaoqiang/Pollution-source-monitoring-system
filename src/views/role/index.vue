<template>
  <div style="padding:20px">
    <el-row :gutter="10">
      <el-col :span="24">
        <!-- 下面是我从表单里面获取的-->
        <el-form :inline="true" :model="queryForm" label-width="80px" class="demo-form-inline">
          <el-form-item label="角色名称">
            <el-input v-model="queryForm.queryRoleName" style="width:250px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 上面是我从表单里面获取的-->
        <el-card shadow="hover">
          <el-link v-hasPermission="'addRole'" type="primary" @click="dialogAddRoleVisible = true"><i class="el-icon-plus" />增加</el-link>
          <el-link v-hasPermission="'deleteRole'" type="danger" style="margin-left:20px" @click="deleteMultpleRole"><i class="el-icon-delete" />删除</el-link>
          <el-link v-hasPermission="'assignResource'" type="primary" style="margin-left:20px" @click="multipleRoleAllocateResource"><i class="el-icon-circle-plus-outline" />资源分配</el-link>
          <el-link v-hasPermission="'assignUser'" type="primary" style="margin-left:20px" @click="multipleRoleAllocateUser"><i class="el-icon-s-check" />用户分配</el-link>
          <!-- 下面是我从资源表格里面获取的-->
          <el-table
            v-loading="listLoading"
            element-loading-text="Loading"
            ref="multipleTable"
            :data="currentPageRoles"
            tooltip-effect="dark"
            style="width: 100%;font-size: 12px"
            :cell-style="cellStyle"
            height="300px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="100"
            />
            <el-table-column
              align="center"
              label="角色名"
              show-overflow-tooltip
              width="200"
            >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              label="角色备注"
              show-overflow-tooltip
              width="200"
            />
            <el-table-column
              align="center"
              label="启用"
              width="200"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.status === 1 ? '是':'否' }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-link v-hasPermission="'updateRole'" type="warning" style="margin-left:20px" @click="updateRole(scope)"><i class="el-icon-edit" /></el-link>
                <el-link v-hasPermission="'deleteRole'" type="danger" style="margin-left:20px" @click="deleteRole(scope)"><i class="el-icon-delete" /></el-link>
                <el-link v-hasPermission="'assignResource'" type="primary" style="margin-left:20px" @click="roleAllocateResource(scope)"><i class="el-icon-circle-plus-outline" /></el-link>
                <el-link v-hasPermission="'assignUser'" type="primary" style="margin-left:20px"><i class="el-icon-s-check" /></el-link>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-row :gutter="20">
              <el-col :span="2"><span style="line-height:32px">共{{ total }}条</span></el-col>
              <el-col :span="15">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="totalPageNum"
                  :current-page="startPage"
                  @current-change="changePage"
                />
              </el-col>
            </el-row>
          </div>
        <!-- 上面是我从资源表格里面获取的-->
        </el-card>
      </el-col>
    </el-row>
    <resourceAllocate :resource-list="resourceList" :assign-role-for-resource="assignRoleForResource" :dialog-resource-visible="dialogResourceVisible" @closeDialogResourceVisible="dialogResourceVisible = false" />
    <userAllocate :user-list="userList" :assign-role-for-user="assignRoleForUser" :dialog-user-visible="dialogUserVisible" @closeDialogUserVisible="dialogUserVisible=false" />
    <roleUpdate :dialog-update-role-visible="dialogUpdateRoleVisible" :role-form="updateRoleObj" @closeDialogUpdateRoleVisible="dialogUpdateRoleVisible = false" />
    <roleAdd :dialog-add-role-visible="dialogAddRoleVisible" @closeDialogAddRoleVisible="dialogAddRoleVisible=false" />
  </div>
</template>

<script>
import store from '@/store'
import ResourceAllocate from './component/ResourceAllocate'
import UserAllocate from './component/UserAllocate'
import RoleUpdate from './component/RoleUpdate'
import RoleAdd from './component/RoleAdd'
export default {
  name: 'Role',
  components: { ResourceAllocate, UserAllocate, RoleUpdate, RoleAdd },
  data() {
    return {
      // 列表加载
      listLoading: true,
      // 目前的页数
      startPage: 1,
      // 每页的大小
      pageSize: 5,
      // 将要修改的角色信息
      updateRoleObj: {},
      // 总数
      total: 0,
      // 总共的页数
      totalPageNum: 0,
      // 这个是增加页面字段
      dialogAddRoleVisible: false,
      // 这个是更新的页面的
      dialogUpdateRoleVisible: false,
      // 这个是资源分配的
      dialogResourceVisible: false,
      // 这个是用户分配的
      dialogUserVisible: false,
      company: [{
        label: '博思软件'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 快速查询的条件
      queryForm: {
        queryRoleName: ''
      },
      // 是否正在快捷查询
      isSelect: false,
      // 当前页面的角色列表
      currentPageRoles: [],
      // 被选中的角色
      multipleSelection: [],
      // 接下来是那个两个对话框的属性，第一个是资源分配的数组
      // 实际上用来被资源分配的角色信息列表************************************************
      assignRoleForResource: [],
      // 资源树
      resourceList: [],
      // 实际上用来被用户分配的角色信息列表************************************************
      assignRoleForUser: [],
      // 资源树
      userList: []
    }
  },
  async created() {
    // 默认获取当前列表,不需要任何父级资源id
    const query = {
      startPage: this.startPage,
      pageSize: this.pageSize
    }
    this.listLoading = true
    await store.dispatch('role/getCurrentPageRole', query).then(res => {
      this.currentPageRoles = res.data.list
      this.total = res.data.total
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
      this.listLoading = false
    }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })
  },
  methods: {
    // 创建一棵树
    createRouterTree(routerList) {
      const cloneData = JSON.parse(JSON.stringify(routerList))
      const data = cloneData.filter(father => {
        const branchArr = cloneData.filter(child => father.id === child.parentId)
        branchArr.length > 0 ? father['children'] = branchArr : ''
        return father.parentId === '0' // 如果第一层不是parentId=0，请自行修改
      })
      return data
    },
    // 单个资源分配
    async roleAllocateResource(scope) {
      this.assignRoleForResource = [scope.row]
      await store.dispatch('resource/getResourceTotalTree').then(res => {
        this.resourceList = this.createRouterTree(res.data)
      }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })
      this.dialogResourceVisible = true
    },
    // 多选资源分配
    async multipleRoleAllocateResource() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择角色后在批量资源授予！')
      } else {
        // 已选择的角色
        this.assignRoleForResource = this.multipleSelection
        await store.dispatch('resource/getResourceTotalTree').then(res => {
          this.resourceList = this.createRouterTree(res.data)
          this.dialogResourceVisible = true
        }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })  
      }
    },
    // 多选用户分配
    async multipleRoleAllocateUser() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择角色后在批量用户授予！')
      } else {
        // 已选择的角色
        this.assignRoleForUser = this.multipleSelection
        await store.dispatch('user/getAllUser').then(res => {
          this.userList = res.data
          this.dialogUserVisible = true
        }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })
      }
    },
    updateRole(scope) {
      this.updateRoleObj = scope.row
      this.dialogUpdateRoleVisible = true
    },
    cellStyle({ row, rowIndex, columnIndex }) {
      return 'height:40px;'
    },
    handleNodeClick(data) {
    },
    // 页面页数改变
    async changePage(currentPage) {
      this.startPage = currentPage
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize
      }
      // 如果正在查询 的话
      if (this.isSelect) {
        query.name = this.queryForm.queryRoleName
      }
      this.listLoading = true
      await store.dispatch('role/getCurrentPageRole', query).then(res => {
        this.currentPageRoles = res.data.list
        this.total = res.data.total
        this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
        this.listLoading = false
      }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })

    },
    async onSubmit() {
      // 属性为空
      if (!this.queryForm.queryRoleName) {
        return
      }
      this.isSelect = true
      this.startPage = 1
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize,
        name: this.queryForm.queryRoleName
      }
      this.listLoading = true
      await store.dispatch('role/getCurrentPageRole', query).then(res => {
        this.currentPageRoles = res.data.list
        this.total = res.data.total
        this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
        this.listLoading = false
      }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })

    },
    async reset() {
      this.queryForm.queryRoleName = ''
      this.isSelect = false
      this.startPage = 1
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize
      }
      this.listLoading = true
      await store.dispatch('role/getCurrentPageRole', query).then(res => {
        this.currentPageRoles = res.data.list
        this.total = res.data.total
        this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
        this.listLoading = false
      }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteRole(scope) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await store.dispatch('role/deleteRole', { id: scope.row.id }).then(() =>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            setTimeout(() => { location.reload() }, 2000)
        }).catch(error => {
           this.$message({
              type: 'error',
              message: error.message
            })
           setTimeout(() => { location.reload() }, 2000)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteMultpleRole() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择角色后在批量删除！')
      } else {
        const idsList = this.multipleSelection.map((item) => {
          return item.id
        })
        this.$confirm('此操作将永久删除该批角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await store.dispatch('role/deleteMultipleRole', { roleIdList: idsList }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            setTimeout(() => { location.reload() }, 2000)
          }).catch(error => {
            this.$message.error(error.message)
             setTimeout(() => { location.reload() }, 2000)
          })
        }).catch(() => {
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

<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  // 表格样式
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 50px;
}
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;;
}
</style>
