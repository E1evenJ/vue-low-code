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
      <div class="tools-item" v-for="tool in tools" :key="tool.uuid">
        <el-icon>
          <component :is="tool.icon" class="item"></component>
        </el-icon>
        <span>{{ tool.name }}</span>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { ComponentLevelEnum, ComponentTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'
import { VueDraggableNext } from 'vue-draggable-next'
import { dragdropHandler } from '@/utils/dragdrop-handler'

@Options({
  components: {
    draggable: VueDraggableNext
  }
})
export default class ComponentBar extends Vue {
  drag = false
  disabled = false
  tools: any[] = [
    {
      uuid: 'panel',
      name: 'Panel',
      type: ComponentTypeEnum.PANEL,
      level: ComponentLevelEnum.LAYOUT,
      icon: 'Grid',
      children: []
    },
    {
      uuid: 'input',
      name: 'Input',
      type: ComponentTypeEnum.INPUT,
      level: ComponentLevelEnum.COMMON,
      icon: 'Grid'
    }
  ]
  dragElemContext: any = null
  dragElem?: HTMLElement
  mounted() {
    document.addEventListener(
      'dragenter',
      (event: any) => {
        // 当可拖动的元素进入可放置的目标高亮目标节点
        if (event.target.className === 'tools-group') {
          event.dataTransfer.dropEffect = 'none'
          event.dataTransfer.effectAllowed = 'none'
          // this._removeDragStyle(this.dragElem as HTMLElement);
        }
        if (event.target.className === 'oz-disigner') {
          event.dataTransfer.dropEffect = 'none'
          event.dataTransfer.effectAllowed = 'none'
        }
      },
      false
    )
  }
  checkMove(event: any) {
    const elem = event.dragged as HTMLElement
    this.dragElem = elem
    this.dragElemContext = event.draggedContext
    // this._addDragStyle(elem);
    dragdropHandler.setDragData(event.relatedContext)
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
    .tools-item {
      width: calc(50% - 25px);
      background-color: rgba($color: #409eff, $alpha: 0.3);
      padding: 10px;
      outline: 1px dashed transparent;
      cursor: pointer;
      font-size: 12px;
      text-align: left;
      display: flex;
      &:hover {
        outline-color: rgba($color: #409eff, $alpha: 0.6);
      }
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
