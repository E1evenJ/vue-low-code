<template>
  <div class="api-transform-data">
    <el-tabs class="action-dialog" v-model="activeName">
      <el-tab-pane label="请求参数(Request)" name="Request">
        <AttrTable :tableData="api?.request?.data"></AttrTable>
      </el-tab-pane>
      <el-tab-pane label="响应对象(Reponse)" name="Response">
        <AttrTable :tableData="api?.response?.data"></AttrTable>
      </el-tab-pane>
    </el-tabs>
    <div class="current" v-if="api">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { IApi } from '@/utils/definition/Interfaces'
import { Options, Vue } from 'vue-class-component'
import AttrTable from './AttrTable.vue'

@Options({
  props: {
    api: Object
  },
  components: {
    AttrTable
  }
})
export default class ApiTransformData extends Vue {
  activeName = 'Request'
  api!: IApi
}
</script>

<style lang="scss" scoped>
.api-transform-data {
  position: relative;
  .current {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 40px;
  }
}
</style>
