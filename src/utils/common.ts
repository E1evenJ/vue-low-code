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
