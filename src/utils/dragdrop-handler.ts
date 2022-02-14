class DragDropHandler {
  private _dragData: { component: any } | null = { component: {} }
  candrop = true

  getdragData() {
    return this._dragData
  }

  setDragData(data: { component: any; list: any } | null) {
    this._dragData = data
  }

  enable(from: HTMLElement, to: HTMLElement) {
    const draggable = from.dataset.draggable as string
    let canDrop = true
    if (draggable) {
      const draggableArr = draggable.split(',')
      const enable = draggableArr.shift()
      if (enable === '+') {
        for (const item of draggableArr) {
          canDrop = to.classList.contains(item) || to.classList.contains(`di-${item}`)
          if (canDrop === false) {
            break
          }
        }
      } else if (enable === '-') {
        for (const item of draggableArr) {
          canDrop = !(to.classList.contains(item) || to.classList.contains(`di-${item}`))
          if (canDrop === false) {
            break
          }
        }
      } else {
        canDrop = true
      }
    }
    const droppable = to.parentElement?.dataset.droppable as string
    if (droppable) {
      const dpoppableArr = droppable.split(',')
      const enable = dpoppableArr.shift()
      if (enable === '+') {
        for (const item of dpoppableArr) {
          canDrop = to.classList.contains(item) || to.classList.contains(`di-${item}`)
          if (canDrop === false) {
            break
          }
        }
      } else if (enable === '-') {
        for (const item of dpoppableArr) {
          canDrop = !(to.parentElement?.classList.contains(item) || to.parentElement?.classList.contains(`di-${item}`))
          if (canDrop === false) {
            break
          }
        }
      }
    }
    return canDrop
  }
}

export const dragdropHandler = new DragDropHandler()
