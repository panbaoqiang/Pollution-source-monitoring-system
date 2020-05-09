<template>
  <div>
      <el-dialog :visible.sync="dialogAddVisible" :show-close="false" :close-on-click-modal="false" 
      width="70%"  >
        <el-scrollbar style="height:400px;">
          <div style="width:25%;height:380px;float:left"> 
              <el-table
                    :data="processList"
                    height="380px"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                    align="center"
                    label="排程清单"
                    width="100px">
                    </el-table-column>
                    <el-table-column
                     align="center"
                    label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button type="info" size="small" plain @click="addProcess(scope)">加入排程</el-button>
                        </template>     
                    </el-table-column>
                </el-table>
          </div>
          <div style="width:30%;height:380px;float:left;padding:10px"> 
              <el-row>
                  <el-col :span="4" style="line-height:40px">
                      次数：
                  </el-col>
                  <el-col :span="14">
                      <el-input v-model="input" placeholder="请输入执行次数"></el-input>
                  </el-col>
              </el-row>
              <div style="width:100%;height:300px;background:#EBEEF5;margin-top:20px">
                <el-row>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                      <el-checkbox v-model="MON" >MON</el-checkbox>
                  </el-col>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                       <el-checkbox v-model="TUE">TUE</el-checkbox>
                  </el-col>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                       <el-checkbox v-model="WED">WED</el-checkbox>
                  </el-col>
              </el-row>
                <el-row>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                      <el-checkbox v-model="THU">THU</el-checkbox>
                  </el-col>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                       <el-checkbox v-model="FRI">FRI</el-checkbox>
                  </el-col>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                       <el-checkbox v-model="SAT">SAT</el-checkbox>
                  </el-col>
              </el-row>         
                <el-row>
                  <el-col :span="8" style="line-height:40px;text-align:center">
                      <el-checkbox v-model="SUN">SUN</el-checkbox>
                  </el-col>
              </el-row>     
                <el-row>
                  <el-col :span="11" style="height:40px;line-height:40px;text-align:center">
                      <el-select v-model="value" placeholder="请选择小时" size="mini">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                  </el-col>
                 <el-col :span="12" :offset="1" style="height:40px;line-height:40px;text-align:center">
                        <el-select v-model="value2" placeholder="请选择分钟" size="mini">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                  </el-col>
              </el-row> 
                <el-row>
                  <el-col :span="12" style="line-height:40px;text-align:center;margin-top:50px">
                     <el-button type="info"   @click="process = []">清空排程</el-button>
                  </el-col>
                    <el-col :span="12" style="line-height:40px;text-align:center;margin-top:50px">
                     <el-button type="primary"   @click="CloseForm">应用排程</el-button>
                  </el-col>
               </el-row>            
              </div>
          </div>
            <div style="width:45%;height:380px;background:blue;float:left"> 
                <el-table
                    :data="process"
                    height="380px"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        align="center"
                        label="排程清单"
                        width="100px">
                    </el-table-column>
                     <el-table-column
                        prop="time"
                        align="center"
                        label="次数"
                        width="100px">
                    </el-table-column>
                    <el-table-column
                     align="center"
                    label="状态"
                    >
                        执行中
                    </el-table-column>
                    <el-table-column
                     align="center"
                    label="操作"
                    >
                      <template slot-scope="scope">
                           <el-button type="info" size="small"  plain @click="deleteScope(scope)">删除排程</el-button>
                      </template>       
                    </el-table-column>
                </el-table>
          </div>
         </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'schedulingAdd',
  props: {
    dialogAddVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        options: [{
          value: '1',
          label: '1时'
        }, {
          value: '2',
          label: '2时'
        }, {
          value: '3',
          label: '3时'
        }, {
          value: '4',
          label: '4时'
        }, {
          value: '5',
          label: '5时'
        }, {
          value: '6',
          label: '6时'
        }],
        value: '',
        options2: [{
          value: '1',
          label: '1分'
        }, {
          value: '2',
          label: '2分'
        }, {
          value: '3',
          label: '3分'
        }, {
          value: '4',
          label: '4分'
        }, {
          value: '5',
          label: '5分'
        }, {
          value: '6',
          label: '6分'
        }],
        value2: '',

        MON:'',
        TUE:'',
        WED:'',
        THU:'',
        FRI:'',
        SAT:'',
        SUN:'',
        input:'',
        processList: [{
           name:'ch1_分析'
        }, {
          name:'ch2_分析'
        }, {
           name:'ch3_分析'
        }, {
            name:'ch4_分析'
        }, {
           name:'ch5_分析'
        }, {
           name:'ch6_分析'
        }, {
           name:'ch1_反吹'
        }, {
           name:'ch2_反吹'
        }, {
           name:'ch3_反吹'
        }, {
           name:'ch4_反吹'
        }, {
           name:'ch5_反吹'
        }, {
           name:'ch6_反吹'
        }],
        process:[
            {
              name:'ch1_分析',
              time:1
           }
        ]
    }
  },
  methods: {
    addProcess(scope){
        console.log(scope)
        this.process.push(
              {
              name: scope.row.name,
              time:this.input
             }
        )
    },
    deleteScope(scope){
        this.process.splice(scope.$index,1)
    },
    submitForm() {
     
    },
    CloseForm() {
      this.$emit('closeDialogAddSchedulingVisible')
    },
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
