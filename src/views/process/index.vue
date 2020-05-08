<template>
  <div>
    <el-row :gutter="50">
        <el-col :span="6" :offset="1">
             <el-button type="primary" style="width:150px;height:60px" @click="dialogAddRProcessVisible = true">新建进程</el-button>
        </el-col>
        <el-col :span="6">
             <el-button type="primary" style="width:150px;height:60px" plain :disabled="!value">自动排程</el-button>
        </el-col>
        <el-col :span="6">
             <el-button type="primary" style="width:150px;height:60px" plain :disabled="!value">手动排程</el-button>
        </el-col>
        <el-col :span="4">
             <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="grey"
                active-text="开启"
                inactive-text="关闭"
                :width="60"
                style="margin-top:25px"
                >
              </el-switch>
        </el-col>
    </el-row>
    <div>
              <el-table
              :cell-style="cellStyle"
              :data="tableData"
              stripe
              style="width: 100%;margin-top:30px">
              <el-table-column
                prop="type"
                label="进程类别"
                width="200"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="进程名称"
                width="200"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="enName"
                label="英文名称"
                width="200"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="gap"
                label="通道选择器"
                width="200"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                >
                   <el-link  type="warning" style="margin-left:20px" ><i class="el-icon-edit" />编辑</el-link>
                   <el-link  type="danger" style="margin-left:20px" ><i class="el-icon-delete" />删除</el-link>
              </el-table-column>
            </el-table>
    </div>
     <processAdd :dialogAddRProcessVisible="dialogAddRProcessVisible" @closeDialogAddProcessVisible="dialogAddRProcessVisible=false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import processAdd from './component/processAdd'
export default {
  name: 'Process',
  components:{
     processAdd
  },
  methods:{
    cellStyle({ row, rowIndex, columnIndex }) {
      return 'height:40px;'
    },
  },
    data() {
      return {
        dialogAddRProcessVisible:false,
        value: false,
          tableData: [{
          type: '分析进程',
          name: 'ch_1分析',
          enName: 'ch_1_analysic',
          gap: '1'
        }, {
          type: '分析进程',
          name: 'ch_2分析',
          enName: 'ch_3_analysic',
          gap: '2'
        }, {
           type: '分析进程',
          name: 'ch_3分析',
          enName: 'ch_3_analysic',
          gap: '3'
        },
        {
           type: '分析进程',
          name: 'ch_4分析',
          enName: 'ch_4_analysic',
          gap: '4'
        },{
           type: '分析进程',
          name: 'ch_5分析',
          enName: 'ch_5_analysic',
          gap: '5'
        },{
           type: '分析进程',
          name: 'ch_6分析',
          enName: 'ch_6_analysic',
          gap: '6'
        }
        , {
           type: '反吹进程',
          name: 'ch_1返回',
          enName: 'ch_1_purge',
          gap: '1'
        }, {
           type: '反吹进程',
          name: 'ch_2返回',
          enName: 'ch_2_purge',
          gap: '2'
        }, {
           type: '反吹进程',
          name: 'ch_3返回',
          enName: 'ch_3_purge',
          gap: '3'
        }, {
           type: '反吹进程',
          name: 'ch_4返回',
          enName: 'ch_4_purge',
          gap: '4'
        }, {
           type: '反吹进程',
          name: 'ch_5返回',
          enName: 'ch_5_purge',
          gap: '5'
        }, {
           type: '反吹进程',
          name: 'ch_6返回',
          enName: 'ch_6_purge',
          gap: '6'
        }]
      }
    }
}
</script>

<style lang="scss" scoped>
.el-switch__core {
    height: 60px;// 重置
}
</style>
