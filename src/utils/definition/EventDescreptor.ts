export interface IEventDescreptor {
  key: string
  value: string
}

export class ClickE implements IEventDescreptor {
  key = 'click'
  value = '点击事件'
}

export class DoubleClickE implements IEventDescreptor {
  key = 'double-click'
  value = '双击事件'
}

export class FocusE implements IEventDescreptor {
  key = 'focus'
  value = '获得焦点事件'
}

export class BlurE implements IEventDescreptor {
  key = 'blur'
  value = '失去焦点事件'
}

export class InputE implements IEventDescreptor {
  key = 'input'
  value = '输入事件'
}

export class KeydownE implements IEventDescreptor {
  key = 'keydown'
  value = '键盘Keydown事件'
}

export class KeyUpE implements IEventDescreptor {
  key = 'keyup'
  value = '键盘Keyup事件'
}

export class ChangeE implements IEventDescreptor {
  key = 'change'
  value = '值改变事件'
}
