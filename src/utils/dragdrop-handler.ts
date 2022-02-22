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
    console.log(draggable)
    if (draggable) {
      const draggableArr = draggable.split(',')
      const enable = draggableArr.shift()
      if (enable === '+') {
        for (const item of draggableArr) {
          console.log(111, to.classList, item)
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
    } else {
      const droppable = to.parentElement?.dataset.droppable as string
      if (droppable) {
        const dpoppableArr = droppable.split(',')
        const enable = dpoppableArr.shift()
        if (enable === '+') {
          for (const item of dpoppableArr) {
            console.log(333, to.classList, item)
            canDrop = from.classList.contains(item) || from.classList.contains(`di-${item}`)
            if (canDrop === false) {
              break
            }
          }
        } else if (enable === '-') {
          console.log(444, dpoppableArr)
          for (const item of dpoppableArr) {
            console.log(444, from.parentElement?.classList, item)
            canDrop = !(
              from.parentElement?.classList.contains(item) || from.parentElement?.classList.contains(`di-${item}`)
            )
            if (canDrop === false) {
              break
            }
          }
        }
      }
    }

    return canDrop
  }
}

export const dragdropHandler = new DragDropHandler()
