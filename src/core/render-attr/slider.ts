import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

function slider(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
  const attrComponent = h(resolveComponent('el-slider'), {
    class: 'attr-right',
    ...bindModel(attrs, modelFiledName),
    min: attrDesc.min,
    max: attrDesc.max,
    step: attrDesc.step,
    'show-stops': true
  })
  return attrComponent
}
const render = { [RenderTypeEnum.SLIDER]: slider }
export default render
