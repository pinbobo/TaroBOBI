import React, { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'

import './CourseList.sass'

class CourseList extends PureComponent {

  render() {
    const { children } = this.props
    return (
      <View className="box">
        {children}
      </View>
    )
  }
}


class Course extends PureComponent {

  static defaultProps = {
    title: '',
    subTitle: '',
    cover: '',
    id: '',
    onClick: () => {}
  }

  handleClick = () => {
    const { title, subTitle, cover, id } = this.props
    this.props.onClick({
      title,
      subTitle,
      cover,
      id
    })
  }

  render() {
    const { handleClick } = this
    const { title, subTitle, cover, id } = this.props
    return (
      <View className="layout" onClick={handleClick}>
        <View className="item">
          <Image className="image" src={cover} mode="widthFix" />
          <Text className="title">{title}</Text>
          <Text className="desc">{subTitle}</Text>
        </View>
      </View>
    )
  }
}

export {
  CourseList,
  Course
}


// export default CourseList