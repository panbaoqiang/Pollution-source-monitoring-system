<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="通道1" name="通道1">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物监控</p>
        </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               非甲烷总烃讯号
            </div>
            <div class="dashboard-value">{{data1}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               甲烷讯号
            </div>
            <div class="dashboard-value">{{data2}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               总烃讯号
            </div>
            <div class="dashboard-value">{{data3}}</div>
          </div>   
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               旁通讯号
            </div>
            <div class="dashboard-value">{{data4}}</div>
          </div> 
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               氢气讯号
            </div>
            <div class="dashboard-value">{{data5}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               助燃空气讯号
            </div>
            <div class="dashboard-value">{{data6}}</div>
          </div>   
    </el-tab-pane>
    <el-tab-pane label="通道2" name="通道2">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物监控</p>
        </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               非甲烷总烃讯号
            </div>
            <div class="dashboard-value">{{data1}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               甲烷讯号
            </div>
            <div class="dashboard-value">{{data2}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               总烃讯号
            </div>
            <div class="dashboard-value">{{data3}}</div>
          </div>   
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               旁通讯号
            </div>
            <div class="dashboard-value">{{data4}}</div>
          </div> 
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               氢气讯号
            </div>
            <div class="dashboard-value">{{data5}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               助燃空气讯号
            </div>
            <div class="dashboard-value">{{data6}}</div>
          </div>   
    </el-tab-pane>
    <el-tab-pane label="通道3" name="通道3">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物监控</p>
        </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               非甲烷总烃讯号
            </div>
            <div class="dashboard-value">{{data1}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               甲烷讯号
            </div>
            <div class="dashboard-value">{{data2}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               总烃讯号
            </div>
            <div class="dashboard-value">{{data3}}</div>
          </div>   
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               旁通讯号
            </div>
            <div class="dashboard-value">{{data4}}</div>
          </div> 
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               氢气讯号
            </div>
            <div class="dashboard-value">{{data5}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               助燃空气讯号
            </div>
            <div class="dashboard-value">{{data6}}</div>
          </div>   
    </el-tab-pane>
    <el-tab-pane label="通道4" name="通道4">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物监控</p>
        </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               非甲烷总烃讯号
            </div>
            <div class="dashboard-value">{{data1}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               甲烷讯号
            </div>
            <div class="dashboard-value">{{data2}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               总烃讯号
            </div>
            <div class="dashboard-value">{{data3}}</div>
          </div>   
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               旁通讯号
            </div>
            <div class="dashboard-value">{{data4}}</div>
          </div> 
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               氢气讯号
            </div>
            <div class="dashboard-value">{{data5}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               助燃空气讯号
            </div>
            <div class="dashboard-value">{{data6}}</div>
          </div>   
    </el-tab-pane>
    <el-tab-pane label="通道5" name="通道5">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物监控</p>
        </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               非甲烷总烃讯号
            </div>
            <div class="dashboard-value">{{data1}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               甲烷讯号
            </div>
            <div class="dashboard-value">{{data2}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               总烃讯号
            </div>
            <div class="dashboard-value">{{data3}}</div>
          </div>   
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               旁通讯号
            </div>
            <div class="dashboard-value">{{data4}}</div>
          </div> 
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               氢气讯号
            </div>
            <div class="dashboard-value">{{data5}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               助燃空气讯号
            </div>
            <div class="dashboard-value">{{data6}}</div>
          </div>   
    </el-tab-pane>
    <el-tab-pane label="通道6" name="通道6">
        <div class="icon" style="float:left;color:rgba(42, 130, 228, 1);margin-right:15px;margin-top:1px;">
          <i class='el-icon-time' style="font-size: 25px"></i>
        </div>
        <div>
          <p style="font-size:25px;color:rgba(42, 130, 228, 1);font-weight:800;">化合物监控</p>
        </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               非甲烷总烃讯号
            </div>
            <div class="dashboard-value">{{data1}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               甲烷讯号
            </div>
            <div class="dashboard-value">{{data2}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               总烃讯号
            </div>
            <div class="dashboard-value">{{data3}}</div>
          </div>   
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               旁通讯号
            </div>
            <div class="dashboard-value">{{data4}}</div>
          </div> 
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               氢气讯号
            </div>
            <div class="dashboard-value">{{data5}}</div>
          </div>
         <div class="dashboard">
            <div
              class="dashboard-name"
            >
               助燃空气讯号
            </div>
            <div class="dashboard-value">{{data6}}</div>
          </div>   
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
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
        activeName: '通道1'
      };
    },
    created(){
      this.interval=setInterval(() =>{
        this.data1 = (Math.random()*6).toFixed(2)
        this.data2= (Math.random()*6).toFixed(2)
        this.data3= (Math.random()*6).toFixed(2)
        this.data4= (Math.random()*6).toFixed(2)
        this.data5=  (Math.random()*6).toFixed(2)
        this.data6= (Math.random()*6).toFixed(2)

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
