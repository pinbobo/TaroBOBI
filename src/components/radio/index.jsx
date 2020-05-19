import React, { PureComponent } from "react";

import { View, Text } from "@tarojs/components";

import "./radio.sass";

export default class Radio extends PureComponent {

  static defaultProps = {
    defaultValue: 0
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: props.defaultValue
    }
  }

  handleClick(index) {
    this.setState({
      currentIndex: index
    }, () => {
      this.props.onChange(this.state.currentIndex)
    })
  }

  render() {
    const { currentIndex } = this.state
    const { options, onChange } = this.props
    return (
      <View className="radio_group">
        {options.map((item, index) => {
          const style = index === currentIndex ? 'active' : ''
          return (
            <View className={`radio ${style}`} key={item} onClick={this.handleClick.bind(this, index)}>
              <Text className='text'>
                {item}
              </Text>
            </View>
          )
        })}
      </View>
    );
  }
}
