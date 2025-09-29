import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: {
    platform: 'H5'
  }
})

instance.interceptors.request.use(function (config) {
  // 开启loading禁止点击
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })

  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  const res = response
  if (res.data.status !== 200) {
    Toast(res.data.message)
    return Promise.reject(res.data.message)
  } else {
    Toast.clear()
  }
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
