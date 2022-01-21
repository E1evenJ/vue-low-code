import { ToolType } from '@/utils/enums'
import { IAttributeDescreptor, Uuid } from '../AttributeDescreptor'
import { IEventDescreptor } from '../EventDescreptor'
import { IDescriptor } from './descriptor'

export class Page implements IDescriptor {
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  constructor() {
    this.attrDescs = [new Uuid()]
    this.eventDescs = []
    this.tools = []
  }
}
