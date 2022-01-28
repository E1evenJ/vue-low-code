import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import { Uuid } from '../AttributeDescreptor'
import { IAttributeDescreptor, IDescriptor, IEventDescreptor } from '../Interfaces'

export default class Page implements IDescriptor {
  static uuid = 'component_page'
  static label = 'Page'
  static type = ComponentTypeEnum.FORM
  static level = ComponentLevelEnum.ADVANCE
  static icon = ''
  static enable = false
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  constructor() {
    this.attrDescs = [new Uuid()]
    this.eventDescs = []
    this.tools = []
  }
}
