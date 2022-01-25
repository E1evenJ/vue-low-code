<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view />
  <el-dialog
    v-for="dialog in dialogs"
    :key="dialog.uuid"
    :custom-class="
      'custom-dialog ' + (dialog.title === undefined || dialog.title === '' || dialog.title === null ? 'no-header' : '')
    "
    v-model="dialog.visible"
    :title="dialog.title"
    :width="dialog.width"
    :before-close="dialog.beforeClose"
    @opened="opened(dialog)"
    @closed="dialog.closed"
  >
    <component ref="dialogComponent" :is="dialog.dialogComponent" :addtionalData="dialog.data" />
  </el-dialog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { dialogProxy } from '@/utils/dialog'
@Options({})
export default class App extends Vue {
  dialogs = dialogProxy.dialogs
  declare $refs: {
    dialogComponent: any[]
  }
  opened(dialog: any) {
    const index = this.dialogs.indexOf(dialog)
    this.$refs.dialogComponent[index].dialogOpen && this.$refs.dialogComponent[index].dialogOpen()
  }
}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
}
.design-selected {
  outline-color: rgba($color: #409eff, $alpha: 0.6) !important;
}
[uuid]:not(.el-input):not(.el-select):not(.el-cascader).design-selected:not(i):before {
  height: auto !important;
  content: attr(uuid);
  z-index: 600;
  position: absolute;
  top: -22px;
  left: -1px;
  zoom: 0.9;
  font-size: 12px;
  border-radius: 1px;
  background-color: #66b1ff;
  padding: 0 5px;
  color: #fff;
  line-height: 20px;
  width: auto;
}
.el-col + .ghost-class {
  margin-top: 7.5px;
}
.ghost-class + .el-col {
  margin-top: 7.5px;
}
.ghost-class {
  width: 100%;
  height: 50px;
  border: 1px dashed rgba($color: #409eff, $alpha: 0.6);
  background-color: rgba($color: #409eff, $alpha: 0.3);
  * {
    display: none;
  }
  :nth-child(n) {
    display: none;
  }
}
.dragged-item {
  outline: 1px dashed rgba($color: #409eff, $alpha: 0.6);
  background-color: rgba($color: #409eff, $alpha: 0.3);
  height: 30;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: calc(100% - 20px);
  position: absolute;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.attr-item {
  line-height: 30px;
  text-align: left;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  .label {
    width: 100px;
  }
  .attr-right {
    width: 214px;
  }
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #adb3bd;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}
.custom-dialog {
  .el-dialog__header {
    text-align: left;
  }
  &.no-header {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__headerbtn {
      z-index: 10;
    }
  }
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 20px;
  }
}
</style>
