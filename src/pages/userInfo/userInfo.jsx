import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'


import { View, Text, Image } from '@tarojs/components'

import './userInfo.sass'

import sourceUserInfoArrowIcon from '../../images/arrow.png'

@connect(({ user }) => ({
  avatar: user.avatar,
  nickName: user.nickName,
  name: user.name,
  sex: user.sex,
  mobile: user.mobile,
  birthday: user.birthday,
  role: user.role,
  isNull: user.isNull,
  userLoading: user.loading
}), (dispatch) => ({
  fetchUserInfoAsync() {
    dispatch(asyncGetInfo())
  }
}))
export default class UserInfo extends Component {

  options = [
    {
      key: 'nickName',
      label: '昵称'
    },
    {
      key: 'name',
      label: '真实姓名'
    },
    {
      key: 'sex',
      label: '性别'
    },
    {
      key: 'birthday',
      label: '生日'
    },
    {
      key: 'mobile',
      label: '手机号'
    },
  ]

  renderAvatar() {
    const { avatar } = this.props
    return (
      <View className="avatar_wrap">
        <Text className="label">头像</Text>
        <Image className="avatar" src={avatar} />
      </View>
    )
  }

  renderInfo() {
    const { options } = this
    return (
      <View className="list">
        {options.map(({key, label}) => {
          return (
            <View className="item" key={key}>
              <Text className="label">{label}</Text>
              <Text className="text">{this.props[key]}</Text>
              <Image className="arrow" src={sourceUserInfoArrowIcon} />
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <View className="user_info">
        {this.renderAvatar()}
        {this.renderInfo()}
      </View>
    )
  }
}