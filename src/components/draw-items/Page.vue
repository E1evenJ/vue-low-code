<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})
export default class Page extends Vue {}
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: calc(100vh - 20px);
}
</style>
