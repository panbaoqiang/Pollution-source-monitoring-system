<template>
  <div>
    <el-dialog title="指令编辑" :visible.sync="dialogUpdateInstructVisible" :show-close="false" :close-on-click-modal="false">
      <el-form  :model="instruct" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="设备名称" prop="name">
            <el-input v-model="instruct.attr1" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="厂商" prop="path">
              <el-input v-model="instruct.attr2" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="设备功能" prop="remark">
            <el-input v-model="instruct.attr3" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="设别地址" prop="remark">
            <el-input v-model="instruct.attr4" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="功能码" prop="remark">
            <el-input v-model="instruct.attr5" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="寄存器首地址" prop="remark">
            <el-input v-model="instruct.attr6" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="寄存器数量" prop="remark">
            <el-input v-model="instruct.attr7" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="数据区" prop="remark">
            <el-input v-model="instruct.attr8" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="CRC效验码" prop="remark">
            <el-input v-model="instruct.attr9" style="width:250px" />
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
  name: 'instructUpdate',
  props: {
    instruct: {
      type: Object,
      default() {
        return {
          attr1:'',
          attr2:'',
          attr3:'',
          attr4:'',
          attr5:'',
          attr6:'',
          attr7:'',
          attr8:'',
          attr9:''
        }
      }
    },
    dialogUpdateInstructVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    submitForm() {

    },
    CloseForm() {
      // 关闭窗口
      this.$emit('closeDialogUpdateInstructVisible')
    },
      handleClipboard(text, event) {

    }
  }
}
</script>

<style lang="scss">

.icons-container {
  margin: 0;
  overflow: hidden;
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 60px;
    text-align: center;
    width: 20px;
    float: left;
    font-size: 25px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
