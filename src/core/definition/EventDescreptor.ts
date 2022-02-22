import { IEventDescreptor } from '../Interfaces'

export class ClickE implements IEventDescreptor {
  key = 'click'
  value = '点击事件(click)'
}

export class DoubleClickE implements IEventDescreptor {
  key = 'double-click'
  value = '双击事件(double-click)'
}

export class FocusE implements IEventDescreptor {
  key = 'focus'
  value = '获得焦点事件(focus)'
}

export class BlurE implements IEventDescreptor {
  key = 'blur'
  value = '失去焦点事件(blur)'
}

export class InputE implements IEventDescreptor {
  key = 'input'
  value = '输入事件(input)'
}

export class KeydownE implements IEventDescreptor {
  key = 'keydown'
  value = '键盘按下事件(keydown)'
}

export class KeyUpE implements IEventDescreptor {
  key = 'keyup'
  value = '键盘弹起事件(keyup)'
}

export class ChangeE implements IEventDescreptor {
  key = 'change'
  value = '值改变事件(change)'
}

export class ValidateE implements IEventDescreptor {
  key = 'validate'
  value = '任一表单项被校验后触发'
}
