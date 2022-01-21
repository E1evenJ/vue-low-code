import { ToolType } from '@/utils/enums'
import { AttributeDescreptor, Uuid, Span } from '../AttributeDescreptor'
import { EventDescreptor } from '../EventDescreptor'
import { Descriptor } from './descriptor'

export class Panel implements Descriptor {
  tools: ToolType[]
  attrDescs: AttributeDescreptor[]
  eventDescs: EventDescreptor[]
  constructor() {
    this.attrDescs = [new Uuid(), new Span()]
    this.eventDescs = []
    this.tools = [ToolType.DELETE, ToolType.COPY]
  }
}
