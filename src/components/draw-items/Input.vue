<template>
  <el-col class="input" :uuid="uuid" :span="attrs?.span || 6" :class="attrs?.class">
    <el-input
      class="input"
      :uuid="uuid"
      :span="attrs?.span || 6"
      :class="attrs?.class"
      :type="attrs?.inputType"
      :placeholder="attrs?.textPlaceholder"
      :clearable="attrs?.textClear"
      :size="attrs?.componentSize"
    ></el-input>
  </el-col>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import Base from './Base'

@Options({
  name: 'di-input',
  components: {},
  props: {
    uuid: String,
    attrs: Object
  }
})
export default class Input extends Base {}
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  outline: 1px dashed #ccc;
  width: 100%;
  :deep .el-input__suffix {
    display: flex;
    align-items: center;
  }
}
</style>
