import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './LabelItem.sass'

import sourceArrow from '../../images/arrow.png'

export default class LabelItem extends Component {
  render() {
    const { children, label, showArrow = false } = this.props
    return (
      <View className="label_item">
          <Text className="label">{label}</Text>
          <View className="content">
            {children}
          </View>
          { showArrow && <Image className="arrow" src={sourceArrow} /> }
      </View>
    )
  }
}