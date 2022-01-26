<template>
  <draggable
    class="drag-box el-row"
    tag="div"
    :list="children"
    :sort="true"
    :group="{ name: 'g1' }"
    animation="150"
    ghost-class="ghost-class"
    handle=".drag-box"
    :fallbackOnBody="true"
    :invertSwap="true"
    :swapThreshold="0.75"
    @add="add"
  >
    <component
      :is="child.type"
      v-for="child in children"
      :key="child.uuid"
      v-bind="{ uuid: child.uuid, type: child.type, attrs: child.attrs }"
      class="list-item el-col"
    >
      <nested-draggable :children="child.children" />
    </component>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Panel from './draw-items/Panel.vue'
import Page from './draw-items/Page.vue'
import Input from './draw-items/Input.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import designer from '@/utils/designer'

@Options({
  name: 'nested-draggable',
  props: {
    children: {
      required: true,
      type: Array
    }
  },
  components: {
    'di-page': Page,
    'di-panel': Panel,
    'di-input': Input,
    draggable: VueDraggableNext
  }
})
export default class Container extends Vue {
  add(evt: any) {
    designer.treeHandler.add(evt.newIndex)
  }
}
</script>

<style lang="scss" scoped>
.dragArea {
  margin: 0;
  padding: 0;
  width: 100%;
}
.drag-box {
  width: 100%;
  // margin: 10px;
  align-content: center;
  align-items: flex-end;
}
.el-col + .el-col {
  margin-top: 10px;
}
.list-item {
}
.el-col {
  .el-row {
    padding: 12px 20px;
  }
}
</style>
