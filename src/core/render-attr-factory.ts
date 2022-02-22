import { VNode } from 'vue'
import { IAttributeDescreptor } from './Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

const files = require.context('./render-attr', false, /.ts$/) as any
const renders: {
  [index: string]: (attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string, ctx?: any) => VNode | undefined
} = {}
files.keys().forEach((key: string) => {
  const render = files(key).default as any
  for (const key in render) {
    const func = render[key]
    renders[key] = func
  }
})

export function getAttrRender(type: RenderTypeEnum) {
  return renders[type]
}
