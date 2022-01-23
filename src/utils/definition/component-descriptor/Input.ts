import { ToolType } from '@/utils/enums'
import {
  IAttributeDescreptor,
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
  IEventDescreptor,
  BlurE,
  ChangeE,
  ClickE,
  DoubleClickE,
  FocusE,
  InputE,
  KeydownE,
  KeyUpE
} from '../EventDescreptor'
import { IDescriptor } from './Descriptor'

export class Input implements IDescriptor {
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
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
