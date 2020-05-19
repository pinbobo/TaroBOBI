import React, { PureComponent } from 'react'
import { View, Text, Image, Video, RichText } from '@tarojs/components'

import './detail.scss'

export default class Detail extends PureComponent {

  static defaultProps = {
    image: '',
    video: '',
    title: '',
    subTitle: '',
    date: '',
    content: '',
    mediaType: 'image' | 'video' | 'none'
  }

  renderMediaComponent() {
    const { mediaType, image, video } = this.props
    switch (mediaType) {
      case 'image':
        return <Image className="image" src={image} />
      case 'video':
        return <Video className="video" src={video} />
      default:
        return null
    }
  }

  render() {
    const { title, content, date, subTitle } = this.props
    return (
      <View className="detail_container">
        <View>
          {this.renderMediaComponent()}
        </View>
        <Text className="title">{title}</Text>
        <Text className="sub_title">{subTitle}</Text>
        <Text className="date">{date}</Text>
        <RichText className="rich_text" nodes={content} />
      </View>
      )
  }
}