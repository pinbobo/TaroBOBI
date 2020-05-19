import { axios } from 'taro-axios'
import { wechatLogin } from '../actions/user'

import { baseURL } from '@/api/url'

const request = axios.create({
  baseURL
})

const store = process.env.store
// 目前只有 微信小程序才会有 store

function getUserState() {
  const store = process.env.store
  return store.getState().user
}

request.interceptors.request.use(async (config) => {
  let token = getUserState().token

  try {
    if (!token) {
      token = await new Promise((resolve) => {
        store.dispatch(wechatLogin(null, (token) => resolve(token)))
      })
    }
    config.headers['token'] = token
    return config
  } catch (err) {
    throw err
  }
})

request.interceptors.response.use(async (response) => {
  try {
    const result = response.data
    if (result.hasOwnProperty('errcode')) {
      const {
        errcode: code,
        errmsg: msg,
        course_id
      } = result
      switch (code) {
        case 0:
          throw msg
        case 403:
          wx.redirectTo({
            url: '/pages/vip/vip?cid=' + course_id,
          })
          throw '无权限'
        case 2:
        case 302:
        case 500:
          if (code === 302) {
            console.warn('token过期')
          } else if (code === 500) {
            console.warn('token无效')
          }
          console.warn('正在重新登录')
          if (code === 2) {
            await openLoginPage()
          } else {
            await new Promise((resolve, reject) => {
              store.dispatch(wechatLogin(null, () => {
                resolve()
              }, () => { throw '登陆失败' }))
            })
          }
          return axios(response.request)
        default:
          throw msg
      }
    }
    return result.data
  } catch (err) {
    throw err
  }
})

const post = request.post
const get = request.get

export {
  post,
  get,
  axios
}

export default request


