<template>
  <div>
    <el-row :gutter="50">
        <el-col :span="6" :offset="1">
             <el-button type="primary" style="width:150px;height:60px">新建进程</el-button>
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
              :data="tableData"
              stripe
              style="width: 100%;margin-top:20px">
              <el-table-column
                prop="date"
                label="日期"
                width="180"
                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                label="地址"
                 align="center"
                >
                xxx
              </el-table-column>
            </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Process',
    data() {
      return {
        value: false,
          tableData: [{
          type: '2016-05-02',
          name: '王小虎',
          enName: '上海市普陀区金沙江路 1518 弄',
          gap: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
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
