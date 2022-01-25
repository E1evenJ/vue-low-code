import { IComponentMetadata } from './definition/Interfaces'
import designer from './designer'
import { ComponentTypeEnum } from './enums'

class IndexHandler {
  private _indexSet: Map<ComponentTypeEnum, number> = new Map()

  getCount(type: ComponentTypeEnum): number {
    return this._indexSet.get(type) || 0
  }

  plusCount(type: ComponentTypeEnum): number {
    if (this._indexSet.get(type) === undefined) {
      this._indexSet.set(type, 0)
    }
    const count = this.countConponentByType(type, designer.componentMetadatas) + 1
    this._indexSet.set(type, count)
    return count
  }

  countConponentByType(type: ComponentTypeEnum, arr?: IComponentMetadata[]) {
    let max = 0
    arr?.forEach(item => {
      if (item.type === type) {
        const id = +item.uuid.split('_')[1]
        id > max && (max = id)
      }
      const res = this.countConponentByType(type, item.children)
      res > max && (max = res)
    })
    return max
  }
}
export const indexHandler = new IndexHandler()
