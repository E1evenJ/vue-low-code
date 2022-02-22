import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

function select(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
  if (attrDesc.renderValue) {
    const attrComponent = h(
      resolveComponent('el-select'),
      { class: 'attr-right', placeholder: '请选择', ...bindModel(attrs, modelFiledName) },
      () =>
        attrDesc.renderValue?.map((item: any) => {
          return h(resolveComponent('el-option'), {
            label: item.label,
            value: item.value
          })
        })
    )
    return attrComponent
  }
}
const render = { [RenderTypeEnum.SELECT]: select }
export default render
