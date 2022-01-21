<template>
  <div class="action-component">
    <el-tree
      :data="eventsTree"
      :props="{ value: 'eventName', label: 'label', children: 'children' }"
      node-key="eventName"
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
import { Action, Event, RenderTree } from '@/utils/render-tree'
import { Options, Vue } from 'vue-class-component'
import { ActionName } from '@/utils/const'
import ActionTemplate from './ActionTemplate.vue'

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
  eventsTree: Event[] = []
  currentAction: Action | null = null
  treeRef: any = null
  metadata!: RenderTree
  mounted() {
    this.init(this.metadata)
  }

  init(metadata: RenderTree) {
    metadata.events = metadata.events || []
    this.eventsTree = metadata.desc.eventDescs.map<Event>((item: IEventDescreptor) => {
      const event = this.metadata.events?.find(event => event.eventName === item.key)
      if (event) {
        event.isRoot = true
      }
      return event || { eventName: item.key, label: item.value, isRoot: true, children: [] }
    })
  }

  add(node: Event) {
    let event = this.eventsTree.find((event: Event) => event.eventName === node.eventName)
    if (event) {
      const action = {
        eventName: event?.eventName + event?.children?.length,
        label: ActionName[ActionTypeEnum.METHOD].name,
        actionType: ActionTypeEnum.METHOD,
        returnVal: false
      }
      event?.children?.push(action)
      this.currentAction = this.currentAction || action
      this.metadata?.events?.indexOf(event as Event) === -1 && this.metadata?.events.push(event as Event)
      console.log(this.eventsTree)
      event && event.children && this.treeRef.setCurrentKey(`click${event.children.length - 1}`)
    }
  }

  nodeClick(data: Action) {
    if (Reflect.getOwnPropertyDescriptor(data, 'actionType') !== undefined) this.currentAction = data as Action
  }

  remove(node: any, data: Event) {
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
