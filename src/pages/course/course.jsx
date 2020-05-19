import React, { Component } from 'react'
import Taro from '@tarojs/taro'

import { View } from '@tarojs/components'
import { CourseList, Course as CourseItem } from '@/components/CourseList/CourseList'
import { Selector, SelectorItem } from '@/components/Selector'

import './course.sass'

import { post } from '@/utils/request'
import { courseList, courseCate } from '@/api/url'

export default class Course extends Component {

  state = {
    courseList: [],
    cateList: []
  }

  pageMeta = {
    next_page_url: '',
    currentPath: '',
    loading: false,
    sortType: '',
    cateName: ''
  }


  componentDidMount() {
    this.initData()
    this.initCateData()
  }

  onReachBottom() {
    this.loadMore()
  }

  async initData(url = courseList) {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const { data: courseList, ...pageMeta } = await post(url, {
        sort_type: this.pageMeta.sortType,
        cate_name: this.pageMeta.cateName
      })
      this.setState({
        courseList: url === this.pageMeta.next_page_url ? 
          [
            ...this.state.courseList,
            ...courseList
          ] :
          courseList
      })
      this.pageMeta.next_page_url = pageMeta.next_page_url
    } finally {
      Taro.hideLoading()
      this.pageMeta.loading = false
    }
  }

  initCateData() {
    post(courseCate)
      .then(cateList => {
        this.setState({
          cateList: [{ id: -1, name: '全部' }, ...cateList]
        })
      })
      .catch(err => {
        console.warn(err)
      })
  }

  loadMore() {
    const { pageMeta: { next_page_url, loading } } = this
    if (next_page_url !== null && !loading) {
      this.pageMeta.loading = true
      this.initData(next_page_url)
    }
  }

  handleCourseClick(courseData) {
    Taro.navigateTo({
      url: `/pages/courseDetail/courseDetail?id=${courseData.id}`
    })
    console.log('你点击了课程，它都id是' + courseData)
  }

  handleSortClick = (data) => {
    this.pageMeta.sortType = data.id
    this.initData(this.pageMeta.path)
    console.log(data)
  }

  handleCategoryClick = (data) => {
    this.pageMeta.cateName = data.title === '全部' ? '' : data.title
    this.initData(this.pageMeta.path)
    console.log(data)
  }

  renderSelector() {
    const { handleSortClick, handleCategoryClick } = this
    const { cateList } = this.state
    return (
      <View className="selector">
        <Selector onClick={handleSortClick}>
          <SelectorItem>综合排序</SelectorItem>
          <SelectorItem id="popularity_des">人气排序</SelectorItem>
        </Selector>

        <Selector onClick={handleCategoryClick}>
          {
            cateList.map(cate => {
              return (
                <SelectorItem key={cate.id}>{cate.name}</SelectorItem>
              )
            })
          }
        </Selector>

      </View>
    )
  }

  renderCourse() {
    const { courseList } = this.state
    return (
      <View className="list_wrap">
        <CourseList>
          {courseList.map(course => {
            return (
              <CourseItem
                key={course.id}
                title={course.title}
                subTitle={course.sub_title}
                cover={course.cover}
                id={course.id}
                onClick={this.handleCourseClick}
              />
            )
          })}
        </CourseList>
      </View>
    )
  }

  render() {
    return (
      <View className="course">
        {this.renderSelector()}
        {this.renderCourse()}
      </View>
    )
  }
}