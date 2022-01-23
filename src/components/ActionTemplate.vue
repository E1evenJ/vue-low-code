<template>
  <div class="action-template">
    <el-row justify="start">
      <el-col :span="4">动作类型</el-col>
      <el-col :span="20">
        <el-select v-model="action.actionType" @change="changeActionType">
          <el-option v-for="item in ActionTypeConst" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ActionName, ActionTypeConst } from '@/utils/const'
import { IAction } from '@/utils/definition/Interfaces'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    action: Object
  }
})
export default class ActionTemplate extends Vue {
  action!: IAction
  ActionTypeConst = ActionTypeConst

  changeActionType() {
    if (this.action) {
      this.action.label = ActionName[this.action.actionType].name
    }
  }
}
</script>

<style lang="scss" scoped>
.action-template {
}
</style>
