import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, Video, Swiper, SwiperItem } from '@tarojs/components'
import  { CourseList, Course } from '@/components/CourseList/CourseList'

import ShowMore from './showMore'
import Title from './Title'

import { connect } from 'react-redux'
import { asyncGetInfo } from '../../actions/user'

import { post } from '@/utils/request'
import { hotCase, hotNews, hotCourse, roiCase, banner } from '@/api/url'

import './index.sass'

import sourceLogin from '@/images/logo.png'
import sourceSearchIcon from '@/images/icon_search.png'

import sourceNavOne from '@/images/mentorcorps.png'
import sourceNavTwo from '@/images/leecturehall.png'
import sourceNavThree from '@/images/case.png'
import sourceNavFour from '@/images/pk.png'
import sourceBoxIconOne from '@/images/lecturehall.png'


@connect(({ user }) => ({
  nickname: user.nickname
}), (dispatch) => ({
  fetchUserInfoAsync() {
    dispatch(asyncGetInfo())
  }
}))
class Index extends Component {
  
  state = {
    hotCourse: [],
    hotCase: [],
    hotNews: [],
    roiCase: [],
    banners: [],
    subBanner: [],
    type: '',
    video: ''
  }

  nav = [
    {
      text: '导师军团',
      icon: sourceNavOne,
      path: ''
    },
    {
      text: '名师讲堂',
      icon: sourceNavTwo,
      path: '/pages/course/course'
    },
    {
      text: '品牌案例',
      icon: sourceNavThree,
      path: ''
    },
    {
      text: '主播矩阵',
      icon: sourceNavFour,
      path: '/pages/guide/guide?id=15'
    },
    {
      text: '医美直播',
      icon: sourceNavOne,
      path: ''
    },
    {
      text: '我要播',
      icon: sourceNavOne,
      path: ''
    },
    {
      text: '主播任务',
      icon: sourceNavOne,
      path: ''
    },
    {
      text: '主播攻略',
      icon: sourceNavOne,
      path: '/pages/news/news'
    },
  ]



  componentDidMount() {
    this.initData()
  }

  initData() {
    Promise.all([
      post(hotCourse),
      post(hotNews),
      post(hotCase),
      post(roiCase),
      post(banner, { cate_name: 'mainBanner' }),
      post(banner, { cate_name: 'subBanner' })
    ]).then(r => {
      const [hotCourse, hotNews, hotCase, roiCase, mainBanner, subBannerData] = r
      const {  type: bannerType, banners, video } = mainBanner
      const { banners: [{ source: subBanner }] } = subBannerData
      this.setState({
        hotCourse,
        hotNews,
        hotCase,
        roiCase,
        banners,
        video,
        bannerType,
        subBanner
      })
    }).catch(err => {
      console.warn(err)
    })
  }

  handleNavClick(item) {
    Taro.navigateTo({
      url: item.path
    })
  }

  handleCourseClick(courseData) {
    Taro.navigateTo({
      url: `/pages/courseDetail/courseDetail?id=${courseData.id}`
    })
  }

  handleSearchClick() {
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }

  handleMoreCourse() {
    Taro.navigateTo({
      url: '/pages/course/course'
    })
  }

  handleBannerClick(data) {
    Taro.navigateTo({
      url: data.url
    })
  }

  handleAnchorClick() {
    Taro.navigateTo({
      url: '/pages/introduction/introduction'
    })
  }

  renderSwiper() {
    const { banners } = this.state
    if (banners.length === 0) return null
    return (
      <View className="header-swiper_wrap">
        <Swiper
          className="swiper"
          indicatorDots
          indicatorColor="#e2e2e2"
          indicatorActiveColor="#ffffff"
        >
          {
            banners.map((item, index) => {
              return (
                <SwiperItem key={index} onClick={this.handleBannerClick.bind(this, item)}>
                  <Image className="banner_image" src={item.source} />
                </SwiperItem>
              )
            })
          }
        </Swiper>
      </View>
    )
  }

  renderVideo() {
    const { video } = this.state
    if (!video) return null
    return (
      <View className="header-video_wrap">
        <Video
          className="header-video"
          src={video}
          poster="http://bobi-miniapp.oss-cn-shenzhen.aliyuncs.com/banners/video-cover1.jpg"
        />
      </View>
    )
  }

  renderHeader() {
    const { nav } = this
    const { bannerType, subBanner } = this.state

    return (
      <View className="header">
        <View className="search">
          <Image className="search-logo" src={sourceLogin} />

          <View className="search-input" onClick={this.handleSearchClick}>
            <Image className="search-icon" src={sourceSearchIcon} mode="widthFix" />
            <Text className="search-text">输入课程、案例或资讯</Text>
          </View>
        </View>

        {
          bannerType === 'image' ? this.renderSwiper() : this.renderVideo()
        }

        <View className="header-nav_wrap">
          <View className="nav">
            {
              nav.map((item, index) => {
                return (
                  <View className="item" key={index} onClick={this.handleNavClick.bind(this, item)}>
                    <Image className="img" src={item.icon} />
                    <Text className="text">{item.text}</Text>
                  </View>
                )
              })
            }
          </View>
        </View>

        <View className="header-anchor" onClick={this.handleAnchorClick}>
          <Image className="img" src={subBanner} />
        </View>
      </View>
    )
  }

  renderCourse() {
    const { hotCourse } = this.state
    return (
      <CourseList>
          {
            hotCourse.map(course => {
              return (
                <Course
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  subTitle={course.sub_title}
                  cover={course.cover}
                  onClick={this.handleCourseClick}
                />
              )
            })
          }
      </CourseList>
    )
  }

  renderROICase() {
    const { roiCase } = this.state
    return (
      <View className="roi_case">
        {
          roiCase.map(item => {
            return (
              <View className="item" key={item.id}>
                <Image className="cover" src={item.image} mode="widthFix" />
              </View>
            )
          })
        }
      </View>
    )
  }

  render () {
    return (
      <View className='index'>
        {this.renderHeader()}
        <View className="session">
          <Title icon={sourceBoxIconOne}>名师讲堂</Title>
          {this.renderCourse()}
          <ShowMore onClick={this.handleMoreCourse} />
        </View>

        <View className="session">
          <Title icon={sourceBoxIconOne}>全民直播矩阵</Title>
          {this.renderROICase()}
          <ShowMore onClick={this.handleMoreCourse} />
        </View>
      </View>
    )
  }
}

export default Index

