<template>
  <div class="api-dialog">
    <el-tree
      :data="apiTree"
      :props="{ value: 'memo', label: 'memo', children: 'children' }"
      node-key="value"
      @node-click="nodeClick"
    >
    </el-tree>
    <div class="detail">
      <el-descriptions direction="vertical" :column="2" size="small" border>
        <el-descriptions-item label="接口名称">{{ currentApi?.memo }}</el-descriptions-item>
        <el-descriptions-item label="接口类型">{{ currentApi?.method }}</el-descriptions-item>
        <el-descriptions-item label="接口路径" :span="2">{{ currentApi?.url }}</el-descriptions-item>
      </el-descriptions>
      <ApiTransformData :api="currentApi" style="margin-top: 10px; padding: 0 2px">
        <el-button type="primary" size="default" @click="subscribe">订阅</el-button>
      </ApiTransformData>
    </div>
  </div>
</template>

<script lang="ts">
import { uuid } from '@/utils/common'
import { IApi, IServiceCategory } from '@/core/Interfaces'
import designer from '@/core/designer'
import { DataTypeEnum, MethodEnum } from '@/utils/enums'
import { ElMessage } from 'element-plus'
import { Options, Vue } from 'vue-class-component'
import ApiTransformData from './ApiTransformData.vue'

@Options({
  name: 'ApiDialog',
  components: {
    ApiTransformData
  }
})
export default class ApiDialog extends Vue {
  apiTree: IServiceCategory[] = []
  currentApi: IApi | null = null

  mounted() {
    ;(async () => {
      this.apiTree = [
        {
          memo: 'aliyun',
          children: [
            {
              memo: '支付',
              children: [
                {
                  id: uuid(),
                  memo: '你好啊',
                  method: MethodEnum.GET,
                  url: '/api/hwlloworld',
                  request: {
                    name: 'hellow_request',
                    data: [{ id: uuid(), name: 'id', memo: '主键', dataType: DataTypeEnum.NUMBER }]
                  },
                  response: {
                    name: 'hellow_response',
                    data: [
                      { id: uuid(), name: 'id', memo: '主键', dataType: DataTypeEnum.NUMBER },
                      { id: uuid(), name: 'name', memo: '名字', dataType: DataTypeEnum.STRING }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    })()
  }

  nodeClick(data: IApi) {
    if (Reflect.getOwnPropertyDescriptor(data, 'method') !== undefined) this.currentApi = data as IApi
  }

  subscribe() {
    if (this.currentApi) {
      const isExist = designer.pageMetadata.apis.find(item => item.id === this.currentApi?.id)
      if (!isExist) {
        designer.pageMetadata.apis.push(this.currentApi)
        ElMessage({
          message: '选中Api订阅成功.',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '选中Api已经订阅.',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.api-dialog {
  display: flex;
  .el-tree {
    width: 300px;
    border: 1px solid #f2f2f2;
  }
  .detail {
    margin-left: 20px;
    border: 1px solid #f2f2f2;
    background: #f6f9ff;
    position: relative;
    flex: 1;
    padding: 10px;
  }
}
</style>
