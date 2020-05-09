<template>
  <div>
    <el-dialog title="温控编辑" :visible.sync="dialogUpdateThermostatVisible" :show-close="false" :close-on-click-modal="false">
      <el-form  :model="thermostat" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="名称" prop="name">
            <el-input v-model="thermostat.name" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="设定PV" prop="path">
              <el-input v-model="thermostat.pv" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="设定SV" prop="remark">
            <el-input v-model="thermostat.sv" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="上限" prop="remark">
            <el-input v-model="thermostat.upLimmit" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="下限" prop="remark">
            <el-input v-model="thermostat.lowLimmit" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="是否报警" prop="remark">
            <el-input v-model="thermostat.isAlarm" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="报警灯号" prop="remark">
            <el-input v-model="thermostat.Light" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="启用状态" prop="remark">
            <el-input v-model="thermostat.status" style="width:250px" />
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
  name: 'thermostatUpdate',
  props: {
    thermostat: {
      type: Object,
      default() {
        return {
          name:'',
          pv:'',
          sv:'',
          upLimit:'',
          lowLimmit:'',
          isAlarm:'',
          Light:'',
          status:''
        }
      }
    },
    dialogUpdateThermostatVisible: {
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
      this.$emit('closeDialogUpdateThermostatVisible')
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
