import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { connect } from 'react-redux'

import { post } from '@/utils/request'
import { goods as goodsUrl } from '@/api/url'

import { asyncGetInfo } from '../../actions/user'

import './pay.sass'

@connect(({ user }) => ({
  avatar: user.avatar,
  nickName: user.nickName
}), (dispatch) => ({
  fetchUserInfoAsync() {
    dispatch(asyncGetInfo())
  }
}))
export default class Pay extends Component {

  state = {
    goods: []
  }

  renderUserInfo() {
    const { nickName, avatar, role } = this.props
    return (
      <View className="user_info">
        <Image className="avatar" src={avatar} />
        <Text className="name">{nickName}</Text>
      </View>
    )
  }

  renderGift() {
    const { goods } = this.state
    return (
      <View className="gift_wrap">
        <View className="title">
          <Text className="text">波比商会大礼包</Text>
        </View>

        <View className="gift_content_wrap">
          <View className="gift_list">
            {goods.map(good => {
              return (
                <View className="gift_item" key={good.id}>
                  <Text className="name">{good.title}</Text>
                  <View className="price_wrap">
                    <Text className="symbol">¥</Text>
                    <Text className="price">{good.price}</Text>
                  </View>
                  <Text className="desc">{good.desc}</Text>
                </View>
              )
            })}
          </View>
          <View className="buy">
            <Text className="text">立即购买</Text>
          </View>
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    try {
      const goods = await post(goodsUrl)
      this.setState({
        goods
      })
    } catch(err) {
      console.warn(err)
    }
  }
  

  render() {
    return (
      <View className="pay">
        {this.renderUserInfo()}
        {this.renderGift()}
      </View>
    )
  }
}