import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import LoginButtonWrap from '@/components/LoginButtonWrap/LoginButtonWrap'

import { post } from '@/utils/request'
import { userMobileUpdate } from '@/api/url'

import { asyncGetInfo } from '../../actions/user'

import './my.sass'

import sourceNavArrow from '../../images/arrow.png'
import sourceNavIconOne from '../../images/icon_information.png'
import sourceNavIconTwo from '../../images/icon_books.png'
import sourceNavIconThree from '../../images/invite.png'
import sourceNavIconFour from '../../images/vip.png'
import sourceNavIconFives from '../../images/commission.png'
import sourceNavIconSix from '../../images/customer.png'

import sourceUserDefaultAvatar from '../../images/icon_default_avatar.png'
import sourceUserInfoBg from '../../images/BOBI.png'
import sourceUserLevelOne from '../../images/general_user.png'
import sourceUserLevelTwo from '../../images/vip_member.png'
import sourceUserLevelThree from '../../images/king.png'
import sourceUserLevelFour from '../../images/director.png'


@connect(({ user }) => ({
  avatar: user.avatar,
  nickName: user.nickName,
  role: user.role,
  roleLabel: user.roleLabel,
  isNull: user.isNull,
  userLoading: user.loading
}), (dispatch) => ({
  fetchUserInfoAsync() {
    dispatch(asyncGetInfo())
  }
}))
export default class My extends Component {

  roleData = [
    {
      icon: sourceUserLevelOne,
      className: 'level_one'
    },
    {
      icon: sourceUserLevelTwo,
      className: 'level_two'
    },
    {
      icon: sourceUserLevelThree,
      className: 'level_three'
    },
    {
      icon: sourceUserLevelFour,
      className: 'level_four'
    },
    {
      icon: sourceUserLevelFour,
      className: 'level_four'
    }
  ]

  nav = [
    {
      icon: sourceNavIconOne,
      text: '个人信息',
      path: '/pages/userInfo/userInfo'
    },
    {
      icon: sourceNavIconTwo,
      text: '我的课程',
      path: '/pages/myCourse/myCourse'
    },
    {
      icon: sourceNavIconThree,
      text: '邀请有理',
      path: '/pages/demand/demand'
    },
    {
      icon: sourceNavIconFour,
      text: '我的会员',
      path: '/pages/demand/demand'
    },
    {
      icon: sourceNavIconFives,
      text: '我的佣金',
      path: '/pages/demand/demand'
    },
    {
      icon: sourceNavIconSix,
      text: '客服',
      path: '/pages/demand/demand'
    }
  ]

  state = {
    statusBarHeight: 20,
    login: false
  }

  handleNavClick(index) {
    Taro.navigateTo({ url: this.nav[index].path })
  }

  handlePhoneNumber(data) {
    const { detail: { iv, encryptedData } } = data
    post(userMobileUpdate, {
      iv,
      encryptedData
    }).then(result => {
      console.log(result)
    }).catch(err => {
      console.warn(err)
    })
    console.log(data)
  }

  componentDidMount() {
    this.fixStatusBar()
  }

  async fixStatusBar() {
    try {
      const { statusBarHeight } = await Taro.getSystemInfo()
      this.setState({
        statusBarHeight
      })
    } catch(err) {
      console.warn('获取系统信息失败')
    }
  }

  async fixStatusColor() {
    if (this.props.role > 0) {
      Taro.setNavigationBarColor({ frontColor: '#ffffff', backgroundColor: '#343434' })
    } else {
      Taro.setNavigationBarColor({ frontColor: '#000000', backgroundColor: 'transparent' })
    }
  }

  componentDidShow() {
    this.props.fetchUserInfoAsync()
  }


  toggleLoginState = () => {
    this.setState({
      login: !this.state.login
    })
  }

  renderUserInfo() {
    const { avatar, nickName, role, isNull, userLoading, roleLabel } = this.props
    const { roleData } = this
    const { statusBarHeight } = this.state
    const style = role && roleData[role].className || roleData[0].className

    const computedAvatar = isNull ? sourceUserDefaultAvatar : avatar
    const computedNickName = isNull ? '点击登录' : nickName
    this.fixStatusColor()
    // if (userLoading) {
    //   Taro.showLoading({
    //     title: '获取ing'
    //   })
    // } else {
    //   Taro.hideLoading()
    // }
    return (
      <View className={`my_info ${style}`} style={`padding-top: ${statusBarHeight}px`}>
        <Image className="bg" src={sourceUserInfoBg} />
        <LoginButtonWrap isWrap={this.state.login} onGetPhoneNumber={this.handlePhoneNumber}>
          <View className="info">
              <Image className="avatar" src={computedAvatar} />
              <View className="name_wrap">
                <Text className="name">{computedNickName}</Text>
                {
                  !isNull && (
                    <View className="level">
                      <Image className="icon" src={roleData[role].icon} />
                      <Text className="text">{roleLabel}</Text>
                    </View>
                  )
                }
              </View>
          </View>
        </LoginButtonWrap>
      </View>
    )
  }


  renderNav() {
    const { nav } = this
    return (
      <View className="nav">
        {nav.map((item, index) => (
          <View className="item" key={item.text} onClick={this.handleNavClick.bind(this, index)}>
            <Image className="icon" src={item.icon} />
            <View className="text_wrap">
              <Text className="text">{item.text}</Text>
              <Image className="icon_arrow" src={sourceNavArrow} />
            </View>
          </View>
        ))}
      </View>
    )
  }

  render() {
    return (
      <View className="my">
        {this.renderUserInfo()}
        {this.renderNav()}
        <Button onClick={this.toggleLoginState}>asdfasdf</Button>
      </View>
    )
  }
}