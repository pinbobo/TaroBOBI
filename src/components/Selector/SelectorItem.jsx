import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import selectorContext from './context'

class SelectorItem extends PureComponent {

  static contextType = selectorContext
  static defaultProps = {
    onClick() {},
    id: ''
  }

  handleClick = () => {
    const { children: title, id } = this.props
    const data = {
      title,
      id
    }
    if (this.context) {
      this.context.onClick(data)
    }
    this.props.onClick(data)
  }

  render() {
    const { handleClick } = this
    const { children: title } = this.props
    let className = 'children'
    if (this.context) {
      className = classNames(className, {
        active: this.context.currentActive === title
      })
    }
    return (
      <View className={className} onClick={handleClick}>
        <Text className="text">{title}</Text>
      </View>
    )
  }
}

export default SelectorItem