import axios from 'axios'
import router from '../router'

// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'https://www.baidu.com'
// } else if (process.env.NODE_ENV == 'debug') {
//   axios.defaults.baseURL = 'https://www.ceshi.com'
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'https://www.production.com'
// }

const tip = (msg: string) => {
  console.log(msg)
  // alert({
  //   message: msg,
  //   duration: 1000,
  //   forbidClick: true
  // })
}

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.value.fullPath
    }
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

const instance = axios.create({ timeout: 1000 * 12 })
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('token')
    token && config.headers && (config.headers.Authorization = token)
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  }
)

export default instance
