<template>
  <div style="padding:20px">
    <el-dialog :visible.sync="dialogUpdateUserVisible" :show-close="false" :close-on-click-modal="false">
      <span style="font-size:26px"><i class="el-icon-menu" />修改用户</span>
      <hr>
      <el-form ref="ruleForm" :model="userForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="用户账号" prop="username">
            <el-input v-model="userForm.username" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="初始密码" prop="password">
              <el-input v-model="userForm.password" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="userForm.name" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="手机号码" prop="tel">
              <el-input v-model="userForm.tel" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="备注" prop="remark">
            <el-input v-model="userForm.remark" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="16" :offset="4">
            <el-form-item label="是否启用" prop="status">
              <el-radio-group v-model="userForm.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="3" :offset="4">
            <el-form-item>
              <el-button type="primary" @click="submitForm()">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
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

  name: 'UserUpdate',
  props: {
    dialogUpdateUserVisible: {
      type: Boolean,
      default: false
    },
    userForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async submitForm() {
      await store.dispatch('user/updateUser', this.userForm).then(res => {
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
      this.$emit('closeDialogUpdateUserVisible')
    }
  }
}
</script>

<style lang="scss">

</style>
