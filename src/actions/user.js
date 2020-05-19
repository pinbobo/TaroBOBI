import {
  UPDATE,
  LOGIN,
  LOGING
} from '../constants/user'
import Taro from '@tarojs/taro'
import { mergeRequest } from '@/utils/util'
import { baseURL, userInfo, login as loginUrl } from '@/api/url'
import { post, axios } from '@/utils/request'


export const update = (payload) => {
  return {
    type: UPDATE,
    ...payload
  }
}
export const login = (token) => {
  return {
    type: LOGIN,
    token
  }
}

export const loging = () => {
  return {
    type: LOGING,
    loging: true
  }
}

// 异步的action
export function asyncGetInfo () {
  return (dispatch) => {
    dispatch(loging())
    post(userInfo)
      .then(response => {
        response.avatar = response.profile
        response.nickName = response.nickname
        dispatch(update(response))
      })
  }
}

export function wechatLogin(data = {}, callback = () => {}, fail = () => {}) {
  return (dispatch) => {
    _wechatLogin(data)
      .then(code => {
        dispatch(login(code))
        callback(code)
      })
      .catch(err => {
        fail(err)
      })
  }
}

const _wechatLogin = mergeRequest(async (data) => {
  Taro.showLoading({
    title: '登录中',
  })
  try {
    const { code } = await Taro.login()
    const { data: loginResponse } = await axios({
      method: 'POST',
      baseURL,
      url: loginUrl,
      data: {
        code,
        ...data
      }
    })
    if (loginResponse.hasOwnProperty('errcode')) {
      throw loginResponse.errcode
    }
    const {
      token
    } = loginResponse.data
    return token
  } catch(err) {
    throw err
  } finally {
    Taro.hideLoading()
  }
})