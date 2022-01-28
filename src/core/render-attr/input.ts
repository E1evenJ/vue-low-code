import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../definition/Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

function input(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
  const attrComponent = h(resolveComponent('el-input'), {
    class: 'attr-right',
    ...bindModel(attrs, modelFiledName)
  })
  return attrComponent
}
const render = { [RenderTypeEnum.INPUT]: input, [RenderTypeEnum.INPUT_I18N]: input }
export default render
