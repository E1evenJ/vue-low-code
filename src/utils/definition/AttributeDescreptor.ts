import { RenderTypeEnum } from '../enums'

export interface IAttributeDescreptor {
  value: string
  desc?: string
  RenderTypeEnum: RenderTypeEnum
  renderValue?: { [x: string]: any }
  [key: string]: any
}

export class Uuid implements IAttributeDescreptor {
  value = '组件编号'
  RenderTypeEnum = RenderTypeEnum.TEXT
}

export class Span implements IAttributeDescreptor {
  value = '宽度'
  desc = '栅格宽度,将按24等分设置布局宽度,该项优先级低于像素宽度'
  RenderTypeEnum = RenderTypeEnum.SLIDER
  min = 2
  max = 24
  step = 2
}

export class ModelField implements IAttributeDescreptor {
  value = '模型字段'
  desc = '绑定数据模型字段(v-model)'
  RenderTypeEnum = RenderTypeEnum.CASCADER_MODEL
}

export class InputType implements IAttributeDescreptor {
  value = '输入类型'
  desc = '输入框类型'
  RenderTypeEnum = RenderTypeEnum.SELECT
  renderValue = [
    { key: 'text', value: '文本框' },
    { key: 'textarea', value: '文本域' },
    { key: 'password', value: '密码框' }
  ]
}

export class TextPlaceholder implements IAttributeDescreptor {
  value = '占位文本'
  RenderTypeEnum = RenderTypeEnum.INPUT_I18N
}

export class TextClear implements IAttributeDescreptor {
  key = 'text-clear'
  value = '清空按钮'
  RenderTypeEnum = RenderTypeEnum.CHECKBOX
}
export class TextClearBlank implements IAttributeDescreptor {
  value = '去空白字符'
  desc = '自动过滤用户输入的首尾空白字符'
  RenderTypeEnum = RenderTypeEnum.CHECKBOX
}

export class ModelFieldLazy implements IAttributeDescreptor {
  value = 'lazy修饰符'
  desc = '在 change 事件之后进行vmodel同步'
  RenderTypeEnum = RenderTypeEnum.CHECKBOX
}

export class ElementSize implements IAttributeDescreptor {
  value = '组件尺寸'
  RenderTypeEnum = RenderTypeEnum.BUTTON_GROUP
  renderValue = [
    { key: 'large', value: '较大' },
    { key: 'default', value: '中等' },
    { key: 'small', value: '较小' }
  ]
}
