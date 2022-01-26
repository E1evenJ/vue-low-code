<template>
  <div class="panel" :class="attrs?.class" :uuid="uuid" :span="attrs?.span || 24">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import Base from './Base'

@Options({
  name: 'di-panel',
  props: {
    uuid: String,
    attrs: Object
  }
})
export default class Panel extends Base {}
</script>

<style lang="scss" scoped>
.panel {
  min-height: 60px;
  outline: 1px dashed #ccc;
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  // &:hover {
  //   border-color: rgba($color: var(--el-color-primary), $alpha: 0.6);
  // }
}
</style>
