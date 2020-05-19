import React, { Component } from 'react'
import { View, Image, Video, RichText } from '@tarojs/components'
import { banner } from '@/api/url'
import { post } from '@/utils/request'

export default class Introduction extends Component {

  state = {
    image: '',
    video: '',
    nodes: ''
  }

  componentDidMount() {
    this.initData()
  }

  initData() {
    post(banner, {
      cate_name: 'vip'
    })
      .then(result => {
        this.setState({
          image: result.banners[0].source
        })
      })
      .catch(err => {
        console.log(err)
      })
    post(banner, {
      cate_name: 'vipVideo'
    })
      .then(result => {
        this.setState({
          video: result.banners[0].source
        })
      })
  }

  render() {
    const { image, video, nodes } = this.state
    return (
      <View>
        <View className="video_wrap">
          <Video className="video" src={video} />
        </View>
        <Image src={image} />
        <RichText nodes={nodes} />
      </View>
    )
  }
}