import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import {
  Uuid,
  Size,
  Type,
  Lazy,
  Clearable,
  TextClearBlank,
  Placeholder,
  Span,
  ModelField
} from '../AttributeDescreptor'
import { BlurE, ChangeE, ClickE, DoubleClickE, FocusE, InputE, KeydownE, KeyUpE } from '../EventDescreptor'
import { IAttributeDescreptor, IDescriptor, IEventDescreptor } from '../Interfaces'

export default class Input implements IDescriptor {
  static uuid = 'component_input'
  static label = '输入框'
  static type = ComponentTypeEnum.INPUT
  static level = ComponentLevelEnum.COMMON
  static icon = 'icon-biaodanzujian-shurukuang'
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  constructor() {
    this.attrDescs = [
      new Uuid(),
      new Span(),
      new Size(),
      new Type(),
      new ModelField(),
      new Placeholder(),
      new Clearable(),
      new TextClearBlank(),
      new Lazy()
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
