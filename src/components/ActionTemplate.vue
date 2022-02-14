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
    <component :is="action.actionComponent" :action="action"></component>
  </div>
</template>

<script lang="ts">
import { ActionComponentConst, ActionNameConst, ActionTypeConst } from '@/utils/const'
import { IAction } from '@/core/definition/Interfaces'
import { Options, Vue } from 'vue-class-component'

const components: any = {}
const files = require.context('./actions', false, /.vue$/) as any
files.keys().forEach((key: string) => {
  const clazz = files(key).default as any
  if (clazz) {
    const res = /([a-zA-Z0-9-]*)\.vue/.exec(clazz.__file)
    res && (components[res[1]] = clazz)
  }
})

@Options({
  components,
  props: {
    action: Object
  }
})
export default class ActionTemplate extends Vue {
  declare action: IAction
  ActionTypeConst = ActionTypeConst

  changeActionType() {
    if (this.action) {
      this.action.label = ActionNameConst[this.action.actionType].name
      this.action.actionComponent = ActionComponentConst[this.action.actionType].name
    }
  }
}
</script>

<style lang="scss">
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
