<template>
  <div style="padding:20px">
    <el-dialog title="资源树" :visible.sync="dialogResourceVisible" :show-close="false">
      <el-row :gutter="20">
        <el-col :span="24" :offset="1" style="height:50px">
          <span>已选中角色：</span>
          <span v-for="(item) in assignRoleForResource" :key="item.id" style="color:#F56C6C">({{ item.name }})</span>
        </el-col>
      </el-row>
        <el-scrollbar style="height:250px;">
          <el-tree
            ref="tree"
            :data="resourceList"
            show-checkbox
            node-key="id"
            highlight-current
            :props="defaultProps"
            @check="handleCheckChange"
          />
         </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeMenu">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'ResourceAllocate',
  props: {
    resourceList: {
      type: Array,
      default: () => []
    },
    assignRoleForResource: {
      type: Array,
      default: () => []
    },
    dialogResourceVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 已选中的资源
      selectResource: [],
      defaultProps: {
        // 别名的意思
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    async onSubmit() {
      // 这个是资源的id集合
      const resourceIdArr = this.selectResource.map(item => {
        return item.id
      })
      // 这个是角色的集合
      const roleIdArr = this.assignRoleForResource.map(item => {
        return item.id
      })
      this.$confirm('此操作将清空角色原先的资源信息并赋予新的资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 这里需要就是删除资源
        await store.dispatch('role/assignRoleForResource', { roleIdList: roleIdArr, resourceIds: resourceIdArr }).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          setTimeout(() => {
            location.reload()
          }, 500)
        }).catch(error => {
          this.$emit('closeDialogResourceVisible')
          this.$message({
            type: 'error',
            message: error.message
          })
          setTimeout(() => {
            location.reload()
          }, 500)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleCheckChange() {
      this.selectResource = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes())
    },
    closeMenu() {
      this.$emit('closeDialogResourceVisible')
    }
  }
}
</script>

<style lang="scss">

</style>
