<template>
  <el-tabs class="action-dialog" v-model="activeName">
    <el-tab-pane label="组件行为配置" name="ActionComponent" v-if="addtionalData">
      <ActionComponent :metadata="addtionalData"></ActionComponent>
    </el-tab-pane>
    <el-tab-pane label="基础行为配置" name="ActionMethod">
      <ActionMethod></ActionMethod>
    </el-tab-pane>
    <el-tab-pane label="页面行为配置" name="ActionPage">
      <ActionPage></ActionPage>
    </el-tab-pane>
    <el-tab-pane label="数据行为配置" name="ActionData">
      <ActionData></ActionData>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { IComponentMetadata } from '@/utils/definition/Interfaces'
import { Options, Vue } from 'vue-class-component'
import ActionComponent from './ActionComponent.vue'
import ActionData from './ActionData.vue'
import ActionMethod from './ActionMethod.vue'
import ActionPage from './ActionPage.vue'

@Options({
  props: {
    addtionalData: Object
  },
  components: {
    ActionComponent,
    ActionMethod,
    ActionPage,
    ActionData
  }
})
export default class ActionDialog extends Vue {
  activeName = 'ActionMethod'
  addtionalData!: IComponentMetadata
  beforeCreate() {
    this.activeName = this.addtionalData ? 'ActionComponent' : 'ActionMethod'
  }
  dialogOpen() {
    this.activeName === 'ActionComponent' && (this.activeName = 'ActionMethod')
    this.activeName = this.addtionalData ? 'ActionComponent' : this.activeName
  }
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
