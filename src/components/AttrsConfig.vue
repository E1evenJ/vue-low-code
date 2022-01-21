<script lang="ts">
import { componentTreeHandler, RenderTree } from '@/utils/render-tree'
import { Options, Vue } from 'vue-class-component'
import { h, resolveComponent } from 'vue'
import { IAttributeDescreptor } from '@/utils/definition/AttributeDescreptor'
import { RenderTypeEnum } from '@/utils/enums'

@Options({
  components: {}
})
export default class AttrsConfig extends Vue {
  componentMetaData: RenderTree | undefined = {} as RenderTree
  RenderTypeEnum = RenderTypeEnum
  mounted() {
    componentTreeHandler.onSelectedComponentChange((item: any) => {
      this.componentMetaData = item
    })
  }
  render() {
    if (this.componentMetaData && this.componentMetaData.type) {
      const componentMetaData = this.componentMetaData
      return h(
        'div',
        {},
        componentMetaData.desc.attrDescs.map((attrDesc: IAttributeDescreptor) => {
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
      case RenderTypeEnum.DROPDOWN: {
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
