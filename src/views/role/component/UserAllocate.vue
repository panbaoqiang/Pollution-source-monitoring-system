<template>
  <div style="padding:20px">
    <el-dialog title="用户分配" :visible.sync="dialogUserVisible" :show-close="false" :close-on-click-modal="false">
      <el-row :gutter="20">
        <el-col :span="24" :offset="1" style="height:50px">
          <span>已选中角色：</span>
          <span v-for="(item) in assignRoleForUser" :key="item.id" style="color:#F56C6C">({{ item.id }}--{{ item.name }})</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :offset="1">
          <el-transfer
            v-model="value"
            filterable
            :render-content="renderFunc"
            :filter-method="filterMethod"
            filter-placeholder="请输入用户名名"
            :data="users"
            :titles="['所有用户', '已选中用户']"
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
  name: 'UserAllocate',
  props: {
    // 被选中的角色
    assignRoleForUser: {
      type: Array,
      default: () => []
    },
    // 所有的用户
    userList: {
      type: Array,
      default: () => []
    },
    dialogUserVisible: {
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
    // 这个是将所有用户信息转化成穿梭框的数据
    users() {
      const data = []
      this.userList.forEach((role) => {
        data.push({
          label: role.name,
          key: role.id,
          code: role.code,
          disabled: role.status === 0
        })
      })
      return data
    },
    // 这个计算属性是放角色的id集合
    roleIdList() {
      const list = []
      this.assignRoleForUser.forEach((role) => {
        list.push(role.id)
      })
      return list
    }
  },
  methods: {
    // 根据用户集合返回用户的id数组
    // 确定更改
    onSubmit() {
      console.log(this.value)
      if (this.value.length === 0) {
        this.$message.error('未选择任何用户,无法给角色批量赋予用户')
        return
      }
      // 这里
      this.$confirm('此操作将清空用户原先的角色信息并赋予新的角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // this.value是用户id的结合
        const roleIdArr = this.assignRoleForUser.map(item => {
          return item.id
        })
        // 这里需要就是删除资源
        await store.dispatch('role/assignRoleForUser', { userIds: this.value, roleIdList: roleIdArr }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: res.message
          })
          setTimeout(() => {
            location.reload()
          }, 500)
        }).catch(error => {
          this.$message.error(error.message)
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
      this.$emit('closeDialogUserVisible')
    },

    // 自定义的角色标签
    renderFunc(h, option) {
      return <span>{ option.code } - { option.label } </span>
    }
  }
}
</script>

<style scoped>

</style>
