<template>
  <div>
    <el-dialog :visible.sync="dialogAddRProcessVisible" :show-close="false" :close-on-click-modal="false"  >
      <span style="font-size:20px"><i class="el-icon-menu" />新增进程</span>
      <hr>
      <el-form ref="ruleForm" :model="resource" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="进程类型" prop="resourceType2">
              <el-select v-model="resource.resourceType2" placeholder="请选择进程类型" style="width:250px">
                <el-option v-for="item in resourceType2" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="进程名称" prop="path">
              <el-input v-model="resource.path" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="进程英文名称" prop="icon">
              <el-input v-model="resource.icon" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="通道选择器" prop="resourceType">
              <el-select v-model="resource.resourceType" placeholder="请选择通道选择器类型" style="width:250px">
                <el-option v-for="item in resourceType" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="8"><el-form-item label="指令代码" prop="remark">
            
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="22" :offset="0">
            <el-form-item label="" prop="leaf">
                <el-radio v-model="a1" :label="1">AO1</el-radio>
                <el-radio v-model="a2" :label="2">AO2</el-radio>
                <el-radio v-model="a3" :label="3">AO3</el-radio>
                <el-radio v-model="a4" :label="4">AO4</el-radio>
                <el-radio v-model="a5" :label="5">AO5</el-radio>
                <el-radio v-model="a6" :label="6">AO6</el-radio>
                <el-radio v-model="a7" :label="7">AO7</el-radio>
                <el-radio v-model="a8" :label="8">AO8</el-radio>
                <el-radio v-model="a9" :label="9">AO9</el-radio>
                <el-radio v-model="a10" :label="10">AO10</el-radio>
                <el-radio v-model="a11" :label="11">AO11</el-radio>
                <el-radio v-model="a12" :label="12">AO12</el-radio>
                <el-radio v-model="a13" :label="13">AO13</el-radio>
                <el-radio v-model="a14" :label="14">AO14</el-radio>
                <el-radio v-model="a15" :label="15">AO15</el-radio>
                <el-radio v-model="a16" :label="16">AO16</el-radio>
                <el-radio v-model="a17" :label="17">AO17</el-radio>
                <el-radio v-model="a18" :label="18">AO18</el-radio>
                <el-radio v-model="a19" :label="19">AO19</el-radio>
                <el-radio v-model="a20" :label="20">AO20</el-radio>
                <el-radio v-model="a21" :label="21">AO21</el-radio>
                <el-radio v-model="a22" :label="22">AO22</el-radio>
                <el-radio v-model="a23" :label="23">AO23</el-radio>
                <el-radio v-model="a24" :label="24">AO24</el-radio>
                <el-radio v-model="a25" :label="25">AO25</el-radio>
                <el-radio v-model="a26" :label="26">AO26</el-radio>
                <el-radio v-model="a27" :label="27">AO27</el-radio>
                <el-radio v-model="a28" :label="28">AO28</el-radio>
                <el-radio v-model="a29" :label="29">AO29</el-radio>
                <el-radio v-model="a30" :label="30">AO30</el-radio>
                <el-radio v-model="a31" :label="31">AO31</el-radio>
                <el-radio v-model="a32" :label="32">AO32</el-radio>
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
  name: 'ProcessAdd',
  props: {
    dialogAddRProcessVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      a1:'',
      a2:'',
      a3:'',
      a4:'',
      a5:'',
      a6:'',
      a7:'',
      a8:'',
      a9:'',
      a10:'',
      a11:'',
      a12:'',
      a13:'',
      a14:'',
      a15:'',
      a16:'',
      a17:'',
      a18:'',
      a19:'',
      a20:'',
      a21:'',
      a22:'',
      a23:'',
      a24:'',
      a25:'',
      a26:'',
      a27:'',
      a28:'',
      a29:'',
      a30:'',
      a31:'',
      a32:'',
      dialogVisible: false,
      componentOptions: [],
      parentOptions: [],
      resourceType: [{
        value: 1,
        label: '通道1'
      }, {
        value: 2,
        label: '通道2'
      },{
        value: 3,
        label: '通道3'
      }, {
        value: 4,
        label: '通道4'
      }, {
        value: 5,
        label: '通道5'
      }, {
        value: 6,
        label: '通道6'
      }
      ],
        resourceType2: [{
        value: 1,
        label: '分析进程'
      }, {
        value: 2,
        label: '返回进程'
      },{
        value: 3,
        label: '校验进程'
      }
      ],
      resource: {
        name: '',
        component: '',
        parentId: '',
        path: '',
        icon: '',
        resourceType: '',
        remark: '',
        leaf: 1,
        resourceType2:''
      }
    }
  },
  methods: {
    submitForm() {
     
    },
    CloseForm() {
      this.$emit('closeDialogAddProcessVisible')
    },
    resetResource(){
        this.resource.name ='',
        this.resource.component='',
        this.resource.parentId='',
        this.resource.path = '',
        this.resource.icon = '',
        this.resource.resourceType = '',
        this.resource.remark = '',
        this.resource.leaf = 1
    },
   handleClipboard(text, event) {
     this.resource.icon = text
     this.dialogVisible = false
    },
      handleClose(done) {
         done();
      },
    openIcon(){
      this.dialogVisible = true;
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
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap{

    overflow: scroll;

}
</style>
