import { transformCamelCases } from '../common'
import { ComponentTypeEnum } from '../enums'
import { IDescriptor } from './component-descriptor/descriptor'
import * as ComponentDescriptor from './component-descriptor/index'

export function getDescriptor(type: ComponentTypeEnum) {
  const desc =
    new ComponentDescriptor[transformCamelCases(type.replace('di-', '')) as keyof typeof ComponentDescriptor]() ||
    ({} as IDescriptor)
  return desc
}
