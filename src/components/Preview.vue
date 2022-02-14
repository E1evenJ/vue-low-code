<script lang="ts">
import { cloneDeep } from '@/utils/common'
import { defineComponent, h } from 'vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    defineComponentConfig: Object
  }
})
export default class Preview extends Vue {
  declare defineComponentConfig: any
  render() {
    const component = defineComponent(cloneDeep(this.defineComponentConfig))
    return h(component)
  }
}
</script>

<style lang="scss" scoped>
.Preview {
}
</style>
