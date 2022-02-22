<template>
  <div class="toolbar">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="布局组件" name="1">
        <draggable
          class="tools-group"
          :list="layoutTools"
          :sort="false"
          :group="{ name: 'g1', pull: 'clone', put: false }"
          :move="checkMove"
          @end="end"
        >
          <div
            class="tools-item"
            :class="tool.type"
            v-for="tool in layoutTools"
            :key="tool.uuid"
            :data-draggable="tool.draggable"
            :data-droppable="tool.droppable"
          >
            <i class="iconfont" :class="tool.icon"></i>
            <span>{{ tool.label }}</span>
          </div>
        </draggable>
      </el-collapse-item>
      <el-collapse-item title="基础组件" name="2">
        <draggable
          class="tools-group"
          :list="commonTools"
          :sort="false"
          :group="{ name: 'g1', pull: 'clone', put: false }"
          :move="checkMove"
          @end="end"
        >
          <div
            class="tools-item"
            :class="tool.type"
            v-for="tool in commonTools"
            :key="tool.uuid"
            :data-draggable="tool.draggable"
            :data-droppable="tool.droppable"
          >
            <i class="iconfont" :class="tool.icon"></i>
            <span>{{ tool.label }}</span>
          </div>
        </draggable>
      </el-collapse-item>
      <el-collapse-item title="高级组件" name="3">
        <draggable
          class="tools-group"
          :list="advanceTools"
          :sort="false"
          :group="{ name: 'g1', pull: 'clone', put: false }"
          :move="checkMove"
          @end="end"
        >
          <div
            class="tools-item"
            :class="tool.type"
            v-for="tool in advanceTools"
            :key="tool.uuid"
            :data-draggable="tool.draggable"
            :data-droppable="tool.droppable"
          >
            <i class="iconfont" :class="tool.icon"></i>
            <span>{{ tool.label }}</span>
          </div>
        </draggable>
      </el-collapse-item>
      <el-collapse-item title="图表组件" name="4">
        <draggable
          class="tools-group"
          :list="chartTools"
          :sort="false"
          :group="{ name: 'g1', pull: 'clone', put: false }"
          :move="checkMove"
          @end="end"
        >
          <div
            class="tools-item"
            :class="tool.type"
            v-for="tool in chartTools"
            :key="tool.uuid"
            :data-draggable="tool.draggable"
            :data-droppable="tool.droppable"
          >
            <i class="iconfont" :class="tool.icon"></i>
            <span>{{ tool.label }}</span>
          </div>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { VueDraggableNext } from 'vue-draggable-next'
import { dragdropHandler } from '@/utils/dragdrop-handler'
import { componentDescriptors } from '@/core/definition/ComponentDescriptorFactory'
import { ComponentLevelEnum } from '@/utils/enums'

@Options({
  components: {
    draggable: VueDraggableNext
  }
})
export default class ComponentBar extends Vue {
  activeNames = ['1', '2', '3', '4']
  tools: any[] = []
  layoutTools: any[] = []
  commonTools: any[] = []
  advanceTools: any[] = []
  chartTools: any[] = []

  mounted() {
    componentDescriptors.forEach(item => {
      if (item.menu.enable !== false) {
        const tool = { ...item.menu, isMenu: true }
        item.menu.draggable && (tool.draggable = item.menu.draggable.join(','))
        item.menu.droppable && (tool.droppable = item.menu.droppable.join(','))
        this.tools.push(tool)
      }
    })
    this.layoutTools = this.tools.filter(item => item.level === ComponentLevelEnum.LAYOUT)
    this.commonTools = this.tools.filter(item => item.level === ComponentLevelEnum.COMMON)
    this.advanceTools = this.tools.filter(item => item.level === ComponentLevelEnum.ADVANCE)
    this.chartTools = this.tools.filter(item => item.level === ComponentLevelEnum.CHART)
  }
  checkMove(event: any) {
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
  border-radius: 4px;
  background-color: white;
  padding: 0 10px;
  .tools-group {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    flex-wrap: wrap;
    .tools-item {
      width: calc(50% - 20px);
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
      padding: 5px 5px 5px 10px;
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
        margin-right: 10px;
      }
    }
  }
}
</style>
