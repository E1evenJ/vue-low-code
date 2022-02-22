<template>
  <el-row justify="start">
    <el-col :span="6">选择函数</el-col>
    <el-col :span="18">
      <el-select v-model="action.value.method" placeholder="选择函数">
        <el-option v-for="item in methodSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row justify="start">
    <el-col :span="6">返回值</el-col>
    <el-col :span="18">
      <el-radio-group v-model="action.value.hasReturn">
        <el-radio-button :label="false">无返回值</el-radio-button>
        <el-radio-button :label="true">有返回值</el-radio-button>
      </el-radio-group>
    </el-col>
  </el-row>
  <ValueStore :action="action" v-if="action.value.hasReturn" />
</template>

<script lang="ts">
import { IAction, ISelect } from '@/core/Interfaces'
import designer from '@/core/designer'
import { methodSelect } from '@/utils/component-util'
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
export default class Method extends Vue {
  declare action: IAction
  methodSelect: ISelect[] = []

  mounted() {
    this.methodSelect = methodSelect(designer.pageMetadata)
  }
}
</script>
