<template>
  <el-row justify="start">
    <el-col :span="6">选择服务</el-col>
    <el-col :span="18">
      <el-select v-model="action.value.api" placeholder="选择服务">
        <el-option v-for="item in apiSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row justify="start">
    <el-col :span="6">参数处理</el-col>
    <el-col :span="18">
      <el-select v-model="action.value.paramProcess" placeholder="请选择">
        <el-option v-for="item in methodSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row justify="start">
    <el-col :span="6">失败回调</el-col>
    <el-col :span="18">
      <el-select v-model="action.value.failCallback" placeholder="请选择">
        <el-option v-for="item in methodSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
  </el-row>
  <ValueStore :action="action" />
</template>

<script lang="ts">
import { IAction, ISelect } from '@/core/Interfaces'
import designer from '@/core/designer'
import { methodSelect } from '@/utils/attr-util'
import { Options, Vue } from 'vue-class-component'
import ValueStore from '../ValueStore.vue'

@Options({
  props: {
    action: Object
  },
  components: {
    ValueStore
  }
})
export default class Api extends Vue {
  declare action: IAction
  apiSelect: ISelect[] = []
  methodSelect: ISelect[] = []

  mounted() {
    this.methodSelect = methodSelect(designer.pageMetadata)
    this.apiSelect = designer.pageMetadata.apis.map(item => {
      return { label: `${item.memo}(${item.method})`, value: item.id }
    })
  }
}
</script>

<style lang="scss" scoped>
.Api {
}
</style>
