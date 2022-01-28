import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../definition/Interfaces'
import designer from '../designer'
import { RenderTypeEnum } from '@/utils/enums'

function cascaderModelProxy(showAllLeval: boolean) {
  return function cascaderModel(attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string) {
    const props = designer.pageMetadata.props
    const data = designer.pageMetadata.data
    const requests: any[] = []
    const responses: any[] = []
    designer.pageMetadata.apis.forEach(api => {
      api.request && requests.push({ name: api.request.name, children: api.request.data })
      api.response && responses.push({ name: api.response.name, children: api.response.data })
    })
    const options = []
    props.length > 0 && options.push({ name: 'params', children: props })
    data.length > 0 && options.push({ name: 'data', children: data })
    options.push(...requests)
    options.push(...responses)
    const attrComponent = h(
      resolveComponent('el-cascader') as any,
      {
        class: 'attr-right',
        ...bindModel(attrs, modelFiledName),
        options,
        props: { value: 'name', label: 'name', children: 'children', emitPath: false, checkStrictly: true },
        'show-all-levels': showAllLeval,
        clearable: true
      },
      {
        default: ({ data }: any) => {
          return [
            `${data.name}${data.memo !== '' && data.memo !== undefined ? '(' + data.memo + ')' : ''}`
            // h(resolveComponent('el-icon'), {}, () => [
            //   h(resolveComponent('circle-plus'), { style: { 'margin-left': '5px' } })
            // ])
          ]
        },
        empty: () => '没有数据'
      }
    )
    return attrComponent
  }
}

const render = {
  [RenderTypeEnum.CASCADER_MODEL_FIELD]: cascaderModelProxy(false),
  [RenderTypeEnum.CASCADER_MODEL]: cascaderModelProxy(true)
}
export default render
