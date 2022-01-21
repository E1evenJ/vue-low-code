<template>
  <div class="home">
    <Header class="header"></Header>
    <div class="oz-disigner">
      <ComponentBar></ComponentBar>
      <Container></Container>
      <Attributes></Attributes>
    </div>
  </div>
</template>

<script lang="ts">
import Attributes from '@/components/Attributes.vue'
import Container from '@/components/Container.vue'
import ComponentBar from '@/components/ComponentBar.vue'
import Header from '@/components/Header.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    ComponentBar,
    Container,
    Attributes,
    Header
  }
})
export default class Home extends Vue {}
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
