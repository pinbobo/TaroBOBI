import React, { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { RichText } from '@tarojs/components'
import { post } from '@/utils/request'
import { guide } from '@/api/url'

import './guide.scss'

export default class Guide extends Component {

  state = {
    nodes: ''
  }

  componentDidMount() {
    this.initData()
  }

  async initData() {
    const { id } = Current.router.params
    if (!id) return
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const { content, title } = await post(guide, {
        id
      })
      this.setState({
        nodes: content
      })
      Taro.setNavigationBarTitle({
        title
      })
    } catch(err) {
      console.warn(err)
    } finally {
      Taro.hideLoading()
    }
  }

  render() {
    const { nodes } = this.state
    return (
      <RichText nodes={nodes} />
    )
  }
}