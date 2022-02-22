import {
  IAction,
  IActionApi,
  IActionMethod,
  IApi,
  IComponentMetadata,
  IData,
  ILifecycle,
  IMethod,
  IMethodGroup,
  IPageMetadata,
  IProp,
  IWatch
} from './Interfaces'
import { ComponentOptionsWithoutProps, ComponentPropsOptions } from 'vue'
import { ActionTypeEnum, DataTypeEnum, DefaultEnum } from '@/utils/enums'
import { getComponentDescriptor } from './definition/ComponentDescriptorFactory'

export class Interpreter {
  pageMetadata: IPageMetadata
  componentMetadata: IComponentMetadata[]
  constructor(pageMetadata: IPageMetadata, componentMetadata: IComponentMetadata[]) {
    this.pageMetadata = pageMetadata
    this.componentMetadata = componentMetadata
  }

  generateDefineComponent(script: string): ComponentOptionsWithoutProps {
    return {
      name: 'DesignerPreview',
      template: this.generateTemplage(this.componentMetadata),
      ...this.optionStr2DefineComponent(script)
    }
  }

  optionStr2DefineComponent(option: string): ComponentPropsOptions {
    return eval(`(${option})`) as ComponentPropsOptions
  }

  generateProps(props: IProp[]) {
    const propsObj: any = {}
    props.forEach((item: IProp) => {
      const dataType = item.dataType.toLowerCase()
      propsObj[item.name] = this._getType(dataType)
    })
    return { props: propsObj }
  }

  private _getType(type: string) {
    switch (type.toUpperCase()) {
      case DataTypeEnum.STRING:
        return String
      case DataTypeEnum.OBJECT:
        return Object
      case DataTypeEnum.NUMBER:
        return Number
      case DataTypeEnum.ARRAY:
        return Array
    }
  }

  generateData(dataObj: IData[], apis: IApi[]) {
    let pageData = ''
    dataObj.forEach((item: IData) => {
      if (item.defaultType === DefaultEnum.STATIC) {
        pageData += `${item.name}: ${JSON.stringify(
          item.dataType === DataTypeEnum.OBJECT ? item.default || {} : item.default
        )},`
      } else if (item.defaultType === DefaultEnum.INITPROP) {
        pageData += `${item.name}: ${item.default || {}},`
      }
    })
    apis.forEach((api: IApi) => {
      api.request && (pageData += `${api.request?.name}: {},`)
      api.response && (pageData += `${api.response?.name}: {},`)
    })
    return `data() { return {${pageData}} }`
  }

  generateTemplage(componentMetadata: IComponentMetadata[]) {
    let template = ''
    componentMetadata.forEach((meta: IComponentMetadata) => {
      const content = this.generateTemplage(meta.children)
      const compDesc = getComponentDescriptor(meta.type)
      console.log(compDesc.getHtml(meta, content))
      template += compDesc.getHtml(meta, content)
    })
    return template
  }

  generateLifecycle(lifecycle: ILifecycle[]) {
    let lifecycleStr = ''
    for (const lc of lifecycle) {
      lifecycleStr += `\n  ${lc.name}() {${this._invokeActions2Str(lc.actions)}},`
    }
    return lifecycleStr
  }

  generateWatched(watches: IWatch[]) {
    return `watch: {}`
  }

  generateMethods(methods: IMethod[], methodGroups: IMethodGroup[]) {
    let str = ''
    for (const method of methods) {
      str += method.code.replace('export function ', '').replace('export async function ', '')
    }
    for (const methodGroup of methodGroups) {
      str += this._invokeMethod(methodGroup.name)
    }
    return ` methods: {\n${str}\n}`
  }

  generateComponent() {
    return `components: {}`
  }

  generateScript() {
    return `{\n  ${this.generateComponent()},\n  ${this.generateData(
      this.pageMetadata.data,
      this.pageMetadata.apis
    )},\n  ${this.generateWatched(this.pageMetadata.watches)},${this.generateLifecycle(
      this.pageMetadata.lifecycle
    )}\n ${this.generateMethods(this.pageMetadata.methods, this.pageMetadata.methodGroups)}\n}`
  }

  private _invokeActions2Str(actions: IAction[]) {
    let str = ''
    for (const action of actions) {
      str += this._invokeAction2Str(action)
    }
    return str
  }

  private _invokeAction2Str(action: IAction) {
    let str = ''
    if (action.condition) {
      str += `if(${action.condition}){${this._invokeActionByType(action)}}`
    } else {
      str += `${this._invokeActionByType(action)}`
    }
    return str
  }

  private _invokeActionByType(action: IAction) {
    switch (action.actionType) {
      case ActionTypeEnum.METHOD: {
        return this._invokeMethod((action.value as IActionMethod).method)
      }
      case ActionTypeEnum.API: {
        return this._invokeApi((action.value as IActionApi).api, action)
      }
    }
  }

  private _invokeMethod(methodName: string | undefined) {
    const method = this.pageMetadata.methods.find(item => item.name === methodName)
    let str = ''
    if (method) {
      str += `${method.isSync ? 'await ' : ''}this.${method.name}()`
    } else {
      const methodGroup = this.pageMetadata.methodGroups.find(item => item.name === methodName)
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

  private _invokeApi(apiId: string | undefined, action: IAction) {
    let str = ''
    const api = this.pageMetadata.apis.find(item => item.id === apiId)
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
}
