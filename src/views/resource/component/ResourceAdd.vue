<template>
  <div>
    <el-dialog :visible.sync="dialogAddResourceVisible" :show-close="false" :close-on-click-modal="false"  >
      <span style="font-size:20px"><i class="el-icon-menu" />新增资源</span>
      <hr>
      <el-form ref="ruleForm" :model="resource" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="节点名称" prop="name">
            <el-input v-model="resource.name" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="节点组件" prop="component">
                <el-select v-model="resource.component" placeholder="请选择组件" style="width:250px">
                  <el-option
                    v-for="item in componentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                   <span style="float: left">{{ item.label }}</span>
                   <span :title="item.value" style="max-width: 150px;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="父亲节点" prop="parentId">
               <el-select v-model="resource.parentId" placeholder="请选择父亲资源菜单" style="width:250px">
                  <el-option
                    v-for="item in parentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                   <span style="float: left">{{ item.label }}</span>
                   <span :title="item.value" style="max-width: 150px;display: block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="path" prop="path">
              <el-input v-model="resource.path" style="width:250px" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="9" :offset="4">
              <el-form-item label="图标" prop="icon">
                <el-input v-model="resource.icon" style="width:150px" /> 
              </el-form-item>
          </el-col>
          <el-col :span="4">
                 <el-button @click="openIcon" style="width:100px;height:40px"></el-button>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4">
            <el-form-item label="资源类型" prop="resourceType">
              <el-select v-model="resource.resourceType" placeholder="请选择菜单类型" style="width:250px">
                <el-option v-for="item in resourceType" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="8" :offset="4"><el-form-item label="备注" prop="remark">
            <el-input v-model="resource.remark" style="width:250px" />
          </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="10" :offset="4">
            <el-form-item label="是否叶子节点" prop="leaf">
              <el-radio-group v-model="resource.leaf">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="50">
          <el-col :span="4" :offset="4">
            <el-form-item>
              <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button @click="CloseForm()">关闭</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
            <el-dialog
                :append-to-body="true"
                title="图标"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
              <el-scrollbar style="height:250px;">
                <div class="icons-container">
                      <div class="grid">
                        <div v-for="item of svgIcons" :key="item" @click="handleClipboard(item,$event)">
                          <el-tooltip placement="top">
                            <div slot="content">
                              {{ item }}
                            </div>
                            <div class="icon-item">
                              <svg-icon :icon-class="item" class-name="disabled" />
                            </div>
                          </el-tooltip>
                        </div>
                      </div>
                </div>
                </el-scrollbar>
              </el-dialog>
          

    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
export default {
  name: 'ResourceAdd',
  props: {
    dialogAddResourceVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svgIcons,
      dialogVisible: false,
      componentOptions: [],
      parentOptions: [],
      resourceType: [{
        value: 1,
        label: '菜单'
      }, {
        value: 2,
        label: '操作'
      }
      ],
      resource: {
        name: '',
        component: '',
        parentId: '',
        path: '/',
        icon: '',
        resourceType: '',
        remark: '',
        leaf: 1
      }
    }
  },
  methods: {
    submitForm() {
      store.dispatch('resource/AddResource', this.resource).then(() => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          setTimeout(() => { location.reload() }, 2000)
      }).catch(error => {
            this.$message({
              type: 'error',
              message: error.message
            })
            setTimeout(() => { location.reload() }, 2000)
      })
    },
    CloseForm() {
      this.$emit('closeDialogAddResourceVisible')
    },
    resetResource(){
        this.resource.name ='',
        this.resource.component='',
        this.resource.parentId='',
        this.resource.path = '',
        this.resource.icon = '',
        this.resource.resourceType = '',
        this.resource.remark = '',
        this.resource.leaf = 1
    },
   handleClipboard(text, event) {
     this.resource.icon = text
     this.dialogVisible = false
    },
      handleClose(done) {
         done();
      },
    openIcon(){
      this.dialogVisible = true;
    }
  },
  watch:{
    dialogAddResourceVisible:async function(newVal,oldVal) {
        if(newVal){ 
        this.resetResource()
        await store.dispatch('resource/getAllComponent').then(res => {
            const newConponent = res.data.map(item => {
              return {
                label: item.name,
                value: item.component
              }
            })
            this.componentOptions = newConponent
        }).catch(error => {
            this.$message({
              type: 'error',
              message: error.message
            })
             setTimeout(() => { location.reload() }, 2000)
         })

         
        await store.dispatch('resource/getAllMenuResource').then(res => {
            const newParentMenu = res.data.map(item => {
              return {
                label: item.name,
                value: item.id
              }
            })
            newParentMenu.push({
               label: "顶层菜单",
                value: "0"
            })
            this.parentOptions = newParentMenu
        }).catch(error => {
            this.$message({
            type: 'error',
              message: error.message
          })
           setTimeout(() => { location.reload() }, 2000)
       })
    }
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
</style>
