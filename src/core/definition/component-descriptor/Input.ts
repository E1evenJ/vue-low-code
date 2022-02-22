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
import {
  IAttributeDescreptor,
  IComponentDescriptor,
  IComponentMetadata,
  IEventDescreptor,
  IMenu
} from '../../Interfaces'
import { attr2AttrStr } from '@/utils/attr-util'

export default class Input implements IComponentDescriptor {
  static menu = {
    uuid: 'component_input',
    label: '输入框',
    type: ComponentTypeEnum.INPUT,
    level: ComponentLevelEnum.COMMON,
    icon: 'icon-biaodanzujian-shurukuang'
  }
  static attrDescs = [
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
  static eventDescs = [
    new ClickE(),
    new DoubleClickE(),
    new FocusE(),
    new BlurE(),
    new InputE(),
    new ChangeE(),
    new KeydownE(),
    new KeyUpE()
  ]
  static tools = [ToolType.SETTING, ToolType.DELETE, ToolType.COPY]
  get menu(): IMenu {
    return Input.menu
  }
  get attrDescs(): IAttributeDescreptor[] {
    return Input.attrDescs
  }
  get eventDescs(): IEventDescreptor[] {
    return Input.eventDescs
  }
  get tools(): ToolType[] {
    return Input.tools
  }

  defaultAttrs = { span: 6 }
  getHtml(meta: IComponentMetadata): string {
    return `<el-input class="el-col-${meta.attrs?.span} ${meta.attrs?.class}"${attr2AttrStr(
      'v-model',
      meta.attrs['model-field_path'] && meta.attrs['model-field_path'].join('.')
    )}${attr2AttrStr('placeholder', meta.attrs.placeholder)}></el-input>`
  }
  getScript(meta: IComponentMetadata): string {
    throw new Error('Method not implemented.')
  }
}
