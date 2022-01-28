<template>
  <el-col class="form" :class="attrs?.class" :uuid="uuid" :span="attrs?.span || 24">
    <el-form><slot></slot></el-form>
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
export default class Form extends BaseComponent {}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  outline: 1px dashed #ccc;
  width: 100%;
  min-height: 60px;
}
</style>
