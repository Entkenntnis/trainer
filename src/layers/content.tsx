import React from 'react'

/*
Manages content
*/

export interface ContentAPI {
  getToC: () => any
}

export const ContentContext = React.createContext<ContentAPI>({} as any)

export const addContent = content => child => {
  const contentAPI = {
    getToC: content.getToC
  }
  return props => (
    <ContentContext.Provider value={contentAPI}>
      {React.createElement(child, props)}
    </ContentContext.Provider>
  )
}
