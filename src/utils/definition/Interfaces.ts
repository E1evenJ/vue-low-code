import { ActionTypeEnum, ComponentLevelEnum, ComponentTypeEnum, DataTypeEnum, StoreTypeEnum } from '../enums'
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
  props: Prop[]
  data: Data[]
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

export interface Prop {
  name: string
  dataType: DataTypeEnum
}

export interface Data {
  name: string
  dataType: DataTypeEnum
}
