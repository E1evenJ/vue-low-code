<template>
  <div class="action-component">
    <el-tree
      :data="eventsTree"
      :props="{ value: 'name', label: 'label', children: 'children' }"
      node-key="name"
      ref="treeRef"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-node">
          <span class="bold">{{ node.label }}</span>
          <el-icon v-if="data.isRoot" @click.stop="add(data)" color="#409eff" size="16" style="margin-left: 10px">
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
import { IEventDescreptor } from '@/utils/definition/EventDescreptor'
import { ActionTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'
import { ActionName } from '@/utils/const'
import ActionTemplate from './ActionTemplate.vue'
import { IAction, IComponentMetadata, IEvent } from '@/utils/definition/Interfaces'

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
  metadata!: IComponentMetadata
  mounted() {
    this.init(this.metadata)
  }

  init(metadata: IComponentMetadata) {
    metadata.events = metadata.events || []
    this.eventsTree = metadata.desc.eventDescs.map<IEvent>((item: IEventDescreptor) => {
      const event = this.metadata.events?.find(event => event.name === item.key)
      if (event) {
        event.isRoot = true
      }
      return event || { name: item.key, label: item.value, isRoot: true, children: [] }
    })
  }

  add(node: IEvent) {
    let event = this.eventsTree.find((event: IEvent) => event.name === node.name)
    if (event) {
      const action = {
        name: event?.name + event?.children?.length,
        label: ActionName[ActionTypeEnum.METHOD].name,
        actionType: ActionTypeEnum.METHOD,
        returnVal: false
      }
      event?.children?.push(action)
      this.currentAction = this.currentAction || action
      this.metadata?.events?.indexOf(event as IEvent) === -1 && this.metadata?.events.push(event as IEvent)
      event && event.children && this.treeRef.setCurrentKey(`click${event.children.length - 1}`)
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
