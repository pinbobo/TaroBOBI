import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView, Input, Picker } from '@tarojs/components'
import Radio from '@/components/radio'
import LabelItem from '@/components/LabelItem/LabelItem'

import { taskPlatform } from '@/api/url'
import { post } from '@/utils/request'

import './demand.sass'

export default class Demand extends Component {

  state = {
    platforms: [],
    platformActive: 0,
    liveType: 0,
    liveDate: '',
    goodClass: '',
    address: '',
    street: '',
    wechatAddress: null,
    category: ''
  }

  liveTypes = ['单品', '店铺直播', '实体直播']

  mapCategory(category) {

    const categorys = []
    if (category.parent_id <= 0) return categorys

    categorys.push(category.name)

    this.mapCategory(this.state.types)
  }

  componentWillUnmount() {
    Taro.eventCenter.off('category', this.handleEventCategoryChange)
  }

  handleEventCategoryChange = (category) => {
    console.log(category)
    this.setState({
      category: category.name
    })
  }

  handleCategoryClick = () => {
    Taro.navigateTo({
      url: '/pages/category/category'
    })
  }

  handlePlatformClick = (index) => {
    this.setState({
      platformActive: index
    })
  }

  handleLiveOptionChange = (index) => {
    this.setState({
      liveType: index
    })
  }

  handleAddressChange = (e) => {
    this.setState({
      address: e.detail.value.join(' ')
    })
  }

  handleDateChange = (e) => {
    this.setState({
      liveDate: e.detail.value
    })
  }

  handleAddressClick = async () => {
    try {
      await Taro.authorize({
        scope: 'scope.userLocation'
      })
      const { latitude, longitude, ...rest } = await Taro.getLocation({
        type: 'gcj02'
      })
      const data = await Taro.chooseAddress({
        latitude,
        longitude
      })
      if (data.errMsg === 'chooseAddress:ok') {
        this.setState({
          address: `${data.provinceName} ${data.cityName} ${data.countyName}`,
          wechatAddress: data,
          street: data.detailInfo
        })
        console.log(data)
      }
      console.log(latitude, longitude)
    } catch(err) {
      console.warn(err)
    }
  }

  componentDidMount() {
    Taro.eventCenter.on('category', this.handleEventCategoryChange)
    this.initData()
    this.initLocationScope()
  }


  async initData() {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const result = await post(taskPlatform)
      this.setState({
        platforms: result
      })
    } catch(err) {
      console.warn(err)
    } finally {
      Taro.hideLoading()
    }
  }

  async initLocationScope() {
    try {
      await Taro.authorize({
        scope: 'scope.userLocation'
      })
      const { latitude, longitude, ...rest } = await Taro.getLocation({
        type: 'gcj02'
      })
      console.log(latitude, longitude)
    } catch(err) {
      console.warn(err)
    }
  }

  renderPlatform() {
    const { platforms, platformActive } = this.state
    return (
      <ScrollView scrollX className="platform_scroll">
        <View className="platform_list">
          {
            platforms.map(({ id, name, image }, index) => {
              const style = index === platformActive ? 'active' : ''
              return (
                <View className={`platform ${style}`} key={id} onClick={this.handlePlatformClick.bind(this, index)}>
                  <Image className="logo" src={image} />
                  <Text className="text">{name}</Text>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }

  renderOptions() {
    const { liveTypes } = this
    const { liveType, liveDate, category, address, street } = this.state

    return (
      <View className="options">
        <LabelItem label="直播选项">
          <Radio options={liveTypes} onChange={this.handleLiveOptionChange} />
        </LabelItem>
        <LabelItem label="直播日期" showArrow>
          <Picker
            mode="date"
            onChange={this.handleDateChange}
            value={liveDate}
            style="flex: 1;"
          >
            <View className="input">
              <Text>{liveDate || '直播日期'}</Text>
            </View>
          </Picker>
        </LabelItem>
        {
          liveTypes[liveType] === '单品' && (
            <React.Fragment>
              <View className="interval"></View>
              <LabelItem label="商品类别" showArrow>
                <View className="input" onClick={this.handleCategoryClick}>
                  <Text>
                    {category || '商品类别'}
                  </Text>
                </View>
              </LabelItem>
              <LabelItem label="产品链接">
                <Input className="input" placeholder="请输入" placeholderClass="placeholder" />
              </LabelItem>
              <LabelItem label="产品标题">
                <Input className="input" placeholder="最多输入15个汉字" placeholderClass="placeholder" />
              </LabelItem>
            </React.Fragment>
          )
        }

        {
          liveTypes[liveType] === '实体直播' && (
            <React.Fragment>
              <View className="interval"></View>
              <LabelItem label="公司地点" showArrow>
                {/* <Picker
                  mode="region"
                  onChange={this.handleAddressChange}
                  value={address}
                  style="flex: 1;"
                > */}
                  <View className="input" onClick={this.handleAddressClick}>
                    <Text className="show">{address || '从微信中选择地址'}</Text>
                  </View>
                {/* </Picker> */}
              </LabelItem>
              {
                street && (
                  <LabelItem label="街道">
                    <View className="input">
                      <Text className="show">{street}</Text>
                    </View>
                  </LabelItem>
                )
              }
            </React.Fragment>
          )
        }

        { 
          liveTypes[liveType] === '店铺直播' && (
            <React.Fragment>
              <View className="interval"></View>
              <LabelItem label="店铺名">
                <Input className="show" placeholder="请填写店铺名" placeholderClass="placeholder" />
              </LabelItem>
            </React.Fragment>
          )
        }
        
      </View>
    )
  }

  render() {
    return (
      <View className="demand">
        {this.renderPlatform()}
        {this.renderOptions()}
        <View className="button">
          下一步
        </View>
      </View>
    )
  }
}