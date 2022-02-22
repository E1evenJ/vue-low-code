export function kebab2Camel(value: string) {
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

/**
 *
 * @param obj
 * @returns
 */
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

/**
 * 驼峰命名转烤串
 * @param camelStr - 驼峰字符串
 * @return {string} - 烤串类型的字符串
 * @example ModifyJDRelatedOrderID -> modify-jd-related-order-id
 */
export function camel2Kebab(camelStr = ''): string {
  // 判断是否是 大驼峰
  const isUpper = camelStr[0].charCodeAt(0) >= 65 && camelStr[0].charCodeAt(0) <= 90
  const handleStr = camelStr.replace(/([A-Z])/g, '-$1').toLowerCase()
  let kebabStr = handleStr
  if (isUpper) {
    kebabStr = handleStr.slice(1)
  }
  // 处理连续大写的情况
  const newKebabArr: any[] = []
  const kebabSplitArr = kebabStr.split('-')
  kebabSplitArr.forEach((item, index) => {
    if (item.length > 1) {
      newKebabArr.push(item)
    } else {
      let combineStr = ''
      const subKebabArr = kebabSplitArr.slice(index)
      for (let i = 0; i < subKebabArr.length; i++) {
        if (subKebabArr[i].length > 1) break
        combineStr += subKebabArr[i]
      }
      newKebabArr.push(combineStr)
      kebabSplitArr.splice(index + 1, combineStr.length - 1)
    }
  })
  return newKebabArr.join('-')
}

export function bindModel(attrs: any, key: string) {
  return {
    modelValue: attrs[key],
    'onUpdate:modelValue': (value: any) => {
      attrs[key] = value
    }
  }
}
