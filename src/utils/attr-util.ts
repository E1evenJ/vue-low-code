import { IAction, IPageMetadata } from '@/core/definition/Interfaces'
import { ActionNameConst, ActionComponentConst } from './const'
import { ActionTypeEnum, StoreTypeEnum } from './enums'

export function dataSelect(pageMetadata: IPageMetadata) {
  const props = pageMetadata.props
  const data = pageMetadata.data
  const requests: any[] = []
  const responses: any[] = []
  pageMetadata.apis.forEach(api => {
    api.request && requests.push({ name: api.request.name, children: api.request.data })
    api.response && responses.push({ name: api.response.name, children: api.response.data })
  })
  const options = []
  props.length > 0 && options.push({ name: 'props', children: props })
  data.length > 0 && options.push({ name: 'data', children: data })
  options.push(...requests)
  options.push(...responses)
  return options
}

export function methodSelect(pageMetadata: IPageMetadata) {
  const methods = pageMetadata.methods.map(method => {
    return { label: `自定义函数: ${method.name}`, value: method.name }
  })
  const groupAction = pageMetadata.methodGroups.map(methodGroup => {
    return { label: `编排函数: ${methodGroup.name}`, value: methodGroup.name }
  })
  const initMethod = { label: `页面初始化函数: init`, value: 'init' }
  return [...methods, ...groupAction, initMethod]
}

export function newAction(name: string): IAction {
  return {
    name,
    label: ActionNameConst[ActionTypeEnum.METHOD].name,
    actionType: ActionTypeEnum.METHOD,
    actionComponent: ActionComponentConst[ActionTypeEnum.METHOD].name,
    value: { hasReturn: false, storeReturnVal: StoreTypeEnum.CONTEXT }
  }
}
