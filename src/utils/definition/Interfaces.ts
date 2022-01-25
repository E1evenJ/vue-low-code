import { ActionTypeEnum, ComponentLevelEnum, ComponentTypeEnum, DataTypeEnum, MethodEnum, StoreTypeEnum } from '../enums'
import { IDescriptor } from './component-descriptor/Descriptor'

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
  returnVal: boolean
  storeReturnVal?: StoreTypeEnum
  params?: any
  methods?: IMethod | IActionGroup
}

export interface IActionGroup {
  name: string
  memo: string
  isGroup: boolean
  actions: IAction[]
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
  desc: IDescriptor
  children: IComponentMetadata[]
}

export interface IPageMetadata {
  lifecycle: ILifecycle[]
  watches: IWatch[]
  methods: IMethod[]
  methodGroups: IActionGroup[]
  props: IProp[]
  data: IData[]
  apis: IApi[]
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
