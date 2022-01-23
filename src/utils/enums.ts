export enum ComponentTypeEnum {
  PAGE = 'di-page',
  PANEL = 'di-panel',
  FORM = 'di-form',
  INPUT = 'di-input'
}

export enum ComponentLevelEnum {
  COMMON = 'common',
  LAYOUT = 'layout',
  ADVANCE = 'advance',
  CHART = 'chart'
}

export enum ToolType {
  SETTING,
  COPY,
  DELETE
}

export enum ActionTypeEnum {
  API,
  METHOD,
  MODEL_ASSIGN,
  FORM_VALIDATION,
  NOTIFICATION,
  MESSAGE,
  MESSAGE_BOX,
  OPEN_PAGE,
  OPEN_MODAL,
  CLOSE_PAGE_MODAL,
  EXPORT,
  COMPONENT_METHOD,
  WATERMARK,
  REFRESH_TEMPLATE
}

export enum StoreTypeEnum {
  MODEL,
  CONTEXT
}

export enum RenderTypeEnum {
  TEXT,
  INPUT,
  INPUT_I18N,
  DROPDOWN,
  NUMBER,
  SLIDER,
  CHECKBOX,
  BUTTON_GROUP
}

export enum DataTypeEnum {
  String,
  Number,
  Array
}
