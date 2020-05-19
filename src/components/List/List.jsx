import React, { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './List.scss'
import sourceCaseViewIcon from '@/images/icon_view.png'


export default class List extends PureComponent {

  static defaultProps = {
    image: '',
    title: '',
    views: '',
    date: ''
  }

  render() {
    const { image, title, views, date } = this.props
    return (
      <View className="case">
        <View className="case-item">
          <Image className="case-image" src={image} />
          <View className="case_wrap">
            <Text className="title">{title}</Text>
            <View className="info f_row">
              <View className="views_wrap f_row">
                <Image className="view_icon" src={sourceCaseViewIcon} />
                {views}
              </View>
              <Text className="time">{date}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}