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
} from './definition/Interfaces'
import { ComponentOptionsWithoutProps, ComponentPropsOptions, defineComponent } from 'vue'
import { ActionTypeEnum, ComponentTypeEnum, DataTypeEnum, DefaultEnum } from '@/utils/enums'
import { randomName } from '@/utils/common'

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
    componentMetadata.forEach((element: IComponentMetadata) => {
      const content = this.generateTemplage(element.children)
      template += this._render(element, content)
    })
    return template
  }

  private _render(element: IComponentMetadata, content: string) {
    console.log(element)
    let template = ''
    switch (element.type) {
      case ComponentTypeEnum.PAGE: {
        template += `<div class="page-${randomName()}">${content}</div>`
        break
      }
      case ComponentTypeEnum.PANEL: {
        template += `<div class="el-row">${content}</div>`
        break
      }
      case ComponentTypeEnum.FORM: {
        template += `<el-form>${content}</el-form>`
        break
      }
      case ComponentTypeEnum.FORM_ITEM: {
        template += `<el-form-item ${element.attrs?.label ? ':label="' + element.attrs?.label + '"' : ''}${
          element?.attrs['label-width'] ? ' :label-width="' + element.attrs['label-width'] + '"' : ''
        } :size="${element.attrs?.size}">${content}</el-form-item>`
        break
      }
      case ComponentTypeEnum.INPUT: {
        console.log(element.attrs)
        template += `<el-input${
          element.attrs['model-field_path'] ? ' v-model="' + element.attrs['model-field_path'].join('.') + '"' : ''
        }${element.attrs.placeholder ? ' placeholder="' + element.attrs.placeholder + '"' : ''}></el-input>`
        break
      }
    }
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
      console.log(api)
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
