import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import { Uuid, Span } from '../AttributeDescreptor'
import {
  IAttributeDescreptor,
  IComponentDescriptor,
  IComponentMetadata,
  IEventDescreptor,
  IMenu
} from '../../Interfaces'

export default class Panel implements IComponentDescriptor {
  static menu = {
    uuid: 'component_panel',
    label: '容器',
    type: ComponentTypeEnum.PANEL,
    level: ComponentLevelEnum.LAYOUT,
    icon: 'icon-rongqi'
  }
  static attrDescs = [new Uuid(), new Span()]
  static eventDescs = []
  static tools = [ToolType.DELETE, ToolType.COPY]
  get menu(): IMenu {
    return Panel.menu
  }
  get attrDescs(): IAttributeDescreptor[] {
    return Panel.attrDescs
  }
  get eventDescs(): IEventDescreptor[] {
    return Panel.eventDescs
  }
  get tools(): ToolType[] {
    return Panel.tools
  }

  defaultAttrs = { span: 24 }
  getHtml(meta: IComponentMetadata, content: string): string {
    return `<div class="el-row el-col-${meta.attrs?.span} ${meta.attrs?.class}">${content}</div>`
  }
}
