import React, { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './title.scss'

export default class Title extends PureComponent {

  static defaultProps = {
    icon: ''
  }

  render() {
    const { icon, children } = this.props
    return (
      <View className="session-header">
        <Image className="icon" src={icon} />
        <Text className="title">{children}</Text>
      </View>
    )
  }
}