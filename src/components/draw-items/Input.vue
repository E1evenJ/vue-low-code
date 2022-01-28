<template>
  <el-col class="input" :uuid="uuid" :span="attrs?.span || 6" :class="attrs?.class">
    <el-input
      class="input"
      :readonly="true"
      :type="attrs?.type"
      :placeholder="attrs?.placeholder"
      :clearable="attrs?.clearable"
      :size="attrs?.size"
    ></el-input>
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
export default class Input extends BaseComponent {}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  outline: 1px dashed #ccc;
  width: 100%;
  :deep {
    .el-input__suffix {
      display: flex;
      align-items: center;
    }
  }
}
</style>
