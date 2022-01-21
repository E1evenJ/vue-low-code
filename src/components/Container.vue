<template>
  <div class="container">
    <NestedDraggable :children="items" />
    <LayoutTools />
  </div>
</template>

<script lang="ts">
import { getDefaultAttrs } from '@/utils/definition/DefaultAttributeFactory'
import { getDescriptor } from '@/utils/definition/DescriptorFactory'
import { ComponentLevelEnum, ComponentTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'
import { componentTreeHandler, countConponentByType } from '../utils/render-tree'
import LayoutTools from './LayoutTools.vue'
import NestedDraggable from './NestedDraggable.vue'

@Options({
  components: {
    NestedDraggable,
    LayoutTools
  }
})
export default class Container extends Vue {
  items = [
    {
      uuid: 'panel_1',
      type: ComponentTypeEnum.PANEL,
      level: ComponentLevelEnum.LAYOUT,
      attrs: getDefaultAttrs(ComponentTypeEnum.PANEL),
      desc: getDescriptor(ComponentTypeEnum.PANEL),
      children: [
        {
          uuid: 'panel_4',
          type: ComponentTypeEnum.PANEL,
          level: ComponentLevelEnum.LAYOUT,
          attrs: getDefaultAttrs(ComponentTypeEnum.PANEL),
          desc: getDescriptor(ComponentTypeEnum.PANEL),
          children: []
        }
      ]
    },
    {
      uuid: 'panel_2',
      type: ComponentTypeEnum.PANEL,
      level: ComponentLevelEnum.LAYOUT,
      attrs: getDefaultAttrs(ComponentTypeEnum.PANEL),
      desc: getDescriptor(ComponentTypeEnum.PANEL),
      children: []
    },
    {
      uuid: 'panel_3',
      type: ComponentTypeEnum.PANEL,
      level: ComponentLevelEnum.LAYOUT,
      attrs: getDefaultAttrs(ComponentTypeEnum.PANEL),
      desc: getDescriptor(ComponentTypeEnum.PANEL),
      children: []
    }
  ]
  metadata = {
    uuid: 'page',
    type: ComponentTypeEnum.PAGE,
    attrs: getDefaultAttrs(ComponentTypeEnum.PAGE),
    level: ComponentLevelEnum.LAYOUT,
    desc: getDescriptor(ComponentTypeEnum.PAGE),
    children: this.items,
    events: []
  }
  mounted() {
    componentTreeHandler.setCount(ComponentTypeEnum.INPUT, countConponentByType(ComponentTypeEnum.INPUT, this.items))
    componentTreeHandler.setCount(ComponentTypeEnum.PANEL, countConponentByType(ComponentTypeEnum.PANEL, this.items))
    componentTreeHandler.setTree([this.metadata])
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  border-radius: 4px;
  background-color: white;
  margin: 0 10px;
  > .drag-box {
    margin: 0;
    width: 100%;
    height: 100%;
    align-content: start;
  }
}
</style>
