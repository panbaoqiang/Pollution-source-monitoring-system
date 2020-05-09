<template>
  <div>
      <div style="width:30%;height:380px;float:left">
               <div>
                  <el-table
                        :row-style="{height:0+'px'}"
                        :cell-style="{padding:0+'px'}"
                        :data="analysicData"
                        border
                        :show-header="false">
                              <el-table-column
                              prop="attr"
                              align="center"
                            >
                            </el-table-column>
                            <el-table-column
                              prop="value"
                              align="center"
                            >
                            </el-table-column>
                </el-table >
               </div>
             <div style="margin-top:1px;width:100%background:yellow">
                    <el-table
                     :row-class-name="tableRowClassName"
                     height="280px"
                      :data="tableData"
                      border
                      style="width: 100%"
                      :header-cell-style="{
                            'background-color': '#F2F6FC',
                            'color': 'rgb(103, 194, 58)',
                            'border-bottom': '1px rgb(103, 194, 58) solid',
                            'border-top': '1px rgb(103, 194, 58) solid'
                      }"
                      >
                      <el-table-column
                        prop="eventName"
                        label="事件名称"
                         align="center"
                        >
                      </el-table-column>
                      <el-table-column
                        prop="times"
                        label="次数"
                         align="center"
                        >
                      </el-table-column>
                    </el-table>
             </div>
      </div>
      <div style="width:70%;height:380px;float:left">
                <div id="myChart" style="height:350px;padding:10px;"></div>
                <div style="height:30px;line-height:30px;text-align:center;font-family: 微软雅黑">{{this.channelList[this.channelIndex]}}</div>
      </div>
      <div style="width:100%;float:left;margin-top:20px">
        <el-card>
              <el-table
              :data="tableDatax"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="化合物名称"
                >
              </el-table-column>
              <el-table-column
                prop="ch1"
                label="通道1"
                >
              </el-table-column>
              <el-table-column
                prop="ch2"
                label="通道2">
              </el-table-column>
              <el-table-column
                prop="ch3"
                label="通道3">
              </el-table-column>
              <el-table-column
                prop="ch4"
                label="通道4">
              </el-table-column>
              <el-table-column
                prop="ch5"
                label="通道5">
              </el-table-column>
              <el-table-column
                prop="ch6"
                label="通道6">
              </el-table-column>
            </el-table>
       </el-card>
      </div>
       
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
 import echarts from 'echarts/lib/echarts'
 
 // 再引入你需要使用的图表类型，标题，提示信息等
 import 'echarts/lib/chart/bar'
 import 'echarts/lib/component/legend'
 import 'echarts/lib/component/title'
 
export default {
  name: 'Analysic',
  data() {
      return {
              up:true,
              interval:'',
              channelIndex: 0,
              channelList: ['通道1','通道2','通道3','通道4','通道5','通道6'],
              time:0.0,
              value:0.01,
              analysicData: [
              {
                attr:'取样通道',
                value:'通道3'
              },
              {
                attr:'时间',
                value:'20.0'
              },
              {
                attr:'讯号',
                value:'0.625'
              }
            ],
        tableData: [{
          eventName: 'ch1分析',
          times: '∞',
        }, {
          eventName: 'ch2分析',
          times: '∞',
        }, {
          eventName: 'ch3分析',
          times: '∞',
        }, {
          eventName: 'ch4分析',
          times: '∞',
        }, {
          eventName: 'ch5分析',
          times: '∞',
        }, {
          eventName: 'ch6分析',
          times: '∞',

        }],
         tableDatax: [{
            name: '甲烷',
            ch1: '',
            ch2: '',
            ch3: '',
            ch4: '',
            ch5: '',
            ch6: '',
          }],
        option:{
                    tooltip : {
                    trigger: 'axis'
                    },
                    toolbox: {
                    show : true,
                    feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                    }
                    },
                    xAxis : [
                    {
                      type : 'value',
                      min: 0,
                      max: 60,
                      interval:2,
                      name:'秒',
                    }
                    ],
                    yAxis : [
                    {
                      type : 'value',
                      splitArea : {show : true},
                      min: 0,
                      max: 2,
                      interval:0.2,
                      name:'V',
                    }
                    ],
                    series : [
                      {
                          name:'讯号值',
                          type:'line',
                          data:[],
                          showSymbol: false,
                          hoverAnimation: false,
                      }
                    ]
              }
     }
  },
  mounted(){
          var myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption(this.option);
            this.interval = setInterval(() => {
            this.time+=0.1
            if(Math.round(this.time) === 60){
                  switch(this.channelIndex){
                    case 0: this.tableDatax[0].ch1 = (Math.random()*5).toFixed(2);break;
                    case 1: this.tableDatax[0].ch2 = (Math.random()*5).toFixed(2);break;
                    case 2: this.tableDatax[0].ch3 = (Math.random()*5).toFixed(2);break;
                    case 3: this.tableDatax[0].ch4 = (Math.random()*5).toFixed(2);break;
                    case 4: this.tableDatax[0].ch5 = (Math.random()*5).toFixed(2);break;
                    case 5: this.tableDatax[0].ch6 = (Math.random()*5).toFixed(2);break;
                  }
                  this.channelIndex = (this.channelIndex+1)%6;
                  this.time = 0
                  this.option.series[0].data = []
                  this.value = 0.01         
            }
            if(this.time > 20 && this.time < 30 && this.up){
                this.value += Math.random()*0.02
                if(this.value > 2){
                  this.value = 1.999
                  this.up = false
                }
            }
            if((this.time > 30 && this.time < 40 )|| !this.up){
                this.value -= Math.random()*0.02
                if(this.value < 0) {
                  this.value = 0.011
                  this.up = true
                }
            }
            if(this.time > 40 && this.time < 60 && this.value > 0.01 ){
                   this.value -= Math.random()*0.02
                    if(this.value < 0) {
                     this.value = 0.01
                }
            }
            this.option.series[0].data.push([this.time,this.value.toFixed(3)])
              myChart.setOption(this.option);
            this.analysicData = [
              {
                attr:'取样通道',
                value:this.channelList[this.channelIndex]
              },
              {
                attr:'时间',
                value:this.time.toFixed(1)
              },
              {
                attr:'讯号',
                value:this.value.toFixed(3)
              }
            ]
      },100);

            

    },
    destroyed(){
      window.clearInterval(this.interval)
    },
  methods:{
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 1) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
        return '';
      }
  }
}
</script>

<style lang="scss">
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background:white;
  }
  .el-table, .el-table th{
    padding: 12px !important
  }
*::-webkit-scrollbar {width:7px; height:10px; background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
*::-webkit-scrollbar-track {background-color:#f0f6ff;  } /*定义滚动条轨道 内阴影+圆角*/
*::-webkit-scrollbar-thumb {background-color:#DCDFE6; border-radius:6px;} /*定义滑块 内阴影+圆角*/
.scrollbarHide::-webkit-scrollbar{display: none}
.scrollbarShow::-webkit-scrollbar{display: block}
</style>
