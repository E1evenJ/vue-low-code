import { transformCamelCases } from '../common'
import { ComponentTypeEnum } from '../enums'
import * as DefaultAttrbute from './default-attrs/index'

export function getDefaultAttrs(type: ComponentTypeEnum) {
  const desc =
    new DefaultAttrbute[transformCamelCases(type.replace('di-', '')) as keyof typeof DefaultAttrbute]() || ({} as any)
  return desc
}
