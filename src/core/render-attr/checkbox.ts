import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

function checkbox(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
  const attrComponent = h(resolveComponent('el-checkbox'), {
    class: 'attr-right',
    ...bindModel(attrs, modelFiledName)
  })
  return attrComponent
}
const render = { [RenderTypeEnum.CHECKBOX]: checkbox }
export default render
