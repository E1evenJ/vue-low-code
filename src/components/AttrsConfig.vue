<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { h } from 'vue'
import { RenderTypeEnum } from '@/utils/enums'
import { IAttributeDescreptor, IComponentMetadata } from '@/core/definition/Interfaces'
import designer from '@/core/designer'
import { getComponentDescriptor } from '@/core/definition/DescriptorFactory'
import { camel2Kebab } from '@/utils/common'
import { getAttrRender } from '@/core/render-attr-factory'

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
      const desc = getComponentDescriptor(componentMetaData.type)
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
    const clazzName = attrDesc.constructor.name
    const modelFiledName = camel2Kebab(clazzName)
    const render = getAttrRender(attrDesc.renderType)
    const attrComponent = render && render(attrDesc, attrs, modelFiledName)
    return h('div', { class: 'attr-item' }, [h('span', { class: 'label' }, attrDesc.value), attrComponent])
  }
}
</script>

<style lang="scss" scoped>
.attr-item {
  line-height: 30px;
  text-align: left;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  .label {
    width: 100px;
    font-size: 14px;
  }
  .attr-right {
    width: 214px;
  }
}
</style>
