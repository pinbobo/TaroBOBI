import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from './store'

import './app.scss'

export const store = configStore()

// if (process.env.TARO_ENV === 'weapp') {
  process.env.store = store
// }

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
