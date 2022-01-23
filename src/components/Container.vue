<template>
  <div class="container">
    <NestedDraggable :children="items" />
    <LayoutTools />
  </div>
</template>

<script lang="ts">
import { IComponentMetadata } from '@/utils/definition/Interfaces'
import { Options, Vue } from 'vue-class-component'
import LayoutTools from './LayoutTools.vue'
import NestedDraggable from './NestedDraggable.vue'

@Options({
  components: {
    NestedDraggable,
    LayoutTools
  },
  props: {
    items: Object
  }
})
export default class Container extends Vue {
  items!: IComponentMetadata[]
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
