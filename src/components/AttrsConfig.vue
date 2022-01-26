<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { h, resolveComponent } from 'vue'
import { IAttributeDescreptor } from '@/utils/definition/AttributeDescreptor'
import { RenderTypeEnum } from '@/utils/enums'
import { IComponentMetadata } from '@/utils/definition/Interfaces'
import designer from '@/utils/designer'
import { getDescriptor } from '@/utils/definition/DescriptorFactory'

@Options({
  components: {}
})
export default class AttrsConfig extends Vue {
  componentMetaData: IComponentMetadata | undefined = {} as IComponentMetadata
  RenderTypeEnum = RenderTypeEnum

  mounted() {
    designer.treeHandler.onSelectedComponentChange((item: any) => {
      this.componentMetaData = item
    })
  }

  render() {
    if (this.componentMetaData && this.componentMetaData.type) {
      const componentMetaData = this.componentMetaData
      const desc = getDescriptor(componentMetaData.type)
      return h(
        'div',
        {},
        desc.attrDescs.map((attrDesc: IAttributeDescreptor) => {
          componentMetaData.attrs.uuid = componentMetaData.uuid
          return this.renderAttrItem(attrDesc, componentMetaData.attrs)
        })
      )
    } else {
      return h('div')
    }
  }

  private renderAttrItem(attrDesc: IAttributeDescreptor, attrs: any) {
    let attrComponent
    const clazzName = attrDesc.constructor.name
    const modelFiledName = clazzName[0].toLowerCase() + clazzName.substring(1)
    switch (attrDesc.RenderTypeEnum) {
      case RenderTypeEnum.TEXT: {
        attrComponent = h('span', { class: 'attr-right' }, attrs[modelFiledName])
        break
      }
      case RenderTypeEnum.INPUT_I18N:
      case RenderTypeEnum.INPUT: {
        attrComponent = h(resolveComponent('el-input'), {
          class: 'attr-right',
          ...this.bindModel(attrs, modelFiledName)
        })
        break
      }
      case RenderTypeEnum.SELECT: {
        if (attrDesc.renderValue) {
          attrComponent = h(
            resolveComponent('el-select'),
            { class: 'attr-right', ...this.bindModel(attrs, modelFiledName) },
            () =>
              attrDesc.renderValue?.map((item: any) => {
                return h(resolveComponent('el-option'), {
                  label: item.label,
                  value: item.key
                })
              })
          )
        }
        break
      }
      case RenderTypeEnum.SLIDER: {
        attrComponent = h(resolveComponent('el-slider'), {
          class: 'attr-right',
          ...this.bindModel(attrs, modelFiledName),
          min: attrDesc.min,
          max: attrDesc.max,
          step: attrDesc.step,
          'show-stops': true
        })
        break
      }
      case RenderTypeEnum.CHECKBOX: {
        attrComponent = h(resolveComponent('el-checkbox'), {
          class: 'attr-right',
          ...this.bindModel(attrs, modelFiledName)
        })
        break
      }
      case RenderTypeEnum.BUTTON_GROUP: {
        attrComponent = h(
          resolveComponent('el-radio-group'),
          {
            class: 'attr-right',
            size: 'small',
            ...this.bindModel(attrs, modelFiledName)
          },
          () =>
            attrDesc.renderValue?.map((item: any) => {
              return h(
                resolveComponent('el-radio-button'),
                {
                  label: item.key
                },
                () => item.value
              )
            })
        )
        break
      }
      case RenderTypeEnum.CASCADER_MODEL: {
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
        attrComponent = h(
          resolveComponent('el-cascader') as any,
          {
            class: 'attr-right',
            ...this.bindModel(attrs, modelFiledName),
            options,
            props: { value: 'name', label: 'name', children: 'children', emitPath: false },
            'show-all-levels': false,
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
        break
      }
    }
    return h('div', { class: 'attr-item' }, [h('span', { class: 'label' }, attrDesc.value), attrComponent])
  }

  private bindModel(attrs: any, key: string) {
    return {
      modelValue: attrs[key],
      'onUpdate:modelValue': (value: any) => {
        attrs[key] = value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.attrsconfig {
}
</style>
