// import { resolveComponent, TransitionGroup, h, ConcreteComponent } from 'vue';
// import { VueDraggableNext } from 'vue-draggable-next';

import { IDescriptor } from './definition/component-descriptor/descriptor'
import { getDefaultAttrs } from './definition/DefaultAttributeFactory'
import { getDescriptor } from './definition/DescriptorFactory'
import { ActionTypeEnum, ComponentLevelEnum, ComponentTypeEnum, StoreTypeEnum } from './enums'

export interface Event {
  eventName: string
  label: string
  children?: Action[]
  isRoot: boolean
}

export interface Action {
  eventName: string
  label: string
  actionType: ActionTypeEnum
  condition?: string
  returnVal: boolean
  storeReturnVal?: StoreTypeEnum
  params?: any
  methods?: Method | ActionGroup
}

export interface ActionGroup {
  name: string
  memo: string
  isGroup: boolean
  actions: Action[]
}

export interface Method {
  name: string
  code: string
  isSync: boolean
}

export interface RenderTree {
  uuid: string
  name?: string
  type: ComponentTypeEnum
  level: ComponentLevelEnum
  icon?: string
  attrs: {
    [index: string]: any
  }
  events?: Event[]
  methods?: Method[]
  methodGroups?: ActionGroup[]
  desc: IDescriptor
  children: RenderTree[]
}

export class ComponentTreeHandler {
  private _dragData = {}
  private _tree: RenderTree[] = []
  private _selectedComponentuuid: string | null = null
  private _selectedComponentEl: HTMLElement | null = null
  private _onSelectedComponentChangeHandlers: any[] = []
  private _count: any = {}
  setData(data: any): void {
    this._dragData = data
  }

  getData(): any {
    return this._dragData
  }

  setCount(type: ComponentTypeEnum, count: number): void {
    this._count[type] = count
  }

  getCount(type: ComponentTypeEnum): number {
    return this._count[type]
  }

  plusCount(type: ComponentTypeEnum | string): number {
    if (this._count[type] === undefined) {
      this._count[type] = 0
    }
    return ++this._count[type]
  }

  setTree(tree: RenderTree[]): void {
    this._tree = tree
  }

  getTree(): RenderTree[] {
    return this._tree
  }

  setSelectedComponent(elem: HTMLElement | null, uuid: string | null): void {
    if (uuid !== this._selectedComponentuuid) {
      this._selectedComponentEl = elem
      this._selectedComponentuuid = uuid
      const metadata = this.getSelectedComponentMetadata()
      this._onSelectedComponentChangeHandlers.forEach((fn: any) => fn(metadata, elem))
    }
  }

  onSelectedComponentChange(func: (metadata: any, el: HTMLElement | null) => void): void {
    this._onSelectedComponentChangeHandlers.push(func)
  }

  getSelectedComponentMetadata(): RenderTree | null {
    const uuid = this._selectedComponentuuid
    return this._recursionTree(this._tree, uuid)
  }

  private _recursionTree(tree: RenderTree[], uuid: any): RenderTree | null {
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
    const dragData = this.getData()
    if (dragData && dragData.component.list) {
      const item = dragData.component.list[newIndex]
      const newMetadata = {
        uuid: `${item.type.split('-')[1]}_${this.plusCount(item.type)}`,
        type: item.type,
        level: item.level,
        attrs: getDefaultAttrs(item.type),
        desc: getDescriptor(item.type),
        children: []
      }
      dragData.component.list.splice(newIndex, 1, newMetadata)
    }
  }

  copy(metadata: RenderTree): void {
    const newMetaData = {
      uuid: `${metadata.type.split('-')[1]}_${componentTreeHandler.plusCount(metadata.type)}`,
      type: metadata.type,
      level: metadata.level,
      attrs: {
        span: [ComponentLevelEnum.LAYOUT].includes(metadata.level) ? 24 : 6
      },
      desc: getDescriptor(metadata.type),
      children: []
    }
    this._splice(metadata, newMetaData)
  }

  private _recursion(tree: RenderTree, uuid: string): RenderTree | undefined {
    if (tree.children) {
      for (const metadata of tree.children) {
        if (metadata.uuid === uuid) return tree
        else {
          const res = this._recursion(metadata, uuid)
          if (res) return res
        }
      }
    }
  }

  private _splice(metadata: RenderTree, newMetadata?: RenderTree): void {
    const parentMetadata = this._recursion(this._tree[0], metadata.uuid)
    const children = parentMetadata?.children
    const index = children?.indexOf(metadata)
    if (index !== undefined) {
      if (newMetadata) children?.splice(index + 1, 0, newMetadata)
      else children?.splice(index, 1)
    }
  }

  remove(metadata: RenderTree) {
    this._splice(metadata)
    this.setSelectedComponent(null, null)
  }
}
export const componentTreeHandler = new ComponentTreeHandler()

export function countConponentByType(type: ComponentTypeEnum, arr?: RenderTree[]) {
  let max = 0
  arr?.forEach(item => {
    if (item.type === type) {
      const id = +item.uuid.split('_')[1]
      id > max && (max = id)
    }
    const res = countConponentByType(type, item.children)
    res > max && (max = res)
  })
  return max
}

// export function tree2RenderTree(tree: RenderTree) {
//   const children = [] as any[];
//   for (const child of tree.children) {
//     children.push(tree2RenderTree(child));
//   }
//   return h(getComponentClazz(tree.type), getAttrs(tree), children);
// }

// function getAttrs(ele: RenderTree) {
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

// function bindEvents(ele: RenderTree, attrs: any) {
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
