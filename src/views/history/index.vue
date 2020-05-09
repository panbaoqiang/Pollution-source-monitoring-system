<template>
  <div >
      <el-row>
          <el-col :span="2" style="line-height:38px" :offset="1">
            时间区间：
          </el-col>
          <el-col :span="10">
               <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-col>
          <el-col :span="2" style="line-height:38px">
            <el-button type="primary" >查询</el-button>
          </el-col>
      </el-row>
      <el-row>
        <el-col>
              <el-table
              :data="tableData"
              stripe
              style="width: 100%;margin-top:30px"
              height="293px"
              >
              <el-table-column
                prop="time"
                label="时间"

                align="center"
                >
              </el-table-column>
              <el-table-column
                prop="name"
                label="化合物名称"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="gap"
                label="通道"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="area"
                label="面积值"
                 align="center"
                >
              </el-table-column>
                <el-table-column
                prop="retention"
                 label="滞留时间"
                 align="center"
                >
              </el-table-column>
                <el-table-column
                prop="processName"
                label="进程名称"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                >
                   <el-link  type="warning" style="margin-left:20px" @click="dialogAtlasVisible = true" ><i class="el-icon-edit" />生成图谱</el-link>
              </el-table-column>
            </el-table>
        </el-col>
      </el-row>
       <el-row style="margin-top:50px">
        <el-col :offset="6">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="100">
            </el-pagination>
        </el-col>
      </el-row>
      <Atlas :dialogAtlasVisible = "dialogAtlasVisible" @closeDialogAtlasVisible="dialogAtlasVisible = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Atlas from './component/atlas'
 import echarts from 'echarts'
export default {
  name: 'History',
  components:{Atlas},
    data() {
      return {
        dialogAtlasVisible:false,
        value1: [new Date(2019, 10, 10, 10, 10), new Date(2019, 10, 11, 10, 10)],
          tableData: [{
          time: '2020-04-23 15:32:24.0',
          name: '甲烷',
          gap: '1',
          area:4.051428,
          retention:13,
          processName:'ch1分析'
        }, {
         time: '2020-04-23 15:32:25.0',
          name: '甲烷',
          gap: '2',
          area:4.002346,
          retention:13,
          processName:'ch2分析'
        }, {
           time: '2020-04-23 15:32:26.0',
          name: '甲烷',
          gap: '3',
          area:4.099941,
          retention:13,
          processName:'ch3分析'
        },
        {
        time: '2020-04-23 15:32:27.0',
          name: '甲烷',
          gap: '4',
          area:4.150046,
          retention:13,
          processName:'ch4分析'
        },{
        time: '2020-04-23 15:32:32.0',
          name: '甲烷',
          gap: '5',
          area:4.290044,
          retention:13,
          processName:'ch5分析'
        }]
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
