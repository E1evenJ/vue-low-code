<template>
  <div class="action-template">
    <el-row justify="start">
      <el-col :span="6">动作类型</el-col>
      <el-col :span="18">
        <el-select v-model="action.actionType" @change="changeActionType">
          <el-option v-for="item in ActionTypeConst" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row justify="start">
      <el-col :span="6">动作执行条件</el-col>
      <el-col :span="18">
        <el-input v-model="action.condition"></el-input>
      </el-col>
    </el-row>
    <el-row justify="start">
      <el-col :span="6">选择函数</el-col>
      <el-col :span="18">
        <el-select v-model="action.methods" placeholder="选择函数">
          <el-option v-for="item in methodSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ActionName, ActionTypeConst } from '@/utils/const'
import { IAction } from '@/core/definition/Interfaces'
import designer from '@/core/designer'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    action: Object
  }
})
export default class ActionTemplate extends Vue {
  declare action: IAction
  ActionTypeConst = ActionTypeConst
  methodSelect: { label: string; value: string }[] = []

  mounted() {
    const methods = designer.pageMetadata.methods.map(method => {
      return { label: `自定义函数: ${method.name}`, value: method.name }
    })
    const groupAction = designer.pageMetadata.methodGroups.map(methodGroup => {
      return { label: `编排函数: ${methodGroup.name}`, value: methodGroup.name }
    })
    const initMethod = { label: `页面初始化函数: init`, value: 'init' }
    this.methodSelect = [...methods, ...groupAction, initMethod]
  }

  changeActionType() {
    if (this.action) {
      this.action.label = ActionName[this.action.actionType].name
    }
  }
}
</script>

<style lang="scss" scoped>
.action-template {
  width: 400px;
  .el-col {
    > * {
      width: 100%;
    }
  }
  .el-row {
    align-items: center;
  }
  .el-row + .el-row {
    margin-top: 10px;
  }
}
</style>
