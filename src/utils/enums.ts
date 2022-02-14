export enum ComponentTypeEnum {
  PAGE = 'di-page',
  PANEL = 'di-panel',
  FORM = 'di-form',
  INPUT = 'di-input',
  FORM_ITEM = 'di-form-item'
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
  DELETE,
  PLUS
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
  SELECT,
  NUMBER,
  SLIDER,
  CHECKBOX,
  BUTTON_GROUP,
  CASCADER_MODEL_FIELD,
  CASCADER_MODEL,
  RULES
}

export enum DataTypeEnum {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT'
}

export enum MethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  REMOVE = 'REMOVE'
}

export enum DefaultEnum {
  STATIC,
  INITPROP
}
