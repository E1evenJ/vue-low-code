<template>
  <div class="attributes">
    <el-tabs v-model="activeName">
      <el-tab-pane label="属性配置" name="AttrsConfig"></el-tab-pane>
      <el-tab-pane label="模型管理" name="ModelMgt"></el-tab-pane>
    </el-tabs>
    <keep-alive>
      <component :is="activeName"></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import AttrsConfig from './AttrsConfig.vue'

@Options({
  components: {
    AttrsConfig
  }
})
export default class Attributes extends Vue {
  activeName = 'AttrsConfig'
}
</script>

<style lang="scss" scoped>
.attributes {
  width: 340px;
  border-radius: 4px;
  background-color: white;
  :deep {
    .el-tabs__nav {
      width: 50%;
    }
    .el-tabs__item {
      width: 100%;
    }
  }
}
</style>
