import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { taskType } from '@/api/url'
import { post } from '@/utils/request'

import { View, Text, Image, ScrollView } from '@tarojs/components'

import './category.sass'

export default class Category extends Component {

  state = {
    types: [],
    activeTypeIndex: 0,
    activeTypes: []
  }

  componentDidMount() {
    this.request()
  }

  async request() {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const types = await post(taskType)
      const typesToArray = this.objectToArray(types) // 对象集合 转成数组
      let activeTypes = []

      // 初始化 默认选中第一个类别
      if (typesToArray.length > 0) {
        // children 对象 转换为数组结构
        activeTypes = this.objectToArray(typesToArray[0].child)
      }

      this.setState({
        types: typesToArray,
        activeTypes
      })
    } catch(err) {
      console.warn(err)
    } finally {
      Taro.hideLoading()
    }
  }

  excludeProperty(object, keys = []) {
    const newObject = {}
    Object.keys(object)
      .filter(key => keys.indexOf(key) === -1)
      .forEach(key => newObject[key] = object[key])
    return newObject
  }

  handleCategoryClick(index) {
    const { types } = this.state
    const currentCategory = types[index]
    const children = this.objectToArray(currentCategory.child)
    this.setState({
      activeTypeIndex: index,
      activeTypes: children
    })
  }

  handleCategoryChildClick(category) {
    Taro.eventCenter.trigger('category', category)
    Taro.navigateBack()
  }

  renderLeftCategory() {
    const { types, activeTypeIndex } = this.state
    return (
      <ScrollView scrollY style="height: 100%; ">
        <View className="category">
            <Text className="title">类目/佣金</Text>
            <View className="list">
              {types.map((typeItem, index) => {
                const style = activeTypeIndex === index ? 'active' : ''
                return (
                  <View className={`item ${style}`} key={typeItem.id} onClick={this.handleCategoryClick.bind(this, index)}>
                    <View className="active_line"></View>
                    <Text className="name">{typeItem.name}</Text>
                    <Text className="commission">{`${typeItem.commission_rate_min}%-${typeItem.commission_rate_max}%`}</Text>
                  </View>
                )
              })}
            </View>
        </View>
      </ScrollView>
    )
  }

  renderRightCategory() {
    const { activeTypes } = this.state

    const children = activeTypes.map(category => {        
      // 子类属性
      const list = this.objectToArray(category.child).map(child => {
        return (
          <View className="item" key={child.id} onClick={this.handleCategoryChildClick.bind(this, child)}>
            <Text className="text">{child.name}</Text>
          </View>
        )
      })

      return (
        <View className="category_child" key={category.id}>
          <Text className="title">
            {category.name}
          </Text>
          <View className="list">
            {list}
          </View>
        </View>
      )
    })
    
    return (
      <ScrollView scrollY style="height: 100%;">
        <View className="child_wrap">
          {children}
        </View>
      </ScrollView>
    )
  }

  objectToArray(object = {}) {
    return Object.keys(object).map(key => object[key])
  }

  render() {
    return (
      <View className="categoryBody">
        <View className="wrap">
          <View className="left">
            {this.renderLeftCategory()}
          </View>
          <View className="right">
            {this.renderRightCategory()}
          </View>
        </View>
      </View>
    )
  }
}