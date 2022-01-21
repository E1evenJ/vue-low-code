import { ToolType } from '@/utils/enums'
import {
  AttributeDescreptor,
  Uuid,
  ElementSize,
  InputType,
  ModelFieldLazy,
  TextClear,
  TextClearBlank,
  TextPlaceholder,
  Span
} from '../AttributeDescreptor'
import {
  EventDescreptor,
  BlurE,
  ChangeE,
  ClickE,
  DoubleClickE,
  FocusE,
  InputE,
  KeydownE,
  KeyUpE
} from '../EventDescreptor'
import { Descriptor } from './descriptor'

export class Input implements Descriptor {
  tools: ToolType[]
  attrDescs: AttributeDescreptor[]
  eventDescs: EventDescreptor[]
  constructor() {
    this.attrDescs = [
      new Uuid(),
      new InputType(),
      new TextPlaceholder(),
      new TextClear(),
      new TextClearBlank(),
      new ModelFieldLazy(),
      new Span(),
      new ElementSize()
    ]
    this.eventDescs = [
      new ClickE(),
      new DoubleClickE(),
      new FocusE(),
      new BlurE(),
      new InputE(),
      new ChangeE(),
      new KeydownE(),
      new KeyUpE()
    ]
    this.tools = [ToolType.SETTING, ToolType.DELETE, ToolType.COPY]
  }
}
