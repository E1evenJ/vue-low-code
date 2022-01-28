import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../definition/Interfaces'
import { RenderTypeEnum } from '@/utils/enums'

function buttonGroup(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
  const attrComponent = h(
    resolveComponent('el-radio-group'),
    {
      class: 'attr-right',
      size: 'small',
      ...bindModel(attrs, modelFiledName)
    },
    () =>
      attrDesc.renderValue?.map((item: any) => {
        return h(
          resolveComponent('el-radio-button'),
          {
            label: item.value
          },
          () => item.label
        )
      })
  )
  return attrComponent
}
const render = { [RenderTypeEnum.BUTTON_GROUP]: buttonGroup }
export default render
