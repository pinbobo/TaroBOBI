import React, { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './showMore.scss'
import sourceShowMoreIcon from '@/images/icon_arrow.png'

export default class ShowMore extends PureComponent {

  static defaultProps = {
    show: true,
    onClick() {}
  }

  render() {
    const { show, onClick } = this.props
    return (
      show &&
        <View className="show_more" onClick={onClick}>
          <Text>查看更多</Text>
          <Image className="icon" src={sourceShowMoreIcon} />
        </View>
    )
  }
}