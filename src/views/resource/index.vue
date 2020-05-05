<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4" style="font-size:13px">
        <el-card shadow="always" :body-style="{ padding: '10px' }">
          <svg-icon icon-class="component" /><span style="margin-left:20px">资源管理</span>
          <br>
          <hr>
          <el-scrollbar style="height:380px;">
              <el-tree node-key="id" :data="resource" :props="defaultProps" style="margin-top:20px;font-size:12px" @node-click="handleNodeClick" />
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="20">
        <!-- 下面是我从表单里面获取的-->
        <el-form :inline="true" :model="resourceForm" class="demo-form-inline">
          <el-form-item label="父亲节点">
            <el-select v-model="resourceForm.parent" placeholder="请选择">
              <el-option v-for="(item,index) in resource" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="节点名称">
            <el-select v-model="resourceForm.son" placeholder="请选择">
              <el-option v-for="(item,index) in sonNode" :key="index" :label="item.name" :value="item.id" />
            </el-select>
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
          <el-link v-hasPermission="'addResource'" type="primary" @click="dialogAddResourceVisible = true"><i class="el-icon-plus" />增加</el-link>
          <el-link v-hasPermission="'deleteResource'" type="danger" style="margin-left:20px" @click="deleteMultResource"><i class="el-icon-delete" />删除</el-link>
          <!-- 下面是我从资源表格里面获取的-->
          <el-table
            v-loading="listLoading"
            element-loading-text="Loading"
            ref="multipleTable"
            :data="resourceCurrentList"
            tooltip-effect="dark"
            style="width: 100%;font-size: 12px"
            :cell-style="cellStyle"
            height="300px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              width="30"
            />
            <el-table-column
              align="center"
              label="节点名称"
              show-overflow-tooltip
              width="120"
            >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="permission"
              label="资源权限"
              width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              prop="parentId"
              label="父亲节点"
              show-overflow-tooltip
              width="120"
            />
            <el-table-column
              align="center"
              prop="path"
              label="PATH"
              width="120"
              show-overflow-tooltip
            />
            <el-table-column
              align="center"
              label="资源类型"
              width="80"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.resourceType === 1 ? '菜单':'操作' }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="图标"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <item :icon="scope.row.icon" />
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="叶子节点"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.leaf === 1 ? '是':'否' }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="动作"
            >
              <template slot-scope="scope">
                <el-link v-hasPermission="'updateResource'" type="warning" style="margin-left:20px" @click="updateResource(scope)"><i class="el-icon-edit" /></el-link>
                <el-link v-hasPermission="'deleteResource'" type="danger" style="margin-left:20px" @click="deleteResource(scope)"><i class="el-icon-delete" /></el-link>
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
    <!--两个弹窗-->
    <resourceUpdate :resource="updateResourceObj" :dialog-update-resource-visible="dialogUpdateResourceVisible" @closeDialogUpdateResourceVisible="dialogUpdateResourceVisible = false" />
    <resourceAdd :dialog-add-resource-visible="dialogAddResourceVisible" @closeDialogAddResourceVisible="dialogAddResourceVisible = false" />
  </div>
</template>

<script>
import Item from '@/layout/components/Sidebar/Item'
import store from '@/store'
import ResourceUpdate from './component/ResourceUpdate'
import ResourceAdd from './component/ResourceAdd'
export default {
  name: 'Resource',
  components: { Item, ResourceUpdate, ResourceAdd },
  data() {
    return {
      // 列表加载
      listLoading: true,
      // 是否正在查询过滤中
      isSelect: false,
      // 总数
      total: 0,
      // 总共的页数
      totalPageNum: 0,
      // 这个是当前页的所有列表
      resourceCurrentList: [],
      // 这个中间那个树的结构，也可以用作父菜单的prop
      resource: [],
      // 这个是那个树的节点别名，孩子的话是哪一个属性，名称的话是哪一个属性
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 上面查询框的两个属性，一个是父菜单的id，一个子菜单的id
      resourceForm: {
        parent: '',
        son: ''
      },
      // 搜索栏目的这个是孩子节点
      sonNode: [],
      // 目前的页数
      startPage: 1,
      // 每页的大小
      pageSize: 5,
      multipleSelection: [],
      // 将要修改的资源
      updateResourceObj: {},
      // 那个修改资源的弹窗
      dialogUpdateResourceVisible: false,
      // 增加的弹窗
      dialogAddResourceVisible: false
    }
  },
  computed: {
    // 这个计算属性是在获取
    resourceTree: function() {
      return []
    }
  },
  watch: {
    'resourceForm.parent': {
      handler: function() {
        // do something
        this.resourceForm.son = ''
        const parent = this.resource.filter(item => {
          return item.id === this.resourceForm.parent
        })
        if (parent.length && parent[0].children) {
          this.sonNode = parent[0].children
        } else {
          this.sonNode = []
        }
      }
    }
  },
  async created() {
    // 获取一棵树
    await store.dispatch('resource/getResourceTotalTree').then(res => {
      this.resource = this.createRouterTree(res.data)
    }).catch(error => {
            this.$message.error(error.message)
             setTimeout(() => { location.reload() }, 2000)
             
      })
    // 默认获取当前列表,不需要任何父级资源id
    const query = {
      startPage: this.startPage,
      pageSize: this.pageSize
    }
    this.listLoading = true
    await store.dispatch('resource/getResourceByCondition', query).then(res => {
      this.resourceCurrentList = res.data.list
      this.total = res.data.total
    }).catch(error => {
            this.$message.error(error.message)
             setTimeout(() => { location.reload() }, 2000)
          })
    this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
    this.listLoading = false
  },
  methods: {
    // 页面改变
    async changePage(currentPage) {
      this.startPage = currentPage
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize
      }
      // 如果正在查询 的话
      if (this.isSelect) {
        query.id = this.resourceForm.son || this.resourceForm.parent || ''
      }
      this.listLoading = true
      await store.dispatch('resource/getResourceByCondition', query).then(res => {
        this.resourceCurrentList = res.data.list
        this.total = res.data.total
      }).catch(error => {
            this.$message.error(error.message)
             setTimeout(() => { location.reload() }, 2000)
          })
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
      this.listLoading = false
    },
    // 清空选择表单的,已完成
    async reset() {
      this.resourceForm.parent = ''
      this.resourceForm.son = ''
      this.isSelect = false
      this.startPage = 1
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize
      }
      this.listLoading = true
      await store.dispatch('resource/getResourceByCondition', query).then(res => {
        this.resourceCurrentList = res.data.list
        this.total = res.data.total
      }).catch(error => {
            this.$message.error(error.message)
             setTimeout(() => { location.reload() }, 2000)
          })
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
      this.listLoading = false
    },
    // 创建一颗中间的资源树的
    createRouterTree(routerList) {
      const cloneData = JSON.parse(JSON.stringify(routerList))
      const data = cloneData.filter(father => {
        const branchArr = cloneData.filter(child => father.id === child.parentId)
        branchArr.length > 0 ? father['children'] = branchArr : ''
        return father.parentId === '0' // 如果第一层不是parentId=0，请自行修改
      })
      return data
    },
    // 单元格的样式
    cellStyle({ row, rowIndex, columnIndex }) {
      return 'height:40px;'
    },
    handleNodeClick(data) {
    },
    async onSubmit() {
      if (!this.resourceForm.parent) {
        return
      }
      this.isSelect = true
      this.startPage = 1
      const query = {
        startPage: this.startPage,
        pageSize: this.pageSize,
        id: this.resourceForm.son || this.resourceForm.parent || '0'
      }
      this.listLoading = true
      await store.dispatch('resource/getResourceByCondition', query).then(res => {
        this.resourceCurrentList = res.data.list
        this.total = res.data.total
      }).catch(error => {
            this.$message.error(error.message)
             setTimeout(() => { location.reload() }, 2000)
          })
      this.totalPageNum = (Math.ceil(this.total / this.pageSize)) * 10
      this.listLoading = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    updateResource(scope) {
      this.updateResourceObj = scope.row
      this.dialogUpdateResourceVisible = true
    },
    deleteMultResource() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择资源后在批量删除！')
      } else {
        const idsList = this.multipleSelection.map((item) => {
          return item.id
        })
        this.$confirm('此操作将永久删除该批资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 这里需要就是删除资源
          await store.dispatch('resource/deleteMultResource', { resourceIdList: idsList }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
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
    },
    deleteResource(scope) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await store.dispatch('resource/deleteResource', { id: scope.row.id }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
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
.mini-tree-nodetitle{
    height:30px;
}
.el-tree-node__label{
   font-size:13px
}
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
    overflow: scroll;
}
</style>
