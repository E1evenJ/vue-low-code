import { transformCamelCases } from '../common'
import { ComponentTypeEnum } from '../enums'
import * as DefaultAttrbute from './default-attrs/index'
const map = new Map<ComponentTypeEnum, any>()

export function getDefaultAttrs(type: ComponentTypeEnum) {
  let defaultAttrs = map.get(type)
  if (defaultAttrs === undefined) {
    defaultAttrs =
      new DefaultAttrbute[transformCamelCases(type.replace('di-', '')) as keyof typeof DefaultAttrbute]() || ({} as any)
    map.set(type, defaultAttrs)
  }
  return defaultAttrs
}
