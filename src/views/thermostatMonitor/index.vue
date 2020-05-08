<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="通道1" name="通道1">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">温度监控</p>
        </div>
    </el-tab-pane>
    <el-tab-pane label="通道2" name="通道2">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">温度监控</p>
        </div>
    </el-tab-pane>
    <el-tab-pane label="通道3" name="通道3">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">温度监控</p>
        </div>
    </el-tab-pane>
    <el-tab-pane label="通道4" name="通道4">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">温度监控</p>
        </div> 
    </el-tab-pane>
    <el-tab-pane label="通道5" name="通道5">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">温度监控</p>
        </div>  
    </el-tab-pane>
    <el-tab-pane label="通道6" name="通道6">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">温度监控</p>
        </div>
    </el-tab-pane>
  </el-tabs>
    <div id="myChart" ref="myChart" style="margin-left:50px;width:500px;height:400px;float:left"></div>
    <div id="myChart2" ref="myChart2" style="margin-left:20px;width:500px;height:400px;float:left"></div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
 // 加载echarts，注意引入文件的路径
 import echarts from 'echarts/lib/echarts'
 
 // 再引入你需要使用的图表类型，标题，提示信息等
 import 'echarts/lib/chart/bar'
 import 'echarts/lib/component/legend'
 import 'echarts/lib/component/title'
  export default {
    data() {
      return {
        interval:'',
        data1:1.9,
        data2:2.33,
        data3:0.18,
        data4:1.15,
        data5:4.5,
        data6:3.6,
        activeName: '通道1',
          option2 : {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}℃'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '温度指标',
                        type: 'gauge',
                        detail: {formatter: '{value}℃'},
                        data: [{value: 26.0, name: '烘箱温度'}]
                    }
                ]
         },
        option : {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}℃'
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: '温度指标',
                        type: 'gauge',
                        detail: {formatter: '{value}℃'},
                        data: [{value: 27.0, name: '火焰温度'}]
                    }
                ]
         }
      }
    },
    mounted(){
         var myChart = echarts.init(document.getElementById('myChart'));
         myChart.setOption(this.option);
        var myChart2 = echarts.init(document.getElementById('myChart2'));
         myChart2.setOption(this.option2);
          this.interval = setInterval(() => {
          this.option.series[0].data[0].value = ((Math.random() * 30)+26.5).toFixed(1) - 0;
          myChart.setOption(this.option, true);
          this.option2.series[0].data[0].value = ((Math.random() * 30)+10).toFixed(1) - 0;
          myChart2.setOption(this.option2, true);
      },1000);
    },
    destroyed(){
      window.clearInterval(this.interval)
    },
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.name
        console.log(tab.name);
      }
    }
  };
</script>

<style lang="scss" scoped>
.dashboard {
  margin: 10px 37px;
  width: 300px;
  height: 200px;
  float: left;
   &-name {
    height:30px;
    width:300px;
    line-height:30px;
    background:#20A0FF;
    font-size:20px;
    color:black;
    text-align:center
  }
   &-value {
  font-family: 微软雅黑;
  text-align: center;
  font-size: 40px;
  width:300px;
  height:170px;
  line-height: 170px;
  background: #E8EAEE;
}
}
</style>
