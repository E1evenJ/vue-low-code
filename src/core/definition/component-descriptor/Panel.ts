import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import { Uuid, Span } from '../AttributeDescreptor'
import { IAttributeDescreptor, IDescriptor, IEventDescreptor } from '../Interfaces'

export default class Panel implements IDescriptor {
  static uuid = 'component_panel'
  static label = '容器'
  static type = ComponentTypeEnum.PANEL
  static level = ComponentLevelEnum.LAYOUT
  static icon = 'icon-rongqi'
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  constructor() {
    this.attrDescs = [new Uuid(), new Span()]
    this.eventDescs = []
    this.tools = [ToolType.DELETE, ToolType.COPY]
  }
}
