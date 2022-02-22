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
import {
  IAttributeDescreptor,
  IComponentDescriptor,
  IComponentMetadata,
  IEventDescreptor,
  IMenu
} from '../../Interfaces'

export default class Form implements IComponentDescriptor {
  static menu = {
    uuid: 'component_form',
    label: '表单容器',
    type: ComponentTypeEnum.FORM,
    level: ComponentLevelEnum.ADVANCE,
    icon: 'icon-m-biaodan',
    draggable: ['-', 'form-item'],
    droppable: ['+', 'form-item']
  }
  static attrDescs = [
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
  static eventDescs = [new ValidateE()]
  static tools = [ToolType.PLUS, ToolType.COPY, ToolType.DELETE]
  get menu(): IMenu {
    return Form.menu
  }
  get attrDescs(): IAttributeDescreptor[] {
    return Form.attrDescs
  }
  get eventDescs(): IEventDescreptor[] {
    return Form.eventDescs
  }
  get tools(): ToolType[] {
    return Form.tools
  }

  defaultAttrs = { span: 24 }
  getHtml(meta: IComponentMetadata, content: string): string {
    return `<el-form class="el-row el-col-${meta.attrs?.span} ${meta.attrs?.class}">${content}</el-form>`
  }
}
