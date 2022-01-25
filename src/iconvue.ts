// 导入自己需要的组件
import { Grid, DocumentCopy, Delete, Setting, CirclePlus, Plus, Refresh } from '@element-plus/icons-vue'
import { DefineComponent } from 'vue'
const iconvue = {
  install: function (vue: { component: (name: string, com: any) => void }) {
    vue.component(Grid.name, Grid)
    vue.component(DocumentCopy.name, DocumentCopy)
    vue.component(Delete.name, Delete)
    vue.component(Setting.name, Setting)
    vue.component(CirclePlus.name, CirclePlus)
    vue.component(Plus.name, Plus)
    vue.component(Refresh.name, Refresh)
  }
}
export default iconvue
