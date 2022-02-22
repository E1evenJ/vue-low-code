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
import {
  IAttributeDescreptor,
  IComponentDescriptor,
  IComponentMetadata,
  IEventDescreptor,
  IMenu
} from '../../Interfaces'
import { attr2AttrStr } from '@/utils/component-util'

export default class FormItem implements IComponentDescriptor {
  static menu = {
    uuid: 'component_form_item',
    label: '表单项',
    type: ComponentTypeEnum.FORM_ITEM,
    level: ComponentLevelEnum.ADVANCE,
    icon: 'icon-zujian',
    draggable: ['+', 'form'],
    droppable: ['-', 'form', 'form-item', 'panel']
  }
  static attrDescs = [
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
  static eventDescs = []
  static tools = [ToolType.COPY, ToolType.DELETE]
  get menu(): IMenu {
    return FormItem.menu
  }
  get attrDescs(): IAttributeDescreptor[] {
    return FormItem.attrDescs
  }
  get eventDescs(): IEventDescreptor[] {
    return FormItem.eventDescs
  }
  get tools(): ToolType[] {
    return FormItem.tools
  }

  defaultAttrs = { span: 6 }
  getHtml(meta: IComponentMetadata, content: string): string {
    return `<el-form-item class="el-col-${meta.attrs?.span} el-row ${meta.attrs?.class}"${attr2AttrStr(
      ':label',
      meta.attrs?.label
    )}${attr2AttrStr(':label-width', meta?.attrs['label-width'])}${attr2AttrStr(
      ':size',
      meta.attrs?.size
    )}>${content}</el-form-item>`
  }
}
