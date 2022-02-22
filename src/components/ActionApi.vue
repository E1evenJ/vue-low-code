<template>
  <div class="action-api">
    <div class="api">
      <span class="api-label">已订阅Api：</span>
      <el-tag
        v-for="api in apis"
        :key="api.id"
        class="api-tag"
        :disable-transitions="false"
        size="large"
        :type="currentApi === api ? '' : 'info'"
        @close="remove(api)"
        @click="detail(api)"
      >
        <span>{{ api.memo + ' (' + api.url + ')' }}</span>
        <el-icon @click.stop="refresh(api)" color="#E6A23C"><refresh /></el-icon>
        <el-icon @click.stop="remove(api)" color="#F56C6C"><delete /></el-icon>
      </el-tag>
      <el-button class="button-new-tag ml-1" size="default" @click="add"> + 订阅 </el-button>
    </div>
    <ApiTransformData :api="currentApi">
      <el-tag>{{ currentApi?.memo + ' (' + currentApi?.url + ')' }}</el-tag>
    </ApiTransformData>
  </div>
</template>

<script lang="ts">
import { IApi } from '@/core/Interfaces'
import designer from '@/core/designer'
import { dialogProxy } from '@/utils/dialog'
import { Options, Vue } from 'vue-class-component'
import ApiDialog from './ApiDialog.vue'
import ApiTransformData from './ApiTransformData.vue'

@Options({
  components: {
    ApiTransformData
  }
})
export default class ActionApi extends Vue {
  activeName = 'Request'
  apis = designer.pageMetadata.apis
  dataTypes: any[] = []
  currentApi: IApi | null = null

  detail(api: IApi) {
    this.currentApi = api
  }
  remove(api: IApi) {
    this.apis.splice(this.apis.indexOf(api), 1)
    this.currentApi = this.currentApi === api ? null : this.currentApi
  }

  add() {
    dialogProxy.open(ApiDialog, { title: '订阅接口' }, true)
  }

  refresh(api: any) {
    console.log('refresh')
  }
}
</script>

<style lang="scss" scoped>
.action-api {
  .api {
    display: flex;
    flex-wrap: wrap;
    line-height: 32px;
    .api-label {
      font-weight: 700;
    }
    .api-tag {
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
      :deep {
        .el-tag__content {
          display: flex;
          align-items: center;
        }
      }
      .el-icon {
        margin-left: 20px;
        &:hover {
          box-shadow: var(--el-box-shadow-base);
        }
      }
      .el-icon + .el-icon {
        margin-left: 5px;
      }
    }
  }
}
</style>
