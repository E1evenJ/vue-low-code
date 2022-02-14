<template>
  <el-row justify="start">
    <el-col :span="6">返回值存储到</el-col>
    <el-col :span="18">
      <el-radio-group v-model="action.value.storeReturnVal">
        <el-radio-button :label="StoreTypeEnum.CONTEXT">上下文</el-radio-button>
        <el-radio-button :label="StoreTypeEnum.MODEL">模型数据</el-radio-button>
      </el-radio-group>
    </el-col>
  </el-row>
  <el-row justify="start">
    <el-col :span="6">存储至</el-col>
    <el-col :span="18">
      <el-input
        v-model="action.value.returnVal"
        v-if="action.value.storeReturnVal === StoreTypeEnum.CONTEXT"
      ></el-input>
      <el-cascader
        ref="cascader"
        v-model="action.value.returnVal"
        :options="dataSelect"
        placeholder="请选择"
        :props="{ value: 'name', label: 'name', children: 'children', emitPath: false, checkStrictly: false }"
        v-if="action.value.storeReturnVal === StoreTypeEnum.MODEL"
        @change="change(action.value)"
      >
      </el-cascader>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { IAction } from '@/core/definition/Interfaces'
import designer from '@/core/designer'
import { dataSelect } from '@/utils/attr-util'
import { StoreTypeEnum } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    action: Object
  }
})
export default class ValueStore extends Vue {
  declare action: IAction
  declare $refs: {
    cascader: any
  }
  dataSelect: any[] = []
  StoreTypeEnum = StoreTypeEnum

  mounted() {
    this.dataSelect = dataSelect(designer.pageMetadata)
  }

  change(item: any) {
    const nodes = this.$refs.cascader.getCheckedNodes()
    const path = [...nodes[0].pathValues]
    path[0] === 'props' && path.splice(0, 1)
    path[0] === 'data' && path.splice(0, 1)
    item.value_path = path
  }
}
</script>
