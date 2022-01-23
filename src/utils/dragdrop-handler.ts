class DragDropHandler {
  private _dragData: { component: any } | null = { component: {} }

  getdragData() {
    return this._dragData
  }

  setDragData(data: { component: any; list: any } | null) {
    this._dragData = data
  }
}

export const dragdropHandler = new DragDropHandler()
