<template>
  <div v-if="showTools" class="layout-tools-box">
    <teleport :to="teleportTo">
      <div class="layout-tools">
        <el-icon v-show="desc?.tools.includes(Tools.SETTING)" @click.stop="setting"><setting /></el-icon>
        <el-icon v-show="desc?.tools.includes(Tools.DELETE)" @click.stop="remove"><delete /></el-icon>
        <el-icon v-show="desc?.tools.includes(Tools.COPY)" @click.stop="copy"><document-copy /></el-icon>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { dialogProxy } from '@/utils/dialog'
import { ToolType } from '@/utils/enums'
import { Options, Vue } from 'vue-class-component'
import ActionDialog from './ActionDialog.vue'
import { IComponentMetadata, IDescriptor } from '@/core/definition/Interfaces'
import designer from '@/core/designer'
import { getComponentDescriptor } from '@/core/definition/DescriptorFactory'

@Options({
  components: {}
})
export default class LayoutTools extends Vue {
  metadata: IComponentMetadata | null = null
  el: HTMLElement | null = null
  Tools = ToolType
  dialog: any
  desc: IDescriptor | null = null
  showTools = false
  teleportTo = ''
  mounted() {
    designer.treeHandler.onSelectedComponentChange((metadata: IComponentMetadata | null, el: HTMLElement | null) => {
      this.showTools = false
      this.metadata = metadata
      if (metadata) this.desc = getComponentDescriptor(metadata.type)
      this.el = el
      // if (el) {
      //   const { left, top, width } = el.getBoundingClientRect()
      //   this.position = {
      //     right: `${document.body.clientWidth - left - width + 5}px`,
      //     top: `${top - 10}px`,
      //     display: 'block'
      //   }
      // } else {
      //   this.position = { display: 'none' }
      // }

      this.metadata &&
        this.$nextTick(() => {
          if (document.querySelector('.design-selected')) {
            this.teleportTo = '.design-selected'
            this.showTools = true
          }
        })
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
      this.dialog = dialogProxy.open(
        ActionDialog,
        {
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
        },
        true
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-tools {
  position: absolute;
  text-align: right;
  z-index: 1000;
  top: -10px;
  right: 0;
  i {
    line-height: 24px;
    cursor: pointer;
    color: rgb(189, 189, 189);
    margin-right: 4px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 4px 2px;
    border-radius: 50%;
    font-size: 12px;
    padding: 3px;
    border: 1px solid;
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
