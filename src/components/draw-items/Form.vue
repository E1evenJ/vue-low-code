<template>
  <el-col class="form" :class="attrs?.class" :uuid="uuid" :span="attrs?.span || 24">
    <el-form> </el-form>
  </el-col>
</template>

<script lang="ts">
import { Options } from 'vue-class-component'
import Base from './Base'

@Options({
  components: {}
})
export default class Form extends Base {}
</script>

<style lang="scss" scoped>
.form {
}
</style>
