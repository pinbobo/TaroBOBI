import React from 'react'
import { Button } from '@tarojs/components'

import './LoginButtonWrap.scss'

const LoginButtonWrap = ({ children, isWrap = false, onGetPhoneNumber }) => {
  const content = isWrap ? (
    <Button
      className="phone_button"
      openType="getPhoneNumber"
      onGetPhoneNumber={onGetPhoneNumber}
      style="background-color: transparent; "
    >
      {children}
    </Button>
  ) : children
  return content
}

export default LoginButtonWrap