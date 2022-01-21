import { ActionTypeEnum } from './enums'

export const ActionName = {
  [ActionTypeEnum.API]: { name: '调用服务' },
  [ActionTypeEnum.METHOD]: { name: '调用函数' },
  [ActionTypeEnum.MODEL_ASSIGN]: { name: '模型赋值' },
  [ActionTypeEnum.FORM_VALIDATION]: { name: '表单验证' },
  [ActionTypeEnum.NOTIFICATION]: { name: '消息推送' },
  [ActionTypeEnum.MESSAGE]: { name: '提示消息' },
  [ActionTypeEnum.MESSAGE_BOX]: { name: '操作确认' },
  [ActionTypeEnum.OPEN_PAGE]: { name: '打开页面' },
  [ActionTypeEnum.OPEN_MODAL]: { name: '打开弹窗' },
  [ActionTypeEnum.CLOSE_PAGE_MODAL]: { name: '关闭页面' },
  [ActionTypeEnum.EXPORT]: { name: '数据导出' },
  [ActionTypeEnum.COMPONENT_METHOD]: { name: '组件方法' },
  [ActionTypeEnum.WATERMARK]: { name: '添加水印' },
  [ActionTypeEnum.REFRESH_TEMPLATE]: { name: '刷新模板' }
}

export const ActionTypeConst = [
  { key: ActionTypeEnum.API, value: ActionName[ActionTypeEnum.API].name },
  { key: ActionTypeEnum.METHOD, value: ActionName[ActionTypeEnum.METHOD].name },
  { key: ActionTypeEnum.MODEL_ASSIGN, value: ActionName[ActionTypeEnum.MODEL_ASSIGN].name },
  { key: ActionTypeEnum.FORM_VALIDATION, value: ActionName[ActionTypeEnum.FORM_VALIDATION].name },
  { key: ActionTypeEnum.NOTIFICATION, value: ActionName[ActionTypeEnum.NOTIFICATION].name },
  { key: ActionTypeEnum.MESSAGE, value: ActionName[ActionTypeEnum.MESSAGE].name },
  { key: ActionTypeEnum.MESSAGE_BOX, value: ActionName[ActionTypeEnum.MESSAGE_BOX].name },
  { key: ActionTypeEnum.OPEN_PAGE, value: ActionName[ActionTypeEnum.OPEN_PAGE].name },
  { key: ActionTypeEnum.OPEN_MODAL, value: ActionName[ActionTypeEnum.OPEN_MODAL].name },
  { key: ActionTypeEnum.CLOSE_PAGE_MODAL, value: ActionName[ActionTypeEnum.CLOSE_PAGE_MODAL].name },
  { key: ActionTypeEnum.EXPORT, value: ActionName[ActionTypeEnum.EXPORT].name },
  { key: ActionTypeEnum.COMPONENT_METHOD, value: ActionName[ActionTypeEnum.COMPONENT_METHOD].name },
  { key: ActionTypeEnum.WATERMARK, value: ActionName[ActionTypeEnum.WATERMARK].name },
  { key: ActionTypeEnum.REFRESH_TEMPLATE, value: ActionName[ActionTypeEnum.REFRESH_TEMPLATE].name }
]
