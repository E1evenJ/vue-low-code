import { h } from 'vue'
import { IAttributeDescreptor } from '../Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

function text(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
  const attrComponent = h('span', { class: 'attr-right' }, attrs[modelFiledName])
  return attrComponent
}
const render = { [RenderTypeEnum.TEXT]: text }
export default render
