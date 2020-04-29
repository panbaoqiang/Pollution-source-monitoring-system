<template>
  <div style="padding:20px">
    <el-dialog title="角色分配" :visible.sync="dialogAllocateRoleVisible" :show-close="false" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="24" :offset="1" style="height:50px">
          <span>已选中用户：</span>
          <span v-for="(item) in userList" :key="item.id" style="color:#F56C6C">({{ item.username }}--{{ item.name }})</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :offset="1">
          <el-transfer
            v-model="value"
            filterable
            :render-content="renderFunc"
            :filter-method="filterMethod"
            filter-placeholder="请输入角色名"
            :data="data"
            :titles="['所有角色', '已选中角色']"
          />
        </el-col>
      </el-row>

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
  name: 'AllocateUserRole',
  props: {
    // 被选中的用户
    userList: {
      type: Array,
      default: () => []
    },
    // 所有的角色
    roleList: {
      type: Array,
      default: () => []
    },
    dialogAllocateRoleVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) !== -1
      }
    }
  },
  computed: {
    data() {
      const data = []
      this.roleList.forEach((role) => {
        data.push({
          label: role.name,
          key: role.id,
          disabled: role.status === 0
        })
      })
      return data
    },
    userIdList() {
      const list = []
      this.userList.forEach((user) => {
        list.push(user.id)
      })
      return list
    }
  },
  methods: {
    // 根据用户集合返回用户的id数组
    // 确定更改
    onSubmit() {
      if (this.value.length === 0) {
        this.$message.error('未选择任何角色,无法进行角色赋予')
        return
      }
      // 这里
      this.$confirm('此操作将清空用户原先的角色信息并赋予新的角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 这里需要就是删除资源
        await store.dispatch('user/assignUserForRole', { userIdList: this.userIdList, roleIdList: this.value }).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          setTimeout(() => {
            location.reload()
          }, 500)
        }).catch(error => {
          this.$message.error(error.message)
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
    closeMenu() {
      this.value = []
      this.$emit('closeDialogAllocateRoleVisible')
    },

    // 自定义的角色标签
    renderFunc(h, option) {
      return <span>{ option.label } - { option.key } </span>
    }
  }
}
</script>

<style scoped>

</style>
