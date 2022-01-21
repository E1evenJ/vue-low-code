// 导入自己需要的组件
import { Grid, DocumentCopy, Delete, Setting, CirclePlus } from '@element-plus/icons-vue'
const iconvue = {
  install: function (vue: any) {
    vue.component(Grid.name, Grid)
    vue.component(DocumentCopy.name, DocumentCopy)
    vue.component(Delete.name, Delete)
    vue.component(Setting.name, Setting)
    vue.component(CirclePlus.name, CirclePlus)
  }
}
export default iconvue
