import { reactive } from 'vue'
import { ComponentTree } from './component-tree'
import { IComponentMetadata, ILifecycle, IPageMetadata } from './definition/Interfaces'

class Designer extends Object {
  pageMetadata!: IPageMetadata
  componentMetadatas!: IComponentMetadata[]
  treeHandler!: ComponentTree

  init(metadata: { pageMetadata?: IPageMetadata; componentMetadatas: IComponentMetadata[] }) {
    const { pageMetadata, componentMetadatas } = metadata
    this.pageMetadata = reactive({
      lifecycle: this.initLifeCycle(),
      watches: [],
      methods: [],
      methodGroups: [],
      props: [],
      data: [],
      apis: []
    } as IPageMetadata)
    pageMetadata && Object.assign(this.pageMetadata, pageMetadata)
    this.componentMetadatas = componentMetadatas || []
    this.treeHandler = new ComponentTree(this.componentMetadatas)
  }

  private initLifeCycle(): ILifecycle[] {
    return [
      { name: 'beforeCreate', label: '创建之前(beforeCreate)', actions: [] },
      { name: 'created', label: '创建之后(created)', actions: [] },
      { name: 'beforeMount', label: '挂载之前(beforeMount)', actions: [] },
      { name: 'mounted', label: '挂载之后(mounted)', actions: [] },
      { name: 'beforeUpdate', label: '数据改变之前(beforeUpdate)', actions: [] },
      { name: 'updated', label: '数据改变之后(updated)', actions: [] },
      // { name: 'activated', label: '组件缓存激活时', actions: [] },
      // { name: 'deactivated', label: '组件缓存失活时', actions: [] },
      { name: 'beforeUnmount', label: '卸载之前(beforeUnmount)', actions: [] },
      { name: 'unmounted', label: '卸载之后(unmounted)', actions: [] },
      { name: 'errorCaptured', label: '后代错误捕获(errorCaptured)', actions: [] },
      { name: 'renderTracked', label: 'Vnode渲染时(renderTracked)', actions: [] },
      { name: 'renderTriggered', label: '重新渲染时(renderTriggered)', actions: [] }
    ]
  }

  toString() {
    return JSON.stringify({ pageMetadata: this.pageMetadata, componentMetadatas: this.componentMetadatas })
  }
}
const designer = new Designer()
export default designer
