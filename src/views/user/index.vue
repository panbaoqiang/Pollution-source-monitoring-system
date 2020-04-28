<template>
  <div style="padding:20px">
    <el-row >
      <el-col :span="24">
        <!-- 下面是我从表单里面获取的-->
        <el-form :inline="true" :model="queryForm" class="demo-form-inline" style="font-size:10px">
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item label="用户名称" prop="name">
                <el-input v-model="queryForm.name" style="width:180px" size="mini" />
              </el-form-item></el-col>
            <el-col :span="6">
              <el-form-item label="工号" prop="code">
                <el-input v-model="queryForm.code" style="width:200px" size="mini" />
              </el-form-item></el-col>
            <el-col :span="2">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-form-item>
                <el-button type="info" @click="reset">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
        <!-- 上面是我从表单里面获取的-->
        <el-card shadow="hover">
          <el-link v-has="'addUser'" type="primary" @click="dialogAddUserVisible = true"><i class="el-icon-plus" />增加</el-link>
          <el-link v-has="'deleteUser'" type="danger" style="margin-left:20px" @click="deleteMultpleUser"><i class="el-icon-delete" />删除</el-link>
          <el-link v-has="'allocateUserRole'" type="primary" style="margin-left:20px" @click="allocateUserRole"><i class="el-icon-s-check" />角色分配</el-link>
          <!-- 下面是我从资源表格里面获取的-->
          <el-table
            ref="multipleTable"
            :data="userList"
            tooltip-effect="dark"
            style="width: 100%;font-size: 12px"
            :cell-style="cellStyle"
            height="300px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="55"
            />
            <el-table-column
              align="center"
              label="用户工号"
              show-overflow-tooltip
              width="80"
            >
              <template slot-scope="scope">{{ scope.row.code }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="用户姓名"
              width="80"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="password"
              label="密码"
              show-overflow-tooltip
              width="80"
            />
            <el-table-column
              align="center"
              prop="roleList"
              label="角色"
              width="130"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ createRoleNames(scope.row.roleList) }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="tel"
              label="手机号"
              width="130"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="remark"
              label="备注"
              width="100"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="status"
              label="是否启用"
              width="100"
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
                <el-link v-has="'updateUser'" type="warning" style="margin-left:20px" @click="updateUser(scope)"><i class="el-icon-edit" /></el-link>
                <el-link v-has="'deleteUser'" type="danger" style="margin-left:20px" @click="deleteUser(scope)"><i class="el-icon-delete" /></el-link>
                <el-link v-has="'allocateUserRole'" type="primary" style="margin-left:20px" @click="allocateSingeleUserRole(scope.row)"><i class="el-icon-s-check" /></el-link>
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
    <allocateUserRole :role-list="roleList" :user-list="userSelection" :dialog-allocate-role-visible="dialogAllocateRoleVisible" @closeDialogAllocateRoleVisible="dialogAllocateRoleVisible= false" />
    <userUpdate :dialog-update-user-visible="dialogUpdateUserVisible" :user-form="updateUserObj" @closeDialogUpdateUserVisible="dialogUpdateUserVisible = false" />
    <userAdd :dialog-add-user-visible="dialogAddUserVisible" @closeDialogAddUserVisible="dialogAddUserVisible = false" />
  </div>
</template>

<script>
import store from '@/store'
import allocateUserRole from './component/AllocateUserRole'
import UserUpdate from './component/UserUpdate'
import UserAdd from './component/UserAdd'
export default {
  name: 'User',
  components: { allocateUserRole, UserUpdate, UserAdd },
  data() {
    return {
      dialogAddUserVisible: false,
      // 将要分配的用户
      userSelection: [],
      // 更新框是否展示
      dialogUpdateUserVisible: false,
      // 要更新的那一个人
      updateUserObj: {},
      // 这个是查看那个角色框是否要弹出来的
      dialogAllocateRoleVisible: false,
      // 所有的角色信息数组
      roleList: [],
      departments: [{
        label: '阿里巴巴'
      }, {
        label: '腾讯'
      }, {
        label: '华为'
      },
      {
        label: '字节跳动'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 是否正在查询过滤中
      isSelect: false,
      // 查询框
      queryForm: {
        name: '',
        code: ''
      },
      // 当前页面的用户
      userList: [],
      // 被选中的用户
      multipleSelection: [],
      // 目前的页数
      startPage: 1,
      // 每页的大小
      pageSize: 5,
      // 总数
      total: 0,
      // 总共的页数
      totalPageNum: 0
    }
  },
  async created() {
    // 默认获取当前列表,不需要任何父级资源id
    const query = {
      startPage: this.startPage,
      pageSize: this.pageSize
    }
    await store.dispatch('user/getCurrentPageUser', query).then(res => {
      console.log('用户赶回结果', res)
      this.userList = res.data.list
      this.total = res.data.total
    })
    this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
  },
  methods: {
    updateUser(scope) {
      console.log(scope)
      this.updateUserObj = scope.row
      this.dialogUpdateUserVisible = true
    },
    async allocateSingeleUserRole(user) {
      this.userSelection = [user]
      // 获取所有的角色
      await store.dispatch('role/getAllRole').then(res => {
        console.log('角色赶回结果', res)
        this.roleList = res.data
        this.dialogAllocateRoleVisible = true
      })
    },
    async allocateUserRole() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择用户后在批量分配！')
      } else {
        this.userSelection = this.multipleSelection
        this.dialogAllocateRoleVisible = true
        // 获取所有的角色
        await store.dispatch('role/getAllRole').then(res => {
          console.log('角色赶回结果', res)
          this.roleList = res.data
        })
      }
    },
    // 根据数组创建一个角色集合
    createRoleNames(roleArr) {
      if (!roleArr || roleArr.length === 0) {
        return '暂无'
      }
      let str = ''
      for (var i = 0; i < roleArr.length; i++) {
        str += (roleArr[i].name + ',')
      }
      return str.substring(0, str.length - 1)
    },
    // 页面改变
    async changePage(currentPage) {
      console.log(currentPage)
      this.startPage = currentPage
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize
      }
      // 如果正在查询 的话
      if (this.isSelect) {
        query.code = this.queryForm.code
        query.name = this.queryForm.name
      }
      await store.dispatch('user/getCurrentPageUser', query).then(res => {
        this.userList = res.data.list
        this.total = res.data.total
      })
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
    },
    cellStyle({ row, rowIndex, columnIndex }) {
      return 'height:40px;'
    },
    handleNodeClick(data) {
      alert('没有实现')
    },
    async onSubmit() {
      // 属性同时不存在
      if (!this.queryForm.name && !this.queryForm.code) {
        return
      }
      this.isSelect = true
      this.startPage = 1
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize,
        code: this.queryForm.code,
        name: this.queryForm.name
      }
      await store.dispatch('user/getCurrentPageUser', query).then(res => {
        this.userList = res.data.list
        this.total = res.data.total
      })
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
    },
    async reset() {
      this.queryForm.name = ''
      this.queryForm.code = ''
      this.isSelect = false
      this.startPage = 1
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize
      }
      await store.dispatch('user/getCurrentPageUser', query).then(res => {
        this.userList = res.data.list
        this.total = res.data.total
      })
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteMultpleUser() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择用户后在批量删除！')
      } else {
        const idsList = this.multipleSelection.map((item) => {
          return item.id
        })
        console.log(idsList)
        this.$confirm('此操作将永久删除该批资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 这里需要就是删除资源
          await store.dispatch('user/deleteMultpleUser', { userIdList: idsList }).then(res => {
            this.$message({
              type: 'success',
              message: res.message
            })
            setTimeout(() => { location.reload() }, 500)
          }).catch(error => {
            this.$message.error(error.message)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    deleteUser(scope) {
      console.log(scope)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await store.dispatch('user/deleteUser', { id: scope.row.id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        setTimeout(() => { location.reload() }, 500)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss">
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
    height: 50px;
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
.el-input el-input--medium el-input--suffix .el-input__inner{
  width:100px
}
</style>
