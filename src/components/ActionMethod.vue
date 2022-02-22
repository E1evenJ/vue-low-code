<template>
  <div class="action-method">
    <div class="aciton-left">
      <el-input v-model="filterText" placeholder="按名字过滤" />
      <el-tree
        :data="methodsTree"
        :props="{ value: 'value', label: 'label', children: 'children' }"
        node-key="value"
        ref="treeRef"
        :default-expand-all="true"
        :filter-node-method="filterMethod"
        @node-click="nodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-node">
            <span class="bold">{{ node.label || data.name }}</span>
            <el-icon
              v-if="data.isRoot || data.isGroup"
              @click.stop="add(node, data)"
              color="#409EFF"
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
    </div>

    <div class="detail" :class="{ 'no-padding': currentMethod !== null }">
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
        <MonacoEditor
          language="typescript"
          theme="vs-dark"
          :value="currentMethod.code"
          :options="options"
          @editorDidMount="editorMounted"
        ></MonacoEditor>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { randomName } from '@/utils/common'
import { Options, Vue } from 'vue-class-component'
import ActionTemplate from './ActionTemplate.vue'
import { reactive } from 'vue-demi'
import { ref } from 'vue'

import MonacoEditor from 'monaco-editor-vue3'
import { IAction, IMethodGroup, IMethod } from '@/core/Interfaces'
import designer from '@/core/designer'
import { newAction } from '@/utils/component-util'

@Options({
  components: {
    MonacoEditor,
    ActionTemplate
  },
  watch: {
    filterText(val: string) {
      this.$refs.treeRef.filter(val)
    }
  }
})
export default class ActionMethod extends Vue {
  methodsTree: any[] = []
  currentActionGroup: IMethodGroup | null = null
  currentMethod: IMethod | null = null
  currentAction: IAction | null = null
  editor: any
  options = {
    selectOnLineNumbers: false,
    key: ''
  }
  declare $refs: {
    treeRef: any
  }
  filterText = ''

  mounted() {
    const pageMetadata = designer.pageMetadata
    this.methodsTree = [
      { value: 'method_groups', label: '编排函数', isRoot: true, children: pageMetadata.methodGroups },
      { value: 'methods', label: '自定义函数', isRoot: true, children: pageMetadata.methods }
    ]
  }

  add(node: any, data: any) {
    if (data.value === 'method_groups') {
      const methods: any[] = []
      const methodGroup = {
        name: `gfn_${randomName()}`,
        isGroup: true,
        memo: '',
        methods,
        children: methods
      } as IMethodGroup
      data.children.push(methodGroup)
      this.currentMethod = null
      this.currentAction = null
      this.currentActionGroup = methodGroup
    } else if (data.value === 'methods') {
      const methodName = `fn_${randomName()}`
      const method = reactive({
        name: methodName,
        code: ref(`export function ${methodName}() {\n\n}`),
        isSync: false
      }) as IMethod
      data.children.push(method)
      this.currentActionGroup = null
      this.currentAction = null
      this.currentMethod = method
    } else if (data.isGroup) {
      const action = reactive(newAction('actionGroup' + data.children.length))
      data.children.push(action)
      this.currentAction = action
      this.options.key = `key_${randomName()}`
      this.currentActionGroup = null
      this.currentMethod = null
    }
    node.expand()
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
        this.options.key = `key_${randomName()}`
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
      const code = this.editor.getValue()
      let res = /(export async|export) function (.*?)\(\)/.exec(code)
      const methodName = res && res[2]
      this.currentMethod.name = methodName as string
      this.currentMethod.code = code
      res = /export async function/.exec(this.currentMethod.code)
      this.currentMethod.isSync = res !== null
    }
  }

  editorMounted(editor: any) {
    this.editor = editor
  }

  filterMethod(value: string, data: any) {
    if (!value) return true
    ''.toLowerCase()
    return data.name && data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
  }
}
</script>

<style lang="scss" scoped>
.action-method {
  display: flex;
  .el-tree {
    width: 300px;
    border: 1px solid #f2f2f2;
    margin-top: 10px;
  }
  .detail {
    margin-left: 20px;
    border: 1px solid #f2f2f2;
    background: #f6f9ff;
    position: relative;
    flex: 1;
    text-align: left;
    padding: 10px 20px;
    height: 63vh;
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
    height: 62vh;
    border-radius: 0;
    border: 0;
    // :deep {
    //   .CodeMirror-scroll {
    //     margin-bottom: 0;
    //     margin-right: 0;
    //     padding-bottom: 0;
    //   }
    // }
  }
}
</style>
