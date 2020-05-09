<template>
  <div >
     <el-row>
        <el-col :span="12" :offset="5" style="padding:20px">

          <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="串口地址">
                <el-input v-model="form.SerialPort"></el-input>
              </el-form-item>
              <el-form-item label="波特率">
                <el-input v-model="form.baudRate"></el-input>
              </el-form-item>
              <el-form-item label="校验位">
                <el-input v-model="form.checkBit"></el-input>
              </el-form-item>      
              <el-form-item label="数据位">
                <el-input v-model="form.dataBits"></el-input>
              </el-form-item>
              <el-form-item label="停止位">
                <el-input v-model="form.stopBit"></el-input>
              </el-form-item>  
          <el-form-item> 
            <el-button style="margin-left:150px;width:100px" type="primary" @click="onSubmit">更新</el-button>
          </el-form-item>
        </el-form>
        </el-col>
     </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

 export default {
    data() {
      return {
        form: {
          SerialPort: 'COM7',
          baudRate: '9600',
          checkBit: 'even',
          dataBits: '8',
          stopBit: '1'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
