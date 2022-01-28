import { camel2Kebab, cloneDeep, kebab2Camel } from '@/utils/common'
import { ComponentTypeEnum } from '@/utils/enums'
import { IAttributeDescreptor, IDescriptor } from './Interfaces'

const map = new Map<ComponentTypeEnum, IDescriptor>()
const descriptors = new Map<string, any>()
const files = require.context('./component-descriptor', false, /.ts$/) as any
files.keys().forEach((key: string) => {
  const clazz = files(key).default as any
  clazz && descriptors.set(clazz.name, clazz)
})
export const componentDescriptors = descriptors

export function getComponentDescriptor(type: ComponentTypeEnum) {
  let desc = map.get(type)
  if (desc === undefined) {
    const clazz = descriptors.get(kebab2Camel(type.replace('di-', '')))
    desc = (new clazz() as IDescriptor) || ({} as IDescriptor)
    map.set(type, desc)
  }
  return desc
}

export function getDefaultAttrs(type: ComponentTypeEnum) {
  const desc = getComponentDescriptor(type)
  const defaultAttrs: any = {}
  desc.attrDescs.forEach((attrDesc: IAttributeDescreptor) => {
    const field = camel2Kebab(attrDesc.constructor.name)
    defaultAttrs[field] = attrDesc.default
    desc.defaultAttrs && (defaultAttrs[field] = desc.defaultAttrs[field])
  })
  return cloneDeep(defaultAttrs)
}
