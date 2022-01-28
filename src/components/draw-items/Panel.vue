<template>
  <el-col class="panel" :class="attrs?.class" :uuid="uuid" :span="attrs?.span">
    <slot></slot>
  </el-col>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import BaseComponent from '@/core/definition/BaseComponent'

@Options({
  props: {
    uuid: String,
    attrs: Object
  }
})
export default class Panel extends BaseComponent {}
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
