<template>
  <el-tabs class="action-dialog" v-model="activeName">
    <el-tab-pane label="组件行为配置" name="ActionComponent">
      <ActionComponent :metadata="data"></ActionComponent>
    </el-tab-pane>
    <el-tab-pane label="基础行为配置" name="ActionMethod">
      <ActionMethod :metadata="data"></ActionMethod>
    </el-tab-pane>
    <el-tab-pane label="页面行为配置" name="ActionPage">
      <ActionPage :metadata="data"></ActionPage>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ActionComponent from './ActionComponent.vue'
import ActionMethod from './ActionMethod.vue'
import ActionPage from './ActionPage.vue'

@Options({
  props: {
    data: Object
  },
  components: {
    ActionComponent,
    ActionMethod,
    ActionPage
  }
})
export default class ActionDialog extends Vue {
  activeName = 'ActionComponent'
}
</script>

<style lang="scss">
.el-dialog {
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      z-index: 10;
    }
  }
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .el-tree {
    height: 65vh;
    overflow-y: auto;
    .el-tree-node {
      .el-tree-node__content {
        height: 36px !important;
        border-bottom: 1px dashed #eee;
      }
    }
  }
}
</style>
