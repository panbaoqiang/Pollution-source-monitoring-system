<template>
  <div >
           <el-row>
          <el-col :span="24" >
              <el-table
              :data="tableData"
              stripe
              >
              <el-table-column
                prop="name"
                label="名称"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="pv"
                label="实际PV值"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="sv"
                label="设定SV"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="upLimmit"
                label="上限"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="lowLimmit"
                label="下限"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="isAlarm"
                label="是否报警"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                  prop="Light"
                  label="报警灯号"
                  align="center"
                >
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="启用状态"
                  align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                >
                <template slot-scope="scope">
                    <el-link  type="warning" style="margin-left:20px" @click="updateThermostat(scope.row)"><i class="el-icon-edit" />编辑</el-link>
                 </template>    
              </el-table-column>
            </el-table>
          </el-col>
      </el-row>
      <thermostatUpdate :thermostat="thermostat"  :dialogUpdateThermostatVisible="dialogUpdateThermostatVisible" @closeDialogUpdateThermostatVisible="dialogUpdateThermostatVisible = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import thermostatUpdate from './component/thermostatUpdate'
export default {
  name: 'thermostatSetting',
  components:{
      thermostatUpdate
  },
  methods:{
    updateThermostat(row){
       this.thermostat = row
       this.dialogUpdateThermostatVisible = true
    }
  },
  data(){
    return {
      dialogUpdateThermostatVisible:false,
      thermostat:{},
          tableData: [{
          name: '火焰量测',
          pv: '5.68',
          sv:'15.00',
          upLimmit:'5.0',
          lowLimmit:'5.0',
          isAlarm:'否',
          Light:'无',
          status: '启用'
        },{
          name: '烘箱',
          pv: '10.00',
          sv:'14.00',
          upLimmit:'10.0',
          lowLimmit:'6.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },{
          name: '加热箱',
          pv: '9.12',
          sv:'16.00',
          upLimmit:'10.0',
          lowLimmit:'7.0',
          isAlarm:'否',
          Light:'无',
          status: '启用'
        },{
          name: '采样探头1',
          pv: '5.00',
          sv:'10.00',
          upLimmit:'0.0',
          lowLimmit:'0.0',
          isAlarm:'无',
          Light:'无',
          status: '禁用'
        },{
          name: '伴热管1',
          pv: '1.00',
          sv:'10.00',
          upLimmit:'10.0',
          lowLimmit:'1.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },{
          name: '采样探头2',
          pv: '5.00',
          sv:'10.00',
          upLimmit:'0.0',
          lowLimmit:'0.0',
          isAlarm:'无',
          Light:'无',
          status: '禁用'
        },{
          name: '伴热管2',
          pv: '1.00',
          sv:'10.00',
          upLimmit:'10.0',
          lowLimmit:'1.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },{
          name: '采样探头3',
          pv: '5.00',
          sv:'10.00',
          upLimmit:'0.0',
          lowLimmit:'0.0',
          isAlarm:'无',
          Light:'无',
          status: '禁用'
        },{
          name: '伴热管3',
          pv: '1.00',
          sv:'10.00',
          upLimmit:'10.0',
          lowLimmit:'1.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },{
          name: '采样探头4',
          pv: '5.00',
          sv:'10.00',
          upLimmit:'0.0',
          lowLimmit:'0.0',
          isAlarm:'无',
          Light:'无',
          status: '禁用'
        },{
          name: '伴热管4',
          pv: '1.00',
          sv:'10.00',
          upLimmit:'10.0',
          lowLimmit:'1.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },,{
          name: '采样探头5',
          pv: '5.00',
          sv:'10.00',
          upLimmit:'0.0',
          lowLimmit:'0.0',
          isAlarm:'无',
          Light:'无',
          status: '禁用'
        },{
          name: '伴热管5',
          pv: '1.00',
          sv:'10.00',
          upLimmit:'10.0',
          lowLimmit:'1.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },,{
          name: '采样探头6',
          pv: '5.00',
          sv:'10.00',
          upLimmit:'0.0',
          lowLimmit:'0.0',
          isAlarm:'无',
          Light:'无',
          status: '禁用'
        },{
          name: '伴热管6',
          pv: '1.00',
          sv:'10.00',
          upLimmit:'10.0',
          lowLimmit:'1.0',
          isAlarm:'是',
          Light:'无',
          status: '启用'
        },]
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
