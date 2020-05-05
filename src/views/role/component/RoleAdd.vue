<template>
  <div style="padding:20px">
    <el-dialog :visible.sync="dialogAddRoleVisible" :show-close="false" :close-on-click-modal="false">
      <span style="font-size:26px"><i class="el-icon-menu" />增加角色</span>
      <hr>
      <el-form ref="ruleForm" :model="roleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="15" :offset="4">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="roleForm.name" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" :offset="4">
            <el-form-item label="角色备注" prop="remark">
              <el-input v-model="roleForm.remark" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="是否启用" prop="status">
              <el-radio-group v-model="roleForm.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="2" :offset="4">
            <el-form-item>
              <el-button type="primary" @click="submitForm()">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="2">
            <el-form-item>
              <el-button @click="resetForm()">关闭</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'RoleAdd',
  props: {
    dialogAddRoleVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        remark: '',
        status: 0
      }
    }
  },
  methods: {
    async submitForm() {
      await store.dispatch('role/addRole', this.roleForm).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        })
      }).catch(error => {
        this.$message.error(error.message)
      })
      setTimeout(() => { location.reload() }, 2000)
    },
    resetForm() {
      this.$emit('closeDialogAddRoleVisible')
    }
  }
}
</script>

<style lang="scss">

</style>
