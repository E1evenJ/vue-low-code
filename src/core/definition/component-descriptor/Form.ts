import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import {
  Disabled,
  HideRequiredAsterisk,
  Inline,
  InlineMessage,
  LabelPosition,
  LabelSuffix,
  LabelWidth,
  Model,
  Rule,
  ShowMessage,
  Size,
  Span,
  StatusIcon,
  Uuid,
  ValidateOnRuleChange
} from '../AttributeDescreptor'
import { ValidateE } from '../EventDescreptor'
import { IAttributeDescreptor, IDescriptor, IEventDescreptor } from '../Interfaces'

export default class Form implements IDescriptor {
  static uuid = 'component_form'
  static label = '表单容器'
  static type = ComponentTypeEnum.FORM
  static level = ComponentLevelEnum.ADVANCE
  static icon = 'icon-m-biaodan'
  static draggable = ['-', 'form-item']
  static droppable = ['+', 'form-item']
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  get draggable() {
    return Form.draggable
  }

  get droppable() {
    return Form.droppable
  }
  constructor() {
    this.tools = [ToolType.SETTING, ToolType.COPY, ToolType.DELETE]
    this.attrDescs = [
      new Uuid(),
      new Span(),
      new Size(),
      new Model(),
      new Rule(),
      new Inline(),
      new LabelPosition(),
      new LabelWidth(),
      new LabelSuffix(),
      new HideRequiredAsterisk(),
      new ShowMessage(),
      new InlineMessage(),
      new StatusIcon(),
      new ValidateOnRuleChange(),

      new Disabled()
    ]
    this.eventDescs = [new ValidateE()]
  }
}
