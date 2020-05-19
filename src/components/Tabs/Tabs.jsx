import React, { PureComponent } from 'react'
import { View, Text, Image, Video, RichText } from '@tarojs/components'

import './Tabs.scss'

class TabPane extends PureComponent {

  static defaultProps = {
    tab: ''
  }

  render() {
    return (
      <View className="tabs-pane">
        <Text className="header">
          课程介绍
        </Text>
      </View>
    )
  }
}


class Tabs extends PureComponent {

  state = {
    activeKey: ''
  }

  render() {
    const { children } = this.props
    return (
      <View className="tabs">
        {children}
      </View>
    )
  }
}

export {
  Tabs,
  TabPane
}

export default Tabs