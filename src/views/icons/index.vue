<template>
<div>
  <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
  <el-dialog
  title="图标"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose">
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
</el-dialog>
</div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'

export default {
  name: 'Icons',
  data() {
    return {
      svgIcons,
      dialogVisible: false
    }
  },
  methods: {
    handleClipboard(text, event) {
      clipboard(text, event)
    },
      handleClose(done) {
         done();
      }
  }
}
</script>

<style lang="scss" scoped>
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
