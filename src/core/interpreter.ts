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
import { getInvokeMethods, invokeAction2Str, invokeMethod } from '@/utils/component-util'

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
      template += compDesc.getHtml(meta, content)
    })
    return template
  }

  generateLifecycle(lifecycle: ILifecycle[]) {
    let lifecycleStr = ''
    for (const lc of lifecycle) {
      lifecycleStr += `  ${lc.name}() {${this._invokeActions2Str(lc.actions)}},`
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
      str += invokeMethod(methods, methodGroups, methodGroup.name)
    }
    str += this.generateInvokeMethods(this.componentMetadata, this.pageMetadata)
    return ` methods: {${str}}`
  }

  generateInvokeMethods(componentMetadata: IComponentMetadata[], pageMetadata: IPageMetadata) {
    let str = ''
    componentMetadata.forEach(compMeta => {
      if (compMeta.children && compMeta.children.length > 0) {
        str += this.generateInvokeMethods(compMeta.children, pageMetadata)
      }
      str += getInvokeMethods(compMeta, pageMetadata)
    })
    return str
  }

  generateComponent() {
    return `components: {}`
  }

  generateScript() {
    return `{  ${this.generateComponent()},  ${this.generateData(
      this.pageMetadata.data,
      this.pageMetadata.apis
    )},  ${this.generateWatched(this.pageMetadata.watches)},${this.generateLifecycle(
      this.pageMetadata.lifecycle
    )} ${this.generateMethods(this.pageMetadata.methods, this.pageMetadata.methodGroups)}}`
  }

  private _invokeActions2Str(actions: IAction[]) {
    let str = ''
    for (const action of actions) {
      str += invokeAction2Str(action, this.pageMetadata)
    }
    return str
  }
}
