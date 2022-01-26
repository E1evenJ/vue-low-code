// import { resolveComponent, TransitionGroup, h, ConcreteComponent } from 'vue';
// import { VueDraggableNext } from 'vue-draggable-next';

import { isReactive, reactive } from 'vue'
import { cloneDeep } from './common'
import { getDefaultAttrs } from './definition/DefaultAttributeFactory'
import { IComponentMetadata } from './definition/Interfaces'
import { dragdropHandler } from './dragdrop-handler'
import { ComponentLevelEnum } from './enums'
import { indexHandler } from './index-hanlder'

export class ComponentTree {
  private readonly _componentMetadatas: IComponentMetadata[]
  private _selectedComponentuuid: string | null = null
  private _selectedComponentEl: HTMLElement | null = null
  private _onSelectedComponentChangeHandlers: any[] = []

  constructor(componentMetadatas: IComponentMetadata[]) {
    this._componentMetadatas = componentMetadatas
  }

  setSelectedComponent(elem: HTMLElement | null, uuid: string | null): void {
    if (uuid !== this._selectedComponentuuid) {
      this._selectedComponentEl = elem
      this._selectedComponentuuid = uuid
      const pageMetadata = this.getSelectedComponentMetadata()
      this._onSelectedComponentChangeHandlers.forEach((fn: any) => fn(pageMetadata, elem))
    }
  }

  onSelectedComponentChange(func: (pageMetadata: any, el: HTMLElement | null) => void): void {
    this._onSelectedComponentChangeHandlers.push(func)
  }

  getSelectedComponentMetadata(): IComponentMetadata | null {
    const uuid = this._selectedComponentuuid
    return this._recursionTree(this._componentMetadatas, uuid)
  }

  private _recursionTree(tree: IComponentMetadata[], uuid: any): IComponentMetadata | null {
    for (const item of tree) {
      if (item.uuid === uuid) {
        return item
      } else {
        const result = this._recursionTree(item.children, uuid)
        if (result) return result
      }
    }
    return null
  }

  add(newIndex: number): void {
    const dragData = dragdropHandler.getdragData()
    if (dragData && dragData.component.list) {
      const item = dragData.component.list[newIndex]
      const newMetadata = reactive({
        uuid: `${item.type.split('-')[1]}_${indexHandler.plusCount(item.type)}`,
        type: item.type,
        level: item.level,
        attrs: getDefaultAttrs(item.type),
        children: []
      })
      dragData.component.list.splice(newIndex, 1, newMetadata)
    }
  }

  copy(pageMetadata: IComponentMetadata): void {
    const newMetaData = reactive({
      uuid: `${pageMetadata.type.split('-')[1]}_${indexHandler.plusCount(pageMetadata.type)}`,
      type: pageMetadata.type,
      level: pageMetadata.level,
      attrs: {
        ...cloneDeep(pageMetadata.attrs),
        span: [ComponentLevelEnum.LAYOUT].includes(pageMetadata.level) ? 24 : 6
      },
      children: []
    })
    this._splice(pageMetadata, newMetaData)
  }

  private _recursion(tree: IComponentMetadata, uuid: string): IComponentMetadata | undefined {
    if (tree.children) {
      for (const pageMetadata of tree.children) {
        if (pageMetadata.uuid === uuid) return tree
        else {
          const res = this._recursion(pageMetadata, uuid)
          if (res) return res
        }
      }
    }
  }

  private _splice(pageMetadata: IComponentMetadata, newMetadata?: IComponentMetadata): void {
    const parentMetadata = this._recursion(this._componentMetadatas[0], pageMetadata.uuid)
    const children = parentMetadata?.children
    const index = children?.indexOf(pageMetadata)
    if (index !== undefined) {
      if (newMetadata) children?.splice(index + 1, 0, newMetadata)
      else children?.splice(index, 1)
    }
  }

  remove(pageMetadata: IComponentMetadata) {
    this._splice(pageMetadata)
    this.setSelectedComponent(null, null)
  }
}

// export function tree2RenderTree(tree: IComponentMetadata) {
//   const children = [] as any[];
//   for (const child of tree.children) {
//     children.push(tree2RenderTree(child));
//   }
//   return h(getComponentClazz(tree.type), getAttrs(tree), children);
// }

// function getAttrs(ele: IComponentMetadata) {
//   switch (ele.type) {
//     case ComponentTypeEnum.DRAGGABLE: {
//       return bindEvents(ele, {
//         uuid: 'draggable',
//         ...ele.attrs
//       });
//     }
//     case ComponentTypeEnum.TRANSITIONGROUP: {
//       return {};
//     }
//     case ComponentTypeEnum.PANEL: {
//       return bindEvents(ele, {
//         uuid: ele.uuid,
//         clazz: `${ele.attrs.class}`,
//         ...ele.attrs
//       });
//     }
//     default: {
//       return bindEvents(ele, { uuid: ele.uuid, ...ele.attrs });
//     }
//   }
// }

// function bindEvents(ele: IComponentMetadata, attrs: any) {
//   for (const key in ele.events) {
//     const fn = ele.events[key];
//     attrs[key] = fn;
//   }
//   return attrs;
// }

// function getComponentClazz(type: ComponentTypeEnum | string): any {
//   switch (type) {
//     case ComponentTypeEnum.DRAGGABLE:
//       return VueDraggableNext;
//     case ComponentTypeEnum.TRANSITIONGROUP:
//       return TransitionGroup;
//     default:
//       return resolveComponent(type);
//   }
// }
