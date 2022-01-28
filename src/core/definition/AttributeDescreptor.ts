import { RenderTypeEnum } from '@/utils/enums'
import { IAttributeDescreptor } from './Interfaces'

export class Uuid implements IAttributeDescreptor {
  value = '组件编号'
  renderType = RenderTypeEnum.TEXT
  default: any
}

export class Span implements IAttributeDescreptor {
  value = '宽度'
  desc = '栅格宽度,将按24等分设置布局宽度,该项优先级低于像素宽度'
  renderType = RenderTypeEnum.SLIDER
  min = 2
  max = 24
  step = 2
  default = 24
}

export class ModelField implements IAttributeDescreptor {
  value = '模型字段'
  desc = '绑定数据模型字段(v-model)'
  renderType = RenderTypeEnum.CASCADER_MODEL_FIELD
  default = null
}

export class Model implements IAttributeDescreptor {
  value = '模型'
  desc = '绑定数据模型字段(v-model)'
  renderType = RenderTypeEnum.CASCADER_MODEL
  default = null
}

export class Type implements IAttributeDescreptor {
  value = '输入类型'
  desc = '输入框类型'
  renderType = RenderTypeEnum.SELECT
  renderValue = [
    { value: 'text', label: '文本框' },
    { value: 'textarea', label: '文本域' },
    { value: 'password', label: '密码框' }
  ]
  default = 'text'
}

export class Placeholder implements IAttributeDescreptor {
  value = '占位文本'
  renderType = RenderTypeEnum.INPUT_I18N
  default = '请输入'
}

export class Clearable implements IAttributeDescreptor {
  key = 'text-clear'
  value = '清空按钮'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}
export class TextClearBlank implements IAttributeDescreptor {
  value = '去空白字符'
  desc = '自动过滤用户输入的首尾空白字符'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class Lazy implements IAttributeDescreptor {
  value = 'lazy修饰符'
  desc = '在 change 事件之后进行v-model同步'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class Size implements IAttributeDescreptor {
  value = '组件尺寸'
  renderType = RenderTypeEnum.BUTTON_GROUP
  renderValue = [
    { value: 'large', label: '较大' },
    { value: 'default', label: '中等' },
    { value: 'small', label: '较小' }
  ]
  default = 'default'
}

export class Rule implements IAttributeDescreptor {
  value = '验证规则'
  desc = '表单验证规则'
  renderType = RenderTypeEnum.RULES
  default = null
}

export class Inline implements IAttributeDescreptor {
  value = '行内表单模式'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class LabelPosition implements IAttributeDescreptor {
  value = '域标签的位置'
  desc = '表单域标签的位置， 如果值为 左 或者 右 时，则需要设置 label-width'
  renderType = RenderTypeEnum.BUTTON_GROUP
  renderValue = [
    { value: 'left', label: '左' },
    { value: 'right', label: '右' },
    { value: 'top', label: '上' }
  ]
  default = 'right'
}

export class LabelWidth implements IAttributeDescreptor {
  value = '域标签的宽度'
  desc = "表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto"
  renderType = RenderTypeEnum.INPUT
  default = null
}

export class LabelSuffix implements IAttributeDescreptor {
  value = '域标签的后缀'
  renderType = RenderTypeEnum.INPUT
  default = null
}

export class HideRequiredAsterisk implements IAttributeDescreptor {
  value = '红色星号'
  desc = '是否显示必填字段的标签旁边的红色星号'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class ShowMessage implements IAttributeDescreptor {
  value = '校验错误信息'
  desc = '是否显示校验错误信息'
  renderType = RenderTypeEnum.CHECKBOX
  default = true
}

export class InlineMessage implements IAttributeDescreptor {
  value = '行内形式展示'
  desc = '是否以行内形式展示校验信息'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class StatusIcon implements IAttributeDescreptor {
  value = '反馈图标'
  desc = '是否在输入框中显示校验结果反馈图标'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class ValidateOnRuleChange implements IAttributeDescreptor {
  value = '规则改变后验证'
  desc = '是否在 rules 属性改变后立即触发一次验证'
  renderType = RenderTypeEnum.CHECKBOX
  default = true
}

export class Disabled implements IAttributeDescreptor {
  value = '禁用'
  desc = '是否禁用该表单内的所有组件。 若设置为 true，则表单内组件上的 disabled 属性不再生效'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}

export class prop implements IAttributeDescreptor {
  value = '表单项字段'
  desc = '表单域 model 字段， 在使用 validate、resetFields 方法的情况下，该属性是必填的'
  renderType = RenderTypeEnum.CASCADER_MODEL_FIELD
  default = null
}

export class Label implements IAttributeDescreptor {
  value = '标签'
  renderType = RenderTypeEnum.INPUT_I18N
  default = null
}

export class Required implements IAttributeDescreptor {
  value = '是否必填'
  desc = '是否必填，如不设置，则会根据校验规则自动生成'
  renderType = RenderTypeEnum.CHECKBOX
  default = false
}
