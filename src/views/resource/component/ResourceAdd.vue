<template>
  <div>
    <el-dialog :visible.sync="dialogAddResourceVisible" :show-close="false" :close-on-click-modal="false">
      <span style="font-size:20px"><i class="el-icon-menu" />新增资源</span>
      <hr>
      <el-form ref="ruleForm" :model="resource" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="节点名称" prop="name">
            <el-input v-model="resource.name" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="节点组件" prop="component">
              <el-input v-model="resource.component" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="父亲节点" prop="parentId">
              <el-input v-model="resource.parentId" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="path" prop="path">
              <el-input v-model="resource.path" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="图标" prop="icon">
            <el-input v-model="resource.icon" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="资源类型" prop="resourceType">
              <el-select v-model="resource.resourceType" placeholder="请选择菜单类型" style="width:250px">
                <el-option v-for="item in resourceType" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="备注" prop="remark">
            <el-input v-model="resource.remark" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="10" :offset="4">
            <el-form-item label="是否叶子节点" prop="leaf">
              <el-radio-group v-model="resource.leaf">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="4" :offset="4">
            <el-form-item>
              <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button @click="CloseForm()">关闭</el-button>
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
  name: 'ResourceAdd',
  props: {
    dialogAddResourceVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resourceType: [{
        value: 1,
        label: '菜单'
      }, {
        value: 2,
        label: '按钮'
      }
      ],
      resource: {
        name: '添加测试的菜单资源',
        component: 'resource',
        parentId: '0',
        path: '/test2',
        icon: 'international',
        resourceType: '',
        remark: '测试的资源菜单',
        leaf: 1
      }
    }
  },
  methods: {
    submitForm() {
      console.log(this.resource)
      store.dispatch('resource/AddResource', this.resource)
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
      setTimeout(() => { location.reload() }, 500)
    },
    CloseForm() {
      this.$emit('closeDialogAddResourceVisible')
    }
  }
}
</script>

<style lang="scss">

</style>
