<template>
  <div class="header">
    <el-button plain @click="save">保存</el-button>
  </div>
</template>

<script lang="ts">
import { componentTreeHandler } from '@/utils/render-tree'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})
export default class Header extends Vue {
  save() {
    console.log(componentTreeHandler.getTree())
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
}
</style>
