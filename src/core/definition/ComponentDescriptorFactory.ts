import { camel2Kebab, cloneDeep, kebab2Camel } from '@/utils/common'
import { ComponentTypeEnum } from '@/utils/enums'
import { IAttributeDescreptor, IComponentDescriptor } from '../Interfaces'

const map = new Map<ComponentTypeEnum, any>()
const compDescs = new Map<string, any>()
const files = require.context('./component-descriptor', false, /.ts$/) as any
files.keys().forEach((key: string) => {
  const clazz = files(key).default as any
  clazz && compDescs.set(clazz.name, clazz)
})
export const componentDescriptors = compDescs
console.log(compDescs)
export function getComponentDescriptor(type: ComponentTypeEnum): any {
  let compDesc = map.get(type)
  if (compDesc === undefined) {
    const clazz = compDescs.get(kebab2Camel(type.replace('di-', '')))
    compDesc = (new clazz() as IComponentDescriptor) || ({} as IComponentDescriptor)
    map.set(type, compDesc)
  }
  return compDesc
}

export function getDefaultAttrs(type: ComponentTypeEnum) {
  const compDesc = getComponentDescriptor(type)
  const defaultAttrs: any = {}
  compDesc.attrDescs.forEach((attrDesc: IAttributeDescreptor) => {
    const field = camel2Kebab(attrDesc.constructor.name)
    defaultAttrs[field] = attrDesc.default
    console.log(compDesc)
    compDesc.defaultAttrs && (defaultAttrs[field] = compDesc.defaultAttrs[field])
  })

  return cloneDeep(defaultAttrs)
}
