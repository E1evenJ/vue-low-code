<template>
  <el-col class="panel" :class="attrs?.class" :uuid="uuid" :span="attrs?.span || 24">
    <slot></slot>
  </el-col>
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
  // padding: 10px;
  min-height: 50px;
  outline: 1px dashed #ccc;
  display: flex;
  flex-direction: row;
  position: relative;
  // &:hover {
  //   border-color: rgba($color: #409eff, $alpha: 0.6);
  // }
}
</style>
