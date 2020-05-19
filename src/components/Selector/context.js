import React from 'react'
const selectorContext = React.createContext()
const SelectorProvider = selectorContext.Provider

export {
  selectorContext,
  SelectorProvider
}

export default selectorContext