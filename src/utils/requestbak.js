import { wechatLogin } from '../actions/user'

import { baseURL } from '@/api/url'

let Fly

if (process.env.TARO_ENV === 'weapp') {
  Fly = require('./wx.umd.min.js')
} else if (process.env.TARO_ENV === 'h5') {
  Fly = require('./fly.umd.min.js')
}

export const fly = new Fly()

fly.config.baseURL = baseURL
fly.config.headers['Content-Type'] = 'application/json'

const store = process.env.store
// 目前只有 微信小程序才会有 store

function getUserState() {
  const store = process.env.store
  return store.getState().user
}

fly.interceptors.request.use(async (request) => {
  let token = getUserState().token

  try {
    if (!token) {
      fly.lock()
      token = await new Promise((resolve) => {
        store.dispatch(wechatLogin(null, (token) => resolve(token)))
      })
    }
    request.headers['token'] = token
    return request
  } catch (err) {
    throw err
  } finally {
    fly.unlock()
  }
})

fly.interceptors.response.use(async (response) => {
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
          fly.lock()

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
          return fly.request(response.request)
        default:
          fly.unlock()
          throw msg
      }
    }
    return result.data
  } catch (err) {
    fly.unlock()
    throw err
  }
})

const post = fly.post.bind(fly)
const get = fly.get.bind(fly)
const request = ((client) => {
  client.config.baseURL = baseURL
  return client.request.bind(client)
})(new Fly())

export {
  post,
  get,
  request
}

export default fly


