<template>
  <div class="home">
    <Header class="header"></Header>
    <div class="oz-disigner" v-loading="loading">
      <ComponentBar v-if="!loading"></ComponentBar>
      <Container v-if="!loading" :items="items"></Container>
      <Attributes v-if="!loading"></Attributes>
    </div>
  </div>
</template>

<script lang="ts">
import Attributes from '@/components/Attributes.vue'
import Container from '@/components/Container.vue'
import ComponentBar from '@/components/ComponentBar.vue'
import Header from '@/components/Header.vue'
import { Options, Vue } from 'vue-class-component'
import designer from '@/core/designer'
import { ComponentLevelEnum, ComponentTypeEnum } from '@/utils/enums'
import { IComponentMetadata } from '@/core/definition/Interfaces'
import { reactive } from 'vue-demi'
import { getDefaultAttrs } from '@/core/definition/DescriptorFactory'

@Options({
  components: {
    ComponentBar,
    Container,
    Attributes,
    Header
  }
})
export default class Home extends Vue {
  loading = true
  items!: IComponentMetadata[]
  mounted() {
    const designerStr = localStorage.getItem('designer')
    if (designerStr) {
      const designerObj = JSON.parse(designerStr) as any
      if (designerObj) {
        designer.init(reactive(designerObj as any))
        this.items = reactive(designerObj.componentMetadatas[0].children)
      }
    } else {
      const metadata = reactive({
        uuid: 'page',
        type: ComponentTypeEnum.PAGE,
        attrs: getDefaultAttrs(ComponentTypeEnum.PAGE),
        level: ComponentLevelEnum.LAYOUT,
        children: [],
        events: []
      })
      designer.init({ componentMetadatas: [metadata] })
      this.items = metadata.children
    }
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .header {
    height: 30px;
  }
  .oz-disigner {
    display: flex;
    background: #ebeef5;
    padding: 10px;
    width: calc(100% - 20px);
    height: calc(100% - 40px);
  }
}
</style>
