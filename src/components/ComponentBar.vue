<template>
  <div class="toolbar">
    <draggable
      class="tools-group"
      :list="tools"
      :sort="false"
      :group="{ name: 'g1', pull: 'clone', put: false }"
      :disabled="disabled"
      :move="checkMove"
      @end="end"
    >
      <div
        class="tools-item"
        :class="tool.type"
        v-for="tool in tools"
        :key="tool.uuid"
        :data-draggable="tool.draggable"
        :data-droppable="tool.droppable"
      >
        <i class="iconfont" :class="tool.icon"></i>
        <!-- <el-icon>
          <component :is="tool.icon" class="item"></component>
        </el-icon> -->
        <span>{{ tool.label }}</span>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { VueDraggableNext } from 'vue-draggable-next'
import { dragdropHandler } from '@/utils/dragdrop-handler'
import { IDescriptor } from '@/core/definition/Interfaces'
import { componentDescriptors } from '@/core/definition/DescriptorFactory'

@Options({
  components: {
    draggable: VueDraggableNext
  }
})
export default class ComponentBar extends Vue {
  drag = false
  disabled = false
  tools: IDescriptor[] = []
  dragElemContext: any = null
  dragElem?: HTMLElement
  mounted() {
    componentDescriptors.forEach(item => {
      item.enable !== false && this.tools.push(item)
    })
  }
  checkMove(event: any) {
    const elem = event.dragged as HTMLElement
    this.dragElem = elem
    this.dragElemContext = event.draggedContext
    dragdropHandler.setDragData(event.relatedContext)
    dragdropHandler.enable(event.dragged, event.to.parentElement.parentElement)
  }
  end() {
    dragdropHandler.setDragData(null)
  }

  // private _addDragStyle(elem: HTMLElement) {
  //   elem.classList.add('el-col')
  //   elem.classList.add('el-col-24')
  //   elem.classList.add('dragged-item')
  //   elem.childNodes.forEach((child: any) => {
  //     child.style.visibility = 'hidden'
  //   })
  // }

  // private _removeDragStyle(elem: HTMLElement) {
  //   elem.classList.remove('el-col')
  //   elem.classList.remove('el-col-24')
  //   elem.classList.remove('dragged-item')
  //   elem.childNodes.forEach((child: any) => {
  //     child.style.visibility = ''
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.toolbar {
  width: 250px;
  height: 100%;
  border-radius: 4px;
  background-color: white;
  .tools-group {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    .tools-item {
      width: calc(50% - 25px);
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
      padding: 10px;
      cursor: pointer;
      font-size: 12px;
      text-align: left;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      &:hover {
        outline-color: var(--el-color-primary-light-3);
        box-shadow: var(--el-box-shadow-base);
      }
      i {
        margin-right: 5px;
        height: 16px;
        width: 16px;
      }
    }
  }
}
</style>
