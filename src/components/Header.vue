<template>
  <div class="header">
    <el-button plain @click="setting">配置</el-button>
    <el-button plain @click="save">保存</el-button>
  </div>
</template>

<script lang="ts">
import designer from '@/utils/designer'
import { dialogProxy } from '@/utils/dialog'
import { Options, Vue } from 'vue-class-component'
import { reactive, ref } from 'vue-demi'
import ActionDialog from './ActionDialog.vue'

@Options({
  components: {}
})
export default class Header extends Vue {
  dialog: any
  setting() {
    if (this.dialog) {
      this.dialog.visible = true
      this.dialog.data = ref(null)
    } else {
      this.dialog = dialogProxy.open(ActionDialog, {
        title: '',
        data: ref(null)
      }, true)
    }
  }

  save() {
    localStorage.setItem('designer', designer.toString())
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px;
}
</style>
