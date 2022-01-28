<template>
  <div class="action-page">
    <el-tree
      :data="pageTree"
      :props="{ value: 'name', label: 'label', children: 'actions' }"
      node-key="name"
      :default-expand-all="true"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-node">
          <span class="bold">{{ node.label || data.name }}</span>
          <el-icon
            v-if="!data.actionType"
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
import { ActionName } from '@/utils/const'
import { IAction } from '@/core/definition/Interfaces'
import designer from '@/core/designer'
import { ActionTypeEnum } from '@/utils/enums'
import { reactive } from 'vue'
import { Options, Vue } from 'vue-class-component'
import ActionTemplate from './ActionTemplate.vue'

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
    this.currentAction = data.actionType ? data : null
  }

  add(node: any, data: any) {
    const action = reactive({
      name: 'action' + data.actions.length,
      label: ActionName[ActionTypeEnum.METHOD].name,
      actionType: ActionTypeEnum.METHOD,
      returnVal: false
    })
    data.children = data.children || []
    data.actions.push(action)
    data.children.push(action)
    this.currentAction = action
    node.expand()
  }

  remove(node: any, data: any) {
    const children = node.parent.data.actions
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
