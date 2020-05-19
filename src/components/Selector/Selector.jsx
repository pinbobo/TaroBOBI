import React, { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import { SelectorProvider } from './context.js'

import sourceSelectorIcon from '@/images/Subscript.png'
import sourceSelectorIconActive from '@/images/subscript_active.png'


class Selector extends PureComponent {

  static defaultProps = {
    onClick() {}
  }

  static getDerivedStateFromProps(props, state) {
    const childrenCount = React.Children.count(props.children)
    if (state.currentActive !== '' || childrenCount < 1) return null
    return {
      ...state,
      currentActive: props.children[0].props.children || null
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      currentActive: '',
      isUnfold: false,
      showList: false
    }

    this.initDefaultChild()
  }


  initDefaultChild() {
    // 如果选中元素为空，那就选第一个
    
  }

  handleTabClick = () => {
    this.setState({
      showList: !this.state.showList
    })
  }

  handleSubTitleClick = (data) => {
    this.setState({
      currentActive: data.title,
      showList: false
    })
    this.props.onClick(data)
  }

  handleMaskClick = () => {
    this.setState({
      showList: false
    })
  }

  render() {
    const { handleTabClick, handleSubTitleClick, handleMaskClick } = this
    const { children } = this.props
    const { currentActive = this.getDefaultChild(children), showList } = this.state
    const selectorClassName = classNames('selector', {
      'open': showList
    })
    const icon = showList ? sourceSelectorIconActive : sourceSelectorIcon
    return (
      <View className={selectorClassName}>
        <SelectorProvider value={{
          onClick: handleSubTitleClick,
          currentActive
        }}>
          <View className="item" onClick={handleTabClick}>
            <Text className="text">{currentActive}</Text>
            <Image className="icon" src={icon} />
          </View>
          <View className="list">
            {children}
          </View>
          <View className="mask" onClick={handleMaskClick} />
        </SelectorProvider>
      </View>
    )
  }
}

export default Selector