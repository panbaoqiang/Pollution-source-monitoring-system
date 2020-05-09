<template>
  <div >
      <el-link  type="primary" style="margin-left:40px" ><i class="el-icon-plus" />增加</el-link>
       <el-row>
          <el-col :span="24" >
              <el-table
              :data="tableData"
              stripe
              >
              <el-table-column
                prop="attr1"
                label="设备名称"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="attr2"
                label="厂商"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="attr3"
                label="设备功能"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="attr4"
                label="设备地址"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="attr5"
                label="功能码"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="attr6"
                label="寄存器首地址"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                  prop="attr7"
                  label="寄存器数量"
                  align="center"
                >
              </el-table-column>
              <el-table-column
                  prop="attr8"
                  label="数据区"
                  align="center"
                >
              </el-table-column>
              <el-table-column
                  prop="attr9"
                  label="校验"
                  align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                 width="150px"
                >
                <template slot-scope="scope">
                    <el-link  type="warning" style="margin-left:20px" @click="updateInstruct(scope.row)"><i class="el-icon-edit" />编辑</el-link>
                    <el-link  type="danger" style="margin-left:20px" ><i class="el-icon-delete" />删除</el-link>
                 </template>    
              </el-table-column>
            </el-table>
          </el-col>
      </el-row>
      <instructupdate :instruct="instruct"  :dialogUpdateInstructVisible="dialogUpdateInstructVisible" @closeDialogUpdateInstructVisible="dialogUpdateInstructVisible = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import instructupdate from './component/instructUpdate'
export default {
  name: 'instructSetting',
  components:{
    instructupdate
  },
    methods:{
    updateInstruct(row){
       this.instruct = row
       this.dialogUpdateInstructVisible = true
    }
  },
  data(){
    return {
      dialogUpdateInstructVisible:false,
      instruct:{},
          tableData: [{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'发送读取FiD信号AD值',
          attr4:'08',
          attr5:'03',
          attr6:'00 37',
          attr7:'00 02',
          attr8: '',
          attr9:'755C'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'返回读取FiD信号AD值',
          attr4:'08',
          attr5:'03',
          attr6:'',
          attr7:'',
          attr8: 'FF FF F3 52',
          attr9:'6333'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'点火1发送',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 03',
          attr8: '00 83 00 01 00 00',
          attr9:'2E97'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'点火1返回',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 03',
          attr8: '',
          attr9:'8091'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位10G发送',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '00 84 00 00',
          attr9:'9D1A'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位10G返回',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '',
          attr9:'4151'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位1G发送',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '00 84 00 01',
          attr9:'5CDA'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位1G返回',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '',
          attr9:'4151'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位100M发送',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '00 84 00 02',
          attr9:'1CDB'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位100M返回',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '',
          attr9:'4151'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位100M发送',
          attr4:'08',
          attr5:'10',
          attr6:'00 00',
          attr7:'00 02',
          attr8: '00 84 00 03',
          attr9:'DD1B'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'切换挡位100M返回',
          attr4:'08',
          attr5:'10',
          attr6:'00 01',
          attr7:'00 02',
          attr8: '',
          attr9:'4151'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'读取当前挡位发送',
          attr4:'08',
          attr5:'03',
          attr6:'00 3A',
          attr7:'00 01',
          attr8: '',
          attr9:'A49E'
        },{
          attr1: '放大电路板',
          attr2: '瑞能',
          attr3:'读取当前挡位返回',
          attr4:'08',
          attr5:'03',
          attr6:'',
          attr7:'',
          attr8: '00 02',
          attr9:'E584'
        }]
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
