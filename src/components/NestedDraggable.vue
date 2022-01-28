<template>
  <draggable
    class="nest-drag-box el-row"
    tag="div"
    :list="children"
    :sort="true"
    :group="{ name: 'g1', put: putFunc }"
    animation="150"
    ghost-class="ghost-class"
    handle=".nest-drag-box"
    :fallbackOnBody="true"
    :swapThreshold="0.65"
    :move="move"
    @add="add"
  >
    <component
      :is="child.type"
      v-for="child in children"
      :key="child.uuid"
      v-bind="{
        uuid: child.uuid,
        type: child.type,
        attrs: child.attrs
      }"
      class="nest-drag-item el-col"
    >
      <nested-draggable :children="child.children" />
    </component>
  </draggable>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { VueDraggableNext } from 'vue-draggable-next'
import designer from '@/core/designer'
import { camel2Kebab } from '@/utils/common'
import { dragdropHandler } from '@/utils/dragdrop-handler'

const components: any = { draggable: VueDraggableNext }
const files = require.context('./draw-items', false, /.vue$/) as any
files.keys().forEach((key: string) => {
  const clazz = files(key).default as any
  if (clazz) {
    const res = /([a-zA-Z0-9-]*)\.vue/.exec(clazz.__file)
    res && (components[`di-${camel2Kebab(res[1])}`] = clazz)
  }
})

@Options({
  name: 'nested-draggable',
  props: {
    children: {
      type: Array
    }
  },
  components
})
export default class Container extends Vue {
  add(evt: any) {
    designer.treeHandler.add(evt.newIndex)
  }

  move(event: any) {
    dragdropHandler.setDragData(event.relatedContext)
  }

  putFunc(to: any, from: any, dragged: any) {
    return dragdropHandler.enable(dragged, to.el.parentElement.parentElement)
  }
}
</script>

<style lang="scss" scoped>
.nest-drag-box {
  width: 100%;
  // margin: 10px;
  align-content: center;
  align-items: flex-end;
}
.el-col + .el-col {
  margin-top: 10px;
}
.nest-drag-item {
}
.el-col {
  .el-row {
    padding: 12px 20px;
  }
}
</style>
