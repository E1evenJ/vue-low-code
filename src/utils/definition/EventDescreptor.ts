export interface EventDescreptor {
  key: string
  value: string
}

export class ClickE implements EventDescreptor {
  key = 'click'
  value = '点击事件'
}

export class DoubleClickE implements EventDescreptor {
  key = 'double-click'
  value = '双击事件'
}

export class FocusE implements EventDescreptor {
  key = 'focus'
  value = '获得焦点事件'
}

export class BlurE implements EventDescreptor {
  key = 'blur'
  value = '失去焦点事件'
}

export class InputE implements EventDescreptor {
  key = 'input'
  value = '输入事件'
}

export class KeydownE implements EventDescreptor {
  key = 'keydown'
  value = '键盘Keydown事件'
}

export class KeyUpE implements EventDescreptor {
  key = 'keyup'
  value = '键盘Keyup事件'
}

export class ChangeE implements EventDescreptor {
  key = 'change'
  value = '值改变事件'
}
