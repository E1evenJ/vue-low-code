<template>
  <div class="layout-tools" :style="position">
    <el-icon v-show="metadata?.desc.tools.includes(Tools.SETTING)" @click.stop="setting"><setting /></el-icon>
    <el-icon v-show="metadata?.desc.tools.includes(Tools.DELETE)" @click.stop="remove" style="color: red"
      ><delete
    /></el-icon>
    <el-icon v-show="metadata?.desc.tools.includes(Tools.COPY)" @click.stop="copy"><document-copy /></el-icon>
  </div>
</template>

<script lang="ts">
import { dialogProxy } from '@/utils/dialog'
import { ToolType } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'
import ActionDialog from './ActionDialog.vue'
import { IComponentMetadata } from '@/utils/definition/Interfaces'
import designer from '@/utils/designer'

@Options({
  components: {}
})
export default class LayoutTools extends Vue {
  position = {} as any
  metadata: IComponentMetadata | null = null
  el: HTMLElement | null = null
  Tools = ToolType
  dialog: any
  mounted() {
    designer.treeHandler.onSelectedComponentChange((metadata: IComponentMetadata | null, el: HTMLElement | null) => {
      this.metadata = metadata
      this.el = el
      if (el) {
        const { left, top, width } = el.getBoundingClientRect()
        this.position = {
          right: `${document.body.clientWidth - left - width + 5}px`,
          top: `${top - 10}px`,
          display: 'block'
        }
      } else {
        this.position = { display: 'none' }
      }
    })
  }
  copy() {
    this.metadata && designer.treeHandler.copy(this.metadata)
  }
  remove() {
    this.metadata && designer.treeHandler.remove(this.metadata)
  }
  setting() {
    if (this.dialog) {
      this.dialog.visible = true
      this.dialog.data = this.metadata
    } else {
      this.dialog = dialogProxy.open(ActionDialog, {
        title: '',
        data: this.metadata
        // beforeClose: (done: () => void) => {
        //   console.log('beforeClose')
        //   done()
        // },
        // closed: () => {
        //   console.log('closed')
        //   dialogProxy.destroy(this.dialog)
        // }
      }, true)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-tools {
  position: absolute;
  text-align: right;
  z-index: 1000;
  display: none;
  i {
    padding: 3px;
    margin: 0 3px 0 0;
    background: #fff;
    color: #409eff;
    border-radius: 50%;
    border: 1px solid #409eff;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
