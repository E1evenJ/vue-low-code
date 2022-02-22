<template>
  <div class="action-component">
    <el-tree
      :data="eventsTree"
      :props="{ value: 'name', label: 'label', children: 'children' }"
      node-key="name"
      ref="treeRef"
      :default-expand-all="true"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-node">
          <span class="bold">{{ node.label }}</span>
          <el-icon v-if="data.isRoot" @click.stop="add(node, data)" color="#409eff" size="16" style="margin-left: 10px">
            <circle-plus />
          </el-icon>
          <el-icon v-else @click.stop="remove(node, data)" color="#F56C6C" size="16" style="margin-left: 10px">
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
import { Options, Vue } from 'vue-class-component'
import ActionTemplate from './ActionTemplate.vue'
import { IAction, IComponentMetadata, IEvent, IEventDescreptor } from '@/core/Interfaces'
import { getComponentDescriptor } from '@/core/definition/ComponentDescriptorFactory'
import { newAction } from '@/utils/attr-util'

@Options({
  components: {
    ActionTemplate
  },
  props: {
    metadata: Object
  },
  watch: {
    metadata() {
      this.init(this.metadata)
    }
  }
})
export default class ActionComponent extends Vue {
  eventsTree: IEvent[] = []
  currentAction: IAction | null = null
  treeRef: any = null
  declare metadata: IComponentMetadata
  mounted() {
    this.init(this.metadata)
  }

  init(metadata: IComponentMetadata) {
    metadata.events = metadata.events || []
    const compDesc = getComponentDescriptor(metadata.type)
    this.eventsTree = compDesc.eventDescs.map((item: IEventDescreptor) => {
      const event = this.metadata.events?.find(event => event.name === item.key)
      if (event) {
        event.isRoot = true
      }
      return event || { name: item.key, label: item.value, isRoot: true, children: [] }
    })
  }

  add(node: any, data: IEvent) {
    let event = this.eventsTree.find((event: IEvent) => event.name === data.name)
    if (event) {
      const action = newAction(event?.name + event?.children?.length)
      event?.children?.push(action)
      this.currentAction = this.currentAction || action
      this.metadata?.events?.indexOf(event as IEvent) === -1 && this.metadata?.events.push(event as IEvent)
      event && event.children && this.treeRef.setCurrentKey(`click${event.children.length - 1}`)
      node.expand()
    }
  }

  nodeClick(data: IAction) {
    if (Reflect.getOwnPropertyDescriptor(data, 'actionType') !== undefined) this.currentAction = data as IAction
  }

  remove(node: any, data: IEvent) {
    const children = node.parent.data.children
    children.splice(children.indexOf(data), 1)
  }
}
</script>

<style lang="scss" scoped>
.action-component {
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
    padding: 10px 20px;
  }
  .custom-node {
    font-size: 13px;
    color: #999;
    display: flex;
    .bold {
      font-weight: 700;
    }
  }
}
</style>
