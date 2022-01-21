import { ToolType } from '@/utils/enums'
import { AttributeDescreptor, Uuid } from '../AttributeDescreptor'
import { EventDescreptor } from '../EventDescreptor'
import { Descriptor } from './descriptor'

export class Page implements Descriptor {
  tools: ToolType[]
  attrDescs: AttributeDescreptor[]
  eventDescs: EventDescreptor[]
  constructor() {
    this.attrDescs = [new Uuid()]
    this.eventDescs = []
    this.tools = []
  }
}
