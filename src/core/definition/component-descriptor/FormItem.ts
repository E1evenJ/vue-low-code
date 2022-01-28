import { ComponentLevelEnum, ComponentTypeEnum, ToolType } from '@/utils/enums'
import {
  Disabled,
  InlineMessage,
  Label,
  LabelWidth,
  ModelField,
  Required,
  Rule,
  ShowMessage,
  Size,
  Span,
  Uuid
} from '../AttributeDescreptor'
import { IAttributeDescreptor, IDescriptor, IEventDescreptor } from '../Interfaces'

export default class FormItem implements IDescriptor {
  static uuid = 'component_form_item'
  static label = '表单项'
  static type = ComponentTypeEnum.FORM_ITEM
  static level = ComponentLevelEnum.ADVANCE
  static icon = 'icon-zujian'
  static draggable = ['+', 'form']
  static droppable = ['-', 'form', 'form-item', 'panel']
  tools: ToolType[]
  attrDescs: IAttributeDescreptor[]
  eventDescs: IEventDescreptor[]
  defaultAttrs = { span: 6 }
  get draggable() {
    return FormItem.draggable
  }

  get droppable() {
    return FormItem.droppable
  }

  constructor() {
    this.tools = [ToolType.COPY, ToolType.DELETE]
    this.attrDescs = [
      new Uuid(),
      new Span(),
      new Size(),
      new Label(),
      new ModelField(),
      new LabelWidth(),
      new Required(),
      new Rule(),
      new ShowMessage(),
      new InlineMessage(),
      new Disabled()
    ]
    this.eventDescs = []
  }
}
