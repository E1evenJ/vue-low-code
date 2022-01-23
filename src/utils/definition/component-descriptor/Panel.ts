import { ToolType } from '@/utils/enums'
import { IAttributeDescreptor, Uuid, Span } from '../AttributeDescreptor'
import { IEventDescreptor } from '../EventDescreptor'
import { IDescriptor } from './Descriptor'

export class Panel implements IDescriptor {
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  constructor() {
    this.attrDescs = [new Uuid(), new Span()]
    this.eventDescs = []
    this.tools = [ToolType.DELETE, ToolType.COPY]
  }
}
