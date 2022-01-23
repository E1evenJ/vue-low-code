import { transformCamelCases } from '../common'
import { ComponentTypeEnum } from '../enums'
import { IDescriptor } from './component-descriptor/Descriptor'
import * as ComponentDescriptor from './component-descriptor/index'

const map = new Map<ComponentTypeEnum, IDescriptor>()

export function getDescriptor(type: ComponentTypeEnum) {
  let desc = map.get(type)
  if (desc === undefined) {
    desc =
      new ComponentDescriptor[transformCamelCases(type.replace('di-', '')) as keyof typeof ComponentDescriptor]() ||
      ({} as IDescriptor)
    map.set(type, desc)
  }
  return desc
}
