<template>
  <div class="action-page">
    <el-tree
      :data="pageTree"
      :props="{ value: 'name', label: 'label', children: 'children' }"
      node-key="name"
      :default-expand-all="true"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-node">
          <span class="bold">{{ node.label || data.name }}</span>
          <el-icon
            v-if="data.actionType === undefined"
            @click.stop="add(node, data)"
            color="#409eff"
            size="16"
            style="margin-left: 10px"
          >
            <circle-plus />
          </el-icon>
          <el-icon v-else @click.stop="remove(node, data)" color="red" size="16" style="margin-left: 10px">
            <delete />
          </el-icon>
        </div>
      </template>
    </el-tree>
    <div class="detail">
      <template v-if="currentAction">
        <ActionTemplate :action="currentAction"></ActionTemplate>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { IAction } from '@/core/Interfaces'
import designer from '@/core/designer'
import { isReactive, reactive } from 'vue'
import { Options, Vue } from 'vue-class-component'
import ActionTemplate from './ActionTemplate.vue'
import { newAction } from '@/utils/component-util'

@Options({
  components: {
    ActionTemplate
  }
})
export default class ActionPage extends Vue {
  currentAction: IAction | null = null
  pageTree: any[] = []

  mounted(): void {
    this.pageTree = reactive([
      { name: 'watches', label: '页面监听(watches)', actions: designer.pageMetadata.watches },
      ...designer.pageMetadata.lifecycle
    ])
  }

  nodeClick(data: IAction) {
    this.currentAction = data.actionType !== undefined ? data : null
  }

  add(node: any, data: any) {
    const action = reactive(newAction('action' + data.actions.length))
    data.actions = data.children = data.children || []
    data.children.push(action)
    this.currentAction = action
    node.expand()
  }

  remove(node: any, data: any) {
    const children = node.parent.data.children
    console.log(children.indexOf(data), 1)
    children.splice(children.indexOf(data), 1)
  }
}
</script>

<style lang="scss" scoped>
.action-page {
  display: flex;
  .el-tree {
    width: 300px;
    border: 1px solid #f2f2f2;
  }
  .detail {
    margin-left: 20px;
    border: 1px solid #f2f2f2;
    background: #f6f9ff;
    position: relative;
    flex: 1;
    text-align: left;
    padding: 10px 20px;
    height: 63vh;
  }
}
</style>
