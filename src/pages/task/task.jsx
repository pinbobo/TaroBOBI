import React, { Component } from "react"
import Taro from "@tarojs/taro"
import classNames from 'classnames'

import { View, Text, Image } from "@tarojs/components"

import { taskList } from '@/api/url'
import { post } from "@/utils/request"

import "./task.sass"

import sourceIconPosition from "@/images/task_address.png"
import sourceIconShop from "@/images/task_platform.png"
import sourceIconTime from "@/images/task_time.png"
import sourceIconPeople from "@/images/task_num.png"

export default class Task extends Component {
  state = {
    taskList: [],
    currentNavIndex: 0
  }

  nav = ["实体直播", "直播机任务"]

  liveType = ["店铺直播", "实体店直播", "直播间直播", "医美直播"]

  componentDidMount() {
    this.loadData()
  }

  async loadData() {
    Taro.showLoading({
      title: '加载中'
    })
    try {
      const result = await post(taskList)
      this.setState({
        taskList: result.data
      })
    } catch(err) {
      console.warn(err)
    } finally {
      Taro.hideLoading()
    }
  }

  handleNavClick(index) {
    this.setState({
      currentNavIndex: index
    })
  }

  renderNav() {
    const { currentNavIndex } = this.state
    const { nav } = this
    return (
      <View className="nav_wrap">
        <View className="bg"></View>
        <View className="task_nav">
          {nav.map((item, index) => {
            const itemClass = classNames('task_item', {
              active: index === currentNavIndex
            })
            return (
              <View
                className={itemClass}
                key={item}
                onClick={this.handleNavClick.bind(this, index)}
              >
                <Text className="text">{item}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  renderTaskList() {
    const { taskList } = this.state
    const { liveType } = this
    return (
      <View className="task_list">
        {taskList.map(task => {
          return (
            <View className="item" key={task.id}>
              <View className="left">
                <Text className="title">{task.shop_name}</Text>
                <View className="attr">
                  <View className="attr_item">
                    <Image className="icon" src={sourceIconPosition} />
                    <Text className="content">{task.city}</Text>
                  </View>
                  <View className="attr_item">
                    <Image className="icon" src={sourceIconShop} />
                    <Text className="content">{task.platform.name}</Text>
                  </View>
                  <View className="attr_item">
                    <Image className="icon" src={sourceIconTime} />
                    <Text className="content">
                      {Math.floor(Number(task.duration))}小时
                    </Text>
                  </View>
                  <View className="attr_item">
                    <Image className="icon" src={sourceIconPeople} />
                    <Text className="content">{task.number}</Text>
                  </View>
                </View>
                <View className="status">
                  <Text className="commission">{task.commission_rate}</Text>
                  <Text className="commission_symbol spacing">%佣金</Text>
                  <Text className="type spacing">
                    {liveType[task.live_type]}
                  </Text>
                  <Text className="verify">审核通过</Text>
                </View>
              </View>
              <View className="right">
                <View className="button">报名</View>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  render() {
    return (
      <View className="task">
        {this.renderNav()}
        {this.renderTaskList()}
      </View>
    )
  }
}
