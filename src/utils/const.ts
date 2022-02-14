import { ActionTypeEnum } from '@/utils/enums'

export const ActionComponentConst = {
  [ActionTypeEnum.API]: { name: 'Api' },
  [ActionTypeEnum.METHOD]: { name: 'Method' },
  [ActionTypeEnum.MODEL_ASSIGN]: { name: 'ModelAssign' },
  [ActionTypeEnum.FORM_VALIDATION]: { name: 'FormValidation' },
  [ActionTypeEnum.NOTIFICATION]: { name: 'Notification' },
  [ActionTypeEnum.MESSAGE]: { name: 'Message' },
  [ActionTypeEnum.MESSAGE_BOX]: { name: 'MessageBox' },
  [ActionTypeEnum.OPEN_PAGE]: { name: 'OpenPage' },
  [ActionTypeEnum.OPEN_MODAL]: { name: 'OpenModal' },
  [ActionTypeEnum.CLOSE_PAGE_MODAL]: { name: 'ClosePageModal' },
  [ActionTypeEnum.EXPORT]: { name: 'Export' },
  [ActionTypeEnum.COMPONENT_METHOD]: { name: 'CoponentMethod' },
  [ActionTypeEnum.WATERMARK]: { name: 'WaterMark' },
  [ActionTypeEnum.REFRESH_TEMPLATE]: { name: 'RefreshTemplate' }
}

export const ActionNameConst = {
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
  { key: ActionTypeEnum.API, value: ActionNameConst[ActionTypeEnum.API].name },
  { key: ActionTypeEnum.METHOD, value: ActionNameConst[ActionTypeEnum.METHOD].name },
  { key: ActionTypeEnum.MODEL_ASSIGN, value: ActionNameConst[ActionTypeEnum.MODEL_ASSIGN].name },
  { key: ActionTypeEnum.FORM_VALIDATION, value: ActionNameConst[ActionTypeEnum.FORM_VALIDATION].name },
  { key: ActionTypeEnum.NOTIFICATION, value: ActionNameConst[ActionTypeEnum.NOTIFICATION].name },
  { key: ActionTypeEnum.MESSAGE, value: ActionNameConst[ActionTypeEnum.MESSAGE].name },
  { key: ActionTypeEnum.MESSAGE_BOX, value: ActionNameConst[ActionTypeEnum.MESSAGE_BOX].name },
  { key: ActionTypeEnum.OPEN_PAGE, value: ActionNameConst[ActionTypeEnum.OPEN_PAGE].name },
  { key: ActionTypeEnum.OPEN_MODAL, value: ActionNameConst[ActionTypeEnum.OPEN_MODAL].name },
  { key: ActionTypeEnum.CLOSE_PAGE_MODAL, value: ActionNameConst[ActionTypeEnum.CLOSE_PAGE_MODAL].name },
  { key: ActionTypeEnum.EXPORT, value: ActionNameConst[ActionTypeEnum.EXPORT].name },
  { key: ActionTypeEnum.COMPONENT_METHOD, value: ActionNameConst[ActionTypeEnum.COMPONENT_METHOD].name },
  { key: ActionTypeEnum.WATERMARK, value: ActionNameConst[ActionTypeEnum.WATERMARK].name },
  { key: ActionTypeEnum.REFRESH_TEMPLATE, value: ActionNameConst[ActionTypeEnum.REFRESH_TEMPLATE].name }
]
