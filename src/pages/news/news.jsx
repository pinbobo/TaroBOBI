import React, { Component } from 'react'
import { View } from '@tarojs/components'
import List from '@/components/List/List'
import { post } from '@/utils/request'
import { pathResponseArray } from '@/utils/util'
import { newsList } from '@/api/url'


export default class News extends Component {

  state = {
    newsList: []
  }

  componentDidMount() {
    this.initData()
  }

  initData() {
    post(newsList)
      .then(({ data: newsList, ...pageInfo }) => {
        this.setState({
          newsList: pathResponseArray(newsList)
        })
      })
      .catch(err => {
        console.warn(err)
      })
  }

  render() {
    const { newsList } = this.state
    const list = newsList.map(item => {
      return (
        <List
          key={item.id}
          title={item.title}
          image={item.cover}
          views={item.views}
          date={item.created_at}
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