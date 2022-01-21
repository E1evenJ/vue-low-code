<template>
  <div class="action-method">
    <el-tree
      :data="methodsTree"
      :props="{ value: 'value', label: 'label', children: 'children' }"
      node-key="value"
      @node-click="nodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-node">
          <span class="bold">{{ node.label || data.name }}</span>
          <el-icon
            v-if="data.isRoot || data.isGroup"
            @click.stop="add(data)"
            color="#409eff"
            size="16"
            style="margin-left: 10px"
          >
            <circle-plus />
          </el-icon>
          <el-icon
            v-if="!data.isRoot || data.isGroup"
            @click.stop="remove(node, data)"
            color="red"
            size="16"
            style="margin-left: 10px"
          >
            <delete />
          </el-icon>
        </div>
      </template>
    </el-tree>
    <div class="detail" :class="{ 'no-padding': currentAction }">
      <template v-if="currentActionGroup">
        <el-row justify="start">
          <el-col :span="4">函数名称</el-col>
          <el-col :span="20">
            <el-input v-model="currentActionGroup.name"></el-input>
          </el-col>
        </el-row>
        <el-row justify="start">
          <el-col :span="4">描述</el-col>
          <el-col :span="20">
            <el-input v-model="currentActionGroup.memo"></el-input>
          </el-col>
        </el-row>
      </template>
      <template v-if="currentAction">
        <ActionTemplate :action="currentAction"></ActionTemplate>
      </template>
      <template v-if="currentMethod">
        <div class="code-tools">
          <el-button type="primary" size="small" @click="saveMethodName">保存</el-button>
        </div>
        <Codemirror v-model:value="currentMethod.code" :options="cmOptions" border></Codemirror>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { randomName } from '@/utils/common'
import { Method, ActionGroup, RenderTree, Action } from '@/utils/render-tree'
import { Options, Vue } from 'vue-class-component'
import Codemirror from 'codemirror-editor-vue3'
// language
import 'codemirror/mode/javascript/javascript.js'
// theme
import 'codemirror/theme/dracula.css'
import { ActionTypeEnum } from '@/utils/enums'
import { ActionName } from '@/utils/const'
import ActionTemplate from './ActionTemplate.vue'
import { reactive } from 'vue-demi'

@Options({
  components: {
    Codemirror,
    ActionTemplate
  },
  props: {
    metadata: Object
  },
  watch: {
    metadata() {
      this.init(this.metadata)
    }
  }
})
export default class ActionMethod extends Vue {
  metadata!: RenderTree
  methodsTree: any[] = []
  currentActionGroup: ActionGroup | null = null
  currentMethod: Method | null = null
  currentAction: Action | null = null
  editor: any
  cmOptions = {
    mode: 'text/javascript', // Language mode
    theme: 'dracula', // Theme
    lineNumbers: true, // Show line number
    smartIndent: true, // Smart indent
    indentUnit: 2, // The smart indent unit is 2 spaces in length
    foldGutter: true, // Code folding
    styleActiveLine: true // Display the style of the selected row
  }

  mounted(): void {
    this.init(this.metadata)
  }

  init(metadata: RenderTree) {
    metadata.methodGroups = metadata.methodGroups || []
    metadata.methods = metadata.methods || []
    this.methodsTree = [
      { value: 'method_groups', label: '编排函数', isRoot: true, children: metadata.methodGroups },
      { value: 'methods', label: '自定义函数', isRoot: true, children: metadata.methods }
    ]
  }

  add(data: any) {
    if (data.value === 'method_groups') {
      const methodGroup = {
        name: `gfn_${randomName()}`,
        isGroup: true,
        memo: '',
        actions: [],
        children: []
      } as ActionGroup
      data.children.push(methodGroup)
      this.currentMethod = null
      this.currentAction = null
      this.currentActionGroup = methodGroup
    } else if (data.value === 'methods') {
      const methodName = `fn_${randomName()}`
      const method = reactive({
        name: methodName,
        code: `export function ${methodName}() {\n\n}`,
        isSync: false
      }) as Method
      data.children.push(method)
      this.currentActionGroup = null
      this.currentAction = null
      this.currentMethod = method
    } else if (data.isGroup) {
      const action = reactive({
        eventName: 'actionGroup' + data.actions.length,
        label: ActionName[ActionTypeEnum.METHOD].name,
        actionType: ActionTypeEnum.METHOD,
        returnVal: false
      })
      data.actions.push(action)
      data.children.push(action)
      this.currentAction = action
      this.currentActionGroup = null
      this.currentMethod = null
    }
  }

  remove(node: any, data: any) {
    const children = node.parent.data.children
    children.splice(children.indexOf(data), 1)
  }

  nodeClick(data: any) {
    if (!data.isRoot) {
      if (Reflect.getOwnPropertyDescriptor(data, 'code') !== undefined) {
        this.currentActionGroup = null
        this.currentAction = null
        this.currentMethod = data
      } else if (Reflect.getOwnPropertyDescriptor(data, 'actionType') !== undefined) {
        this.currentActionGroup = null
        this.currentMethod = null
        this.currentAction = data
      } else {
        this.currentMethod = null
        this.currentAction = null
        this.currentActionGroup = data
      }
    } else {
      this.currentActionGroup = null
      this.currentAction = null
      this.currentMethod = null
    }
  }

  saveMethodName() {
    if (this.currentMethod) {
      let res = /export function (.*?)\(\)/.exec(this.currentMethod.code)
      console.log(this.currentMethod.code, res)
      const methodName = res && res[1]
      this.currentMethod.name = methodName as string
    }
  }
}
</script>

<style lang="scss" scoped>
.action-method {
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
    text-align: left;
    padding: 10px 20px;
  }
  .no-padding {
    padding: 0;
  }
  .custom-node {
    font-size: 13px;
    color: #999;
    display: flex;
    .bold {
      font-weight: 700;
    }
  }
  .el-row + .el-row {
    margin-top: 20px;
  }
  .code-tools {
    background: #0f0000;
    text-align: right;
    color: #fff;
    padding: 5px 20px;
    .el-button {
      font-size: 12px;
    }
  }
  .codemirror-container {
    width: 55vw;
    height: 60vh;
    border-radius: 0;
  }
}
</style>
