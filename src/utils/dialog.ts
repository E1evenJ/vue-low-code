import { Component, markRaw, reactive } from 'vue'

export interface DialogOption {
  title?: string
  width?: string
  height?: string
  showClose?: boolean
  fullscreen?: boolean
  data?: any
  beforeClose?: (done: () => void) => void
  closed?: () => void
}

class DialogProxy {
  private _dialogs: any[] = reactive([])
  private _index = 0

  get dialogs() {
    return this._dialogs
  }
  open(dialogComponent: Component, option: DialogOption, keep = false) {
    let dialog = this._dialogs.find((d: { dialogComponent: any }) => d.dialogComponent.name === dialogComponent.name)
    if (dialog && keep) {
      Object.assign(dialog, option)
      dialog.visible = true
      return dialog
    } else {
      dialog = reactive({
        uuid: `dialog_${++this._index}`,
        visible: true,
        width: '80%',
        height: '',
        dialogComponent: markRaw(dialogComponent),
        ...option
      })
      this._dialogs.push(dialog)
      return dialog
    }
  }
  closeAll() {
    this._dialogs.length = 0
  }
  destroy(dialogObj?: any) {
    this._dialogs.splice(this._dialogs.indexOf(dialogObj), 1)
  }
  // onOpen(fn: () => void) {}
}

export const dialogProxy = new DialogProxy()
