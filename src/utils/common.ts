export function transformCamelCases(value: string) {
  if (value && value.length > 1) {
    const reg = /-(\w)/g
    value = value.replace(reg, ($0: string, $1: string) => {
      return $1.toUpperCase()
    })
  }
  return value[0].toUpperCase() + value.substring(1)
}

export function randomName(len = 6) {
  const chars = 'abcdefhijkmnprstwxyzABCDEFGHJKMNPQRSTWXYZ2345678'
  const maxPos = chars.length
  let code = ''
  for (let i = 0; i < len; i++) {
    code += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return code
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function cloneDeep(obj: any) {
  // 创建一个新对象
  const result: { [index: string]: any } = {}
  let temp = null
  let key = null
  const keys = Object.keys(obj)
  keys.map(item => {
    key = item
    temp = obj[key]
    // 如果字段的值也是一个对象则递归操作
    if (temp && typeof temp === 'object') {
      result[key] = cloneDeep(temp)
    } else {
      result[key] = temp
    }
  })
  return result
}
