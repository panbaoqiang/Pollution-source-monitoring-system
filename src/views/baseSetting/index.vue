<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="挡位切换" name="挡位切换">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">挡位切换</p>
        </div>
         <el-row>
          <el-col :span="6" :offset="3" style="height:100px;line-height:80px;padding:10px" >
                <button id="a" @click="changeColor('a')" style="background:#8AC622;width:200px;height:80px;font-family: 微软雅黑;border-radius:25px;outline: none;">10G</button>
          </el-col>
          <el-col :span="6" :offset="3">
               <button id="b" @click="changeColor('b')" style="background:#909399;width:200px;height:80px;font-family: 微软雅黑;border-radius:25px;outline: none;">1G</button>
          </el-col>
      </el-row>
               <el-row>
          <el-col :span="6" :offset="3" style="height:100px;line-height:80px;padding:10px" >
                <button id="c" @click="changeColor('c')" style="background:#909399;width:200px;height:80px;font-family: 微软雅黑;border-radius:25px;outline: none;">100M</button>
          </el-col>
          <el-col :span="6" :offset="3">
               <button id="d" @click="changeColor('d')" style="background:#909399;width:200px;height:80px;font-family: 微软雅黑;border-radius:25px;outline: none;">10M</button>
          </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="通道管理" name="通道管理">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">通道管理</p>
        </div>
      <el-row>
          <el-col :span="24" >
              <el-table
              :data="tableData"
              stripe
              >
              <el-table-column
                prop="name"
                label="通道名称"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="chemcial"
                label="测量化合物"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                >
                   <el-link  type="warning" style="margin-left:20px" ><i class="el-icon-edit" />编辑</el-link>
              </el-table-column>
            </el-table>
          </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="化合物管理" name="化合物管理">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物管理</p>
        </div> 
          <el-link  type="primary" ><i class="el-icon-plus" />增加化合物</el-link>
           <el-row>
          <el-col :span="24" >
              <el-table
              :data="tableData2"
              stripe
              >
              <el-table-column
                prop="name"
                label="通道名称"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"

                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="start"
                label="开始秒数"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                prop="end"
                label="结束秒数"
                 align="center"
                >
              </el-table-column>
              <el-table-column
                  prop="limit"
                  label="浓度上限"
                  align="center"
                >
              </el-table-column>
              <el-table-column
                label="操作"
                 align="center"
                >
                   <el-link  type="warning" style="margin-left:20px" ><i class="el-icon-edit" />编辑</el-link>
              </el-table-column>
            </el-table>
          </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        activeName: '挡位切换',
          tableData: [{
          name: '通道1',
          chemcial: '甲烷，乙烷',
          status:'开启'
        }, {
          name: '通道2',
          chemcial: '甲烷，乙烷',
          status:'开启'
        }, {
          name: '通道3',
          chemcial: '甲烷，乙烷',
          status:'开启'
        },
        {
          name: '通道4',
          chemcial: '甲烷，乙烷',
          status:'开启'
        },{
          name: '通道5',
          chemcial: '甲烷，乙烷',
          status:'开启'
        },{
          name: '通道6',
          chemcial: '甲烷，乙烷',
          status:'开启'
        }],
         tableData2: [{
          name: '甲烷',
          unit: 'ppm',
          start:'20',
          end:'30',
          limit: '6.0'
        }, {
          name: '乙烷',
          unit: 'ppm',
          start:'30',
          end:'40',
          limit: '6.0'
        }]
      };
    },
    created(){
        
    },
    destroyed(){
    },
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.name
      },
      changeColor(item){
          document.getElementById('a').style.background = "#909399"
          document.getElementById('b').style.background = "#909399"
          document.getElementById('c').style.background = "#909399"
          document.getElementById('d').style.background = "#909399"
          switch(item){
            case 'a': document.getElementById('a').style.background = "#8AC622";break;
            case 'b': document.getElementById('b').style.background = "#8AC622";break;
            case 'c': document.getElementById('c').style.background = "#8AC622";break;
            case 'd': document.getElementById('d').style.background = "#8AC622";break;
          }
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
