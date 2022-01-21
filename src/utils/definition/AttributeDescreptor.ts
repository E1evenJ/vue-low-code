import { RenderTypeEnum } from '../enums'

export interface AttributeDescreptor {
  value: string
  desc?: string
  RenderTypeEnum: RenderTypeEnum
  renderValue?: { [x: string]: any }
  [key: string]: any
}

export class Uuid implements AttributeDescreptor {
  value = '组件编号'
  RenderTypeEnum = RenderTypeEnum.TEXT
}

export class Span implements AttributeDescreptor {
  value = '宽度'
  desc = '栅格宽度,将按24等分设置布局宽度,该项优先级低于像素宽度'
  RenderTypeEnum = RenderTypeEnum.SLIDER
  min = 2
  max = 24
  step = 2
}

export class ModelField implements AttributeDescreptor {
  value = '模型字段'
  desc = '绑定数据模型字段(v-model)'
  RenderTypeEnum = RenderTypeEnum.DROPDOWN
}

export class InputType implements AttributeDescreptor {
  value = '输入类型'
  desc = '输入框类型'
  RenderTypeEnum = RenderTypeEnum.DROPDOWN
  renderValue = [
    { key: 'text', value: '文本框' },
    { key: 'textarea', value: '文本域' },
    { key: 'password', value: '密码框' }
  ]
}

export class TextPlaceholder implements AttributeDescreptor {
  value = '占位文本'
  RenderTypeEnum = RenderTypeEnum.INPUT_I18N
}

export class TextClear implements AttributeDescreptor {
  key = 'text-clear'
  value = '清空按钮'
  RenderTypeEnum = RenderTypeEnum.CHECKBOX
}
export class TextClearBlank implements AttributeDescreptor {
  value = '去空白字符'
  desc = '自动过滤用户输入的首尾空白字符'
  RenderTypeEnum = RenderTypeEnum.CHECKBOX
}

export class ModelFieldLazy implements AttributeDescreptor {
  value = 'lazy修饰符'
  desc = '在 change 事件之后进行vmodel同步'
  RenderTypeEnum = RenderTypeEnum.CHECKBOX
}

export class ElementSize implements AttributeDescreptor {
  value = '组件尺寸'
  RenderTypeEnum = RenderTypeEnum.BUTTON_GROUP
  renderValue = [
    { key: 'large', value: '较大' },
    { key: 'default', value: '中等' },
    { key: 'small', value: '较小' }
  ]
}
