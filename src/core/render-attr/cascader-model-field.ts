import { h, resolveComponent } from 'vue'
import { bindModel } from '@/utils/common'
import { IAttributeDescreptor } from '../definition/Interfaces'
import designer from '../designer'
import { RenderTypeEnum } from '@/utils/enums'
import { dataSelect } from '@/utils/attr-util'

const cascaderModelProxy = (checkStrictly: boolean) => {
  return (attrDesc: IAttributeDescreptor, attrs: any, modelFiledName: string, ctx?: any) => {
    const options = dataSelect(designer.pageMetadata)
    const attrComponent = h(
      resolveComponent('el-cascader') as any,
      {
        class: 'attr-right',
        modelValue: attrs[modelFiledName],
        'onUpdate:modelValue': (value: any) => {
          const checkedNode = ctx.$refs.cascader.getCheckedNodes()
          attrs[modelFiledName] = value
          const path = [...checkedNode[0].pathValues]
          path[0] === 'props' && path.splice(0, 1)
          path[0] === 'data' && path.splice(0, 1)
          attrs[modelFiledName + '_path'] = path
        },
        options,
        props: { value: 'name', label: 'name', children: 'children', emitPath: false, checkStrictly: checkStrictly },
        'show-all-levels': true,
        clearable: true,
        ref: 'cascader'
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
