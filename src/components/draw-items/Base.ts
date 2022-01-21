import { componentTreeHandler } from '@/utils/render-tree'
import { Vue } from 'vue-class-component'

function getParentByuuid(el: HTMLElement | null): any {
  if (!el) return el
  if (el.getAttribute('uuid') !== null) return el
  else return getParentByuuid(el.parentElement)
}
function focus(event: Event) {
  event.stopPropagation()
  const selectedItem = document.querySelector('.design-selected')
  selectedItem?.classList.remove('design-selected')
  let elem = event.target as HTMLElement
  let uuid = elem.getAttribute('uuid')
  if (uuid === null) {
    elem = getParentByuuid(elem)
    uuid = elem.getAttribute('uuid')
  }
  elem.classList.add('design-selected')
  componentTreeHandler.setSelectedComponent(elem, uuid)
}

export default class Base extends Vue {
  mounted() {
    const el = this.$el as HTMLElement
    el.addEventListener('click', focus)
    // document.addEventListener('click', removeSelectedClass);
  }
}
