<template>
  <div>
    <el-dialog :visible.sync="dialogAtlasVisible" :show-close="false" :close-on-click-modal="false" @open="open" >
      <span style="font-size:20px"><i class="el-icon-menu" />图谱生成</span>
      <hr>
       <el-row >
          <el-col :span="24">
                <div id="myChart" style="width:100%;height:300px" ></div>
          </el-col>
        </el-row>
        <el-row :gutter="50" style="margin-top:20px">
          <el-col :span="4" :offset="8">
              <el-button type="primary" @click="submitForm">保存</el-button>
          </el-col>
          <el-col :span="3">
              <el-button @click="CloseForm()">关闭</el-button>
          </el-col>
        </el-row> 
    </el-dialog>  
  </div>
</template>

<script>
import store from '@/store'
 import echarts from 'echarts'

export default {
  name: 'Atlas',
  props: {
    dialogAtlasVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
       up:true,
       value:0.01,
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
  methods: {
      open(){
          this.$nextTick(() => {
              this.option.series[0].data=[]
          // 渲染chart
           var myChart = echarts.init(document.getElementById('myChart'));
            for( let i = 0.0; i<=60.0 ;i=i+0.1){
                  if(i >= 0 && i<=20.0){
                       this.option.series[0].data.push([i,this.value])
                  }
                    if(i > 20 && i < 30 && this.up){
                            this.value += Math.random()*0.02
                            if(this.value > 2){
                                this.value = 1.999
                                this.up = false
                            }
                            this.option.series[0].data.push([i,this.value.toFixed(3)])
                        }
                        if((i > 30 && i < 40 )|| !this.up){
                            this.value -= Math.random()*0.02
                            if(this.value < 0) {
                            this.value = 0.011
                            this.up = true
                            }
                            this.option.series[0].data.push([i,this.value.toFixed(3)])
                        }
                        if(i > 40 && i < 60  ){
                            if(this.value > 0.01) {
                                this.value = 0.011
                                this.up = true
                            }
                            this.option.series[0].data.push([i,this.value.toFixed(3)])
                        }
                        
            }
              myChart.setOption(this.option);

         })
      },
    submitForm() {
     
    },
    CloseForm() {
      this.$emit('closeDialogAtlasVisible')
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