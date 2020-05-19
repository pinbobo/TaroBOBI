import React, { Component } from 'react'
import { View } from '@tarojs/components'
import  List from '@/components/List/List'
import { post } from '@/utils/request'
import { myCourse } from '@/api/url'
import { pathResponseArray } from '@/utils/util'

import './myCourse.scss'

export default class MyCourse extends Component {

  state = {
    courseList: []
  }

  componentDidMount() {
    this.initData()
  }

  initData() {
    post(myCourse)
    .then(({ data: courseList, pageMate }) => {
      this.setState({
        courseList: pathResponseArray(courseList)
      })
      console.log(courseList)
      console.log(pageMate)
    })
  }

  render() {

    const { courseList } = this.state
    const list = courseList.map(course => {
      return (
        <List
          title={course.title}
          image={course.cover}
          views={course.views}
          date={course.created_at}
        />
      )
    })
    return (
      <View>
        {list}
      </View>
    )
  }
}