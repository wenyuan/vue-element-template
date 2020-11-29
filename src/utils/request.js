import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const axiosService = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // final url = base url(here) + request url(each api)
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
axiosService.interceptors.request.use(
  config => {
    // do something before request is sent
    // for example: processing of request params, set token in headers, etc.
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axiosService.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code in yours backend apis
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 1, it is judged as an error.
    if (res.code !== 1) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 401: Not logged in
      if (res.code === 401) {
        // to re-login
        MessageBox.confirm('您已经登出，您可以点击取消停留在此页面，或重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    // judge the HTTP Status Code in error case, then prompt to the user
    let text = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          text = '请求错误(400)，请重新申请'
          break
        case 401:
          text = '未授权(401)，请重新登录'
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
          break
        case 403:
          text = '拒绝访问(403)'
          break
        case 404:
          text = '请求出错(404)'
          break
        case 408:
          text = '请求超时(408)'
          break
        case 500:
          text = '服务器错误(500)，请重启软件或切换功能页！'
          break
        case 501:
          text = '服务未实现(501)'
          break
        case 502:
          text = '网络错误(502)'
          break
        case 503:
          text = '服务不可用(503)'
          break
        case 504:
          text = '网络超时(504)'
          break
        case 505:
          text = 'HTTP版本不受支持(505)'
          break
        default:
          text = '网络连接出错(${error.response.status})'
      }
    } else {
      text = '连接服务器失败，请退出重试！'
    }
    Message({
      message: text,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default axiosService
