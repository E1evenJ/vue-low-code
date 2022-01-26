<template>
  <div class="api-transform-data">
    <el-tabs class="action-dialog" v-model="activeName">
      <el-tab-pane label="请求参数(Request)" name="Request">
        <el-tag size="large">
          模型变量名称: <span class="bold">{{ api?.request?.name }}</span>
        </el-tag>
        <AttrTable :tableData="api?.request?.data"></AttrTable>
      </el-tab-pane>
      <el-tab-pane label="响应对象(Reponse)" name="Response">
        <el-tag size="large">
          模型变量名称: <span class="bold">{{ api?.response?.name }}</span>
        </el-tag>
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
  declare api: IApi
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
  .el-tabs :deep {
    .el-tab-pane {
      text-align: left;
    }
  }
  .attr-table {
    margin-top: 10px;
  }
}
</style>
