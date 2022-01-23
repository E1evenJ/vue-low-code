// 导入自己需要的组件
import {
  ElButton,
  ElSelectV2,
  ElInput,
  ElTree,
  ElDialog,
  ElRow,
  ElCol,
  ElIcon,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElSlider,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElButtonGroup,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElScrollbar,
  ElLoading,
  ElTable,
  ElTableColumn,
  ElCollapse,
  ElCollapseItem
} from 'element-plus'
import 'element-plus/es/components/base/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/tree/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/col/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tab-pane/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/slider/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/checkbox/style/css'
import 'element-plus/es/components/button-group/style/css'
import 'element-plus/es/components/radio-group/style/css'
import 'element-plus/es/components/radio-button/style/css'
import 'element-plus/es/components/scrollbar/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/table/style/css'
import 'element-plus/es/components/table-column/style/css'
import 'element-plus/es/components/collapse/style/css'
import 'element-plus/es/components/collapse-item/style/css'

const element = {
  install: function (vue: { use: (item: any) => void }): void {
    vue.use(ElButton)
    vue.use(ElSelectV2)
    vue.use(ElInput)
    vue.use(ElTree)
    vue.use(ElDialog)
    vue.use(ElDialog)
    vue.use(ElRow)
    vue.use(ElCol)
    vue.use(ElIcon)
    vue.use(ElTabs)
    vue.use(ElTabPane)
    vue.use(ElForm)
    vue.use(ElFormItem)
    vue.use(ElSlider)
    vue.use(ElSelect)
    vue.use(ElOption)
    vue.use(ElCheckbox)
    vue.use(ElButtonGroup)
    vue.use(ElRadio)
    vue.use(ElRadioGroup)
    vue.use(ElRadioButton)
    vue.use(ElScrollbar)
    vue.use(ElLoading)
    vue.use(ElTable)
    vue.use(ElTableColumn)
    vue.use(ElCollapse)
    vue.use(ElCollapseItem)
  }
}
export default element
