import {
  ActionTypeEnum,
  ComponentLevelEnum,
  ComponentTypeEnum,
  DataTypeEnum,
  DefaultEnum,
  MethodEnum,
  RenderTypeEnum,
  StoreTypeEnum,
  ToolType
} from '@/utils/enums'
import { ComponentOptionsWithObjectProps, VNode } from 'vue'

export interface IEvent {
  name: string
  label: string
  children?: IAction[]
  isRoot: boolean
}

export interface IAction {
  name: string
  label: string
  actionType: ActionTypeEnum
  condition?: string
  params?: any
  actionComponent: string
  value: IActionMethod | IActionApi
}

export interface IActionMethod {
  method?: string
  hasReturn?: boolean
  storeReturnVal?: StoreTypeEnum
  returnVal?: any
}

export interface IActionApi {
  api?: string
  value_path?: any[]
  paramProcess?: string
  failCallback?: string
}

export interface IMethodGroup {
  name: string
  memo: string
  isGroup: boolean
  methods: IMethod[]
}

export interface IMethod {
  name: string
  code: string
  isSync: boolean
}

export interface IComponentMetadata {
  uuid: string
  name?: string
  type: ComponentTypeEnum
  level: ComponentLevelEnum
  icon?: string
  attrs: {
    [index: string]: any
  }
  events?: IEvent[]
  children: IComponentMetadata[]
}

export interface IPageMetadata {
  lifecycle: ILifecycle[]
  watches: IWatch[]
  methods: IMethod[]
  methodGroups: IMethodGroup[]
  props: IProp[]
  data: IData[]
  apis: IApi[]
  css: string
}

export interface ILifecycle {
  name: string
  label: string
  actions: IAction[]
}

export interface IWatch {
  name: string
  label: string
  actions: IAction[]
}

export interface IProp {
  id: string
  name: string
  dataType: DataTypeEnum
  children?: IProp[]
  memo?: string
  isNew?: boolean
}

export interface IData {
  id: string
  name: string
  dataType: DataTypeEnum
  children?: IData[]
  memo?: string
  isNew?: boolean
  defaultType?: DefaultEnum
  default?: string
}

export interface IApi {
  id: string
  url: string
  memo: string
  method: MethodEnum
  request?: IApiTransformData
  response?: IApiTransformData
}

export interface IApiTransformData {
  name: string
  data: IApiData[]
}

export interface IApiData {
  id: string
  name: string
  memo: string
  dataType: DataTypeEnum
  children?: IApiData[]
  isNew?: boolean
}

export interface IServiceCategory {
  memo: string
  children: IService[]
}

export interface IService {
  memo: string
  children: IApi[]
}

export interface IAttributeDescreptor {
  value: string
  desc?: string
  renderType: RenderTypeEnum
  default: any
  renderValue?: { [x: string]: any }
  [key: string]: any
}

export interface IEventDescreptor {
  key: string
  value: string
}

export interface ISelect {
  label: string
  value: string
}

export interface IComponentDescriptor {
  get menu(): IMenu
  get attrDescs(): IAttributeDescreptor[]
  get eventDescs(): IEventDescreptor[]
  get tools(): ToolType[]
  defaultAttrs?: { [key: string]: any }
  // designerRender({ $slots }: { $slots: any }): ComponentOptionsWithObjectProps
  getHtml(meta: IComponentMetadata, content?: string): string
}

export interface IMenu {
  uuid: string
  label: string
  type: ComponentTypeEnum
  level: ComponentLevelEnum
  icon: string
  enable?: boolean
  draggable?: string[]
  droppable?: string[]
}
