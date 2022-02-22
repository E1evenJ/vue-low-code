import {
  IAction,
  IActionApi,
  IActionMethod,
  IApi,
  IComponentMetadata,
  IEvent,
  IMethod,
  IMethodGroup,
  IPageMetadata
} from '@/core/Interfaces'
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

export function attr2AttrStr(key: string, value: string) {
  return value ? ` ${key}="${value}"` : ''
}

export function eventsToHtml(uuid: string, events: IEvent[] | undefined) {
  let str = ''
  if (events) {
    for (const event of events) {
      str += ` @${event.name}="${uuid}_${event.name}"`
    }
  }
  return str
}

export function invokeAction2Str(action: IAction, pageMetadata: IPageMetadata) {
  let str = ''
  if (action.condition) {
    str += `if(${action.condition}){${invokeActionByType(action, pageMetadata)}}`
  } else {
    str += `${invokeActionByType(action, pageMetadata)}`
  }
  return str
}

export function invokeActionByType(action: IAction, pageMetadata: IPageMetadata) {
  switch (action.actionType) {
    case ActionTypeEnum.METHOD: {
      return invokeMethod(pageMetadata.methods, pageMetadata.methodGroups, (action.value as IActionMethod).method)
    }
    case ActionTypeEnum.API: {
      return invokeApi(pageMetadata.apis, (action.value as IActionApi).api, action)
    }
  }
}

export function invokeMethod(methods: IMethod[], methodGroups: IMethodGroup[], methodName: string | undefined) {
  const method = methods.find(item => item.name === methodName)
  let str = ''
  if (method) {
    str += `${method.isSync ? 'await ' : ''}this.${method.name}()`
  } else {
    const methodGroup = methodGroups.find(item => item.name === methodName)
    if (methodGroup) {
      const isSync = methodGroup.methods.find(item => item.isSync)
      let str = `${isSync ? 'await ' : ''}${methodGroup.name}(){`
      for (const method of methodGroup.methods) {
        str += `${method.isSync ? 'await ' : ''}this.${method.name}();`
      }
      str += '}'
    }
  }
  return str
}

export function invokeApi(apis: IApi[], apiId: string | undefined, action: IAction) {
  let str = ''
  const api = apis.find(item => item.id === apiId)
  if (api) {
    switch (api?.method) {
      case 'GET': {
        str += `this.axios.get('${api.url}', {params: this.${api.request?.name}}).then(data => {this.${(
          action.value as IActionApi
        ).value_path?.join('.')} = data})`
        break
      }
      case 'POST': {
        str += `this.axios.post(${api.url}, ${api.request?.name})`
        break
      }
    }
  }
  return str
}

export function getInvokeMethods(meta: IComponentMetadata, pageMetadata: IPageMetadata): string {
  let str = ''
  if (meta.events) {
    for (const event of meta.events) {
      str += `,${meta.uuid}_${event.name}() {${invokeActions2Str(event.children, pageMetadata)}}`
    }
  }
  return str
}

export function invokeActions2Str(actions: IAction[] | undefined, pageMetadata: IPageMetadata) {
  let str = ''
  if (actions) {
    for (const action of actions) {
      str += invokeAction2Str(action, pageMetadata)
    }
  }
  return str
}
