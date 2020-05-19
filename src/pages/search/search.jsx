import React, { Component } from "react"
import { View, Text, Input, Image } from "@tarojs/components"

import "./search.sass"

import sourceSearchIcon from '../../images/icon_search.png'
import sourceSearchClean from '../../images/icon_delete.png'

export default class Search extends Component {

  state = {
    content: ''
  }

  handleInput = (e) => {
    this.setState({
      content: e.detail.value
    })
  }

  renderSearchBox() {
    const { content } = this.state
    return (
      <View className="top">
        <View className="input_wrap">
          <Image className="search_icon" src={sourceSearchIcon} />
          <Input className="input" value={content} onChange={this.handleInput} placeholder="搜索课程名称" />
        </View>
        <Text className="cancel">取消</Text>
      </View>
    )
  }

  renderSearchHistory() {
    return (
      <View className="search_history">
        <View className="top">
          <Text className="title">历史记录</Text>
          <Image className="clean" src={sourceSearchClean} />
        </View>
        <View className="list">
          <View className="item">
            <Text className="text">嗷嗷啊</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { content } = this.state
    return (
      <View className="search_page">
        {this.renderSearchBox()}
        {this.renderSearchHistory()}
      </View>
    )
  }
}
