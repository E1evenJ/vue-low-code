<template>
  <div class="debug-dialog">
    <div class="code-box" :style="leftFullscrennStyle">
      <el-tabs v-model="activeName">
        <el-tab-pane label="模板" name="template"></el-tab-pane>
        <el-tab-pane label="脚本" name="script"></el-tab-pane>
        <el-tab-pane label="样式" name="css"></el-tab-pane>
        <el-tab-pane label="公共脚本" name="globalScript"></el-tab-pane>
        <el-tab-pane label="公共样式" name="globalcss"></el-tab-pane>
      </el-tabs>
      <div class="code-box--detail" v-loading="!defineComponentConfig">
        <template v-if="defineComponentConfig">
          <MonacoEditor
            v-if="activeName === 'template'"
            language="html"
            theme="vs-dark"
            :value="metadata.template"
            @editorDidMount="templateMounted"
          ></MonacoEditor>
          <MonacoEditor
            v-if="activeName === 'script'"
            language="typescript"
            theme="vs-dark"
            :value="metadata.script"
            @editorDidMount="scriptMounted"
          ></MonacoEditor>
        </template>
      </div>
    </div>
    <div class="preview" :style="rightFullscrennStyle">
      <template></template>
      <div class="header">
        <el-button-group>
          <el-button @click="rightFullscreen()">
            <i class="iconfont icon-fullscreen" v-if="!isRightFullscreen"></i>
            <i class="iconfont icon-fullscreen-exit" v-if="isRightFullscreen"></i>
          </el-button>
          <el-button @click="refresh">
            <el-icon><refresh /></el-icon>
          </el-button>
          <el-button @click="close()">
            <el-icon><close /></el-icon>
          </el-button>
        </el-button-group>
      </div>
      <div class="container" v-loading="!defineComponentConfig">
        <template v-if="defineComponentConfig">
          <Preview :defineComponentConfig="defineComponentConfig" />
          <!-- <Test /> -->
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MonacoEditor from 'monaco-editor-vue3'
import Preview from './Preview.vue'
import Test from './Test.vue'
import designer from '@/core/designer'
import { Interpreter } from '@/core/interpreter'
import { ComponentOptionsWithoutProps } from 'vue'
import { js_beautify, css_beautify, html_beautify } from 'js-beautify'

@Options({
  components: {
    MonacoEditor,
    Preview,
    Test
  },
  props: {
    dialog: Object
  }
})
export default class DebugDialog extends Vue {
  isFullscreen = false
  leftFullscrennStyle = {}
  rightFullscrennStyle = {}
  isLeftFullscreen = false
  isRightFullscreen = false
  activeName = 'template'
  metadata: any = {
    template: '',
    script: '',
    css: '',
    globalScript: '',
    globalCss: ''
  }
  templateEditor: any
  templateOptions = {
    selectOnLineNumbers: false,
    key: ''
  }
  declare dialog: any
  scriptEditor: any
  defineComponentConfig: ComponentOptionsWithoutProps | null = null

  mounted() {
    const interpreter = new Interpreter(designer.pageMetadata, designer.componentMetadatas)
    const script = interpreter.generateScript()
    this.defineComponentConfig = interpreter.generateDefineComponent(script)
    this.metadata.template = html_beautify(this.defineComponentConfig.template as string, { indent_size: 2 })
    this.metadata.script = js_beautify(`export default ${script}`, { indent_size: 2 })
  }

  rightFullscreen() {
    if (this.isRightFullscreen) {
      this.rightFullscrennStyle = {}
      this.leftFullscrennStyle = {}
      this.isRightFullscreen = false
    } else {
      this.rightFullscrennStyle = { width: '100%' }
      this.leftFullscrennStyle = { width: 0 }
      this.isRightFullscreen = !this.isRightFullscreen
    }
  }

  close() {
    this.dialog.visible = false
  }

  refresh() {
    this.defineComponentConfig && (this.defineComponentConfig.template = this.templateEditor.getValue())
  }

  templateMounted(editor: any) {
    this.templateEditor = editor
    // setTimeout(() => {
    //   editor.getAction(['editor.action.formatDocument'])._run()
    // }, 100)
  }

  scriptMounted(editor: any) {
    this.scriptEditor = editor
    // setTimeout(() => {
    //   editor.getAction(['editor.action.formatDocument'])._run()
    // }, 100)
  }
}
</script>

<style lang="scss" scoped>
.debug-dialog {
  display: flex;
  height: 100vh;
  .code-box {
    height: 100%;
    width: calc(50% + 10px);
    transition: 0.25s width ease-in-out;
    overflow: hidden;
    .el-tabs {
      width: 100%;
      background-color: #1e1e1e;
      :deep {
        .el-tabs__item {
          color: white;
          padding: 0 20px;
        }
        .el-tabs__nav-wrap::after {
          background-color: #1e1e1e;
        }
      }
    }
    .code-box--detail {
      height: calc(100vh - 54px);
      background-color: #1e1e1e;
      overflow: hidden;
    }
  }
  .preview {
    width: 50%;
    height: 100%;
    transition: 0.25s width ease-in;
    .header {
      background: #1e1e1e;
      display: flex;
      padding: 2px 4px;
    }
  }
}
</style>
