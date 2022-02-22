import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import { Uuid } from '../AttributeDescreptor'
import {
  IAttributeDescreptor,
  IComponentDescriptor,
  IComponentMetadata,
  IEventDescreptor,
  IMenu,
  IPageMetadata
} from '../../Interfaces'
import { randomName } from '@/utils/common'

export default class Page implements IComponentDescriptor {
  static menu = {
    uuid: 'component_page',
    label: 'Page',
    type: ComponentTypeEnum.PANEL,
    level: ComponentLevelEnum.LAYOUT,
    icon: 'icon-rongqi',
    enable: false
  }
  static attrDescs = [new Uuid()]
  static eventDescs = []
  static tools = []
  get menu(): IMenu {
    return Page.menu
  }
  get attrDescs(): IAttributeDescreptor[] {
    return Page.attrDescs
  }
  get eventDescs(): IEventDescreptor[] {
    return Page.eventDescs
  }
  get tools(): ToolType[] {
    return Page.tools
  }

  defaultAttrs = { span: 24 }
  getHtml(meta: IComponentMetadata, content: string): string {
    return `<div class="page-${randomName()} el-row">${content}</div>`
  }
}
