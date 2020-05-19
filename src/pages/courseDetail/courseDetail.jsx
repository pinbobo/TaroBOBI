import React, { PureComponent, useState } from 'react'
import { Current } from '@tarojs/taro'
import Detail from '@/components/Detail/detail'

import { post } from '@/utils/request'
import { courseDetail } from '@/api/url'

export default class CourseDetail extends PureComponent {

  state = {
    id: 0,
    cover: '',
    video: '',
    title: '',
    subTitle: '',
    createAt: '',
    content: ''
  }

  componentDidMount() {
    let { id } = Current.router.params
    id = Number(id)
    post(courseDetail, {
      id
    })
      .then(result => {
        console.log(result)
        this.setState({
          id: result.id,
          cover: result.cover,
          video: result.video,
          title: result.title,
          subTitle: result.sub_title,
          createAt: result.create_at,
          content: result.content
        })
      })
      .catch(err => {
        console.warn(err)
      })
  }

  render() {
    const { id, cover, video, title, subTitle, createAt, content } = this.state
    const mediaType = !cover && !video ? 'none' : video !== '' ? 'video' : 'image'
    return (
      <Detail
        id={id}
        image={cover}
        video={video}
        title={title}
        subTitle={subTitle}
        date={createAt}
        content={content}
        mediaType={mediaType}
      />
    )
  }
}