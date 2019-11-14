import React from 'react'

/*
Handles On Screen Input behaviour:

Ensures current input is always focused, autoFocus element on start

Add elements to context on render
*/

export interface OSIOptions {
  autoFocus?: boolean
}

export interface OSIParameters {
  domElement?: () => HTMLElement
  focus?: () => void
  reactComponent?: any
}

export interface OSIContextValue {
  addElement: (params: OSIParameters, options?: OSIOptions) => number
  removeElement: (key: number) => void
}

export const OSIContext = React.createContext<OSIContextValue>({} as any)

export function addOSI(child) {
  let counter = 1
  let elements = []
  let currentElement = null
  const keyboardUpdate = { current: null }

  function updateKeyboard(comp) {
    if (currentElement) {
      if (keyboardUpdate.current) {
        keyboardUpdate.current(comp)
      }
    }
  }

  function autoFocus(element, delay) {
    if (currentElement) return
    if (element.domElement()) {
      currentElement = element
      updateKeyboard(element.reactComponent)
      setTimeout(() => element.focus())
    } else {
      setTimeout(() => {
        autoFocus(element, delay * 2)
      }, delay) // try again
    }
  }

  function addElement(params: OSIParameters, options: OSIOptions) {
    const key = counter++
    const element = {
      key,
      domElement: () => {},
      focus: () => {},
      reactComponent: null,
      ...params
    }
    elements.push(element)
    if (options && options.autoFocus) {
      autoFocus(element, 10)
    }
    return key
  }

  function removeElement(key) {
    elements = elements.filter(element => element.key !== key)
    if (currentElement && currentElement.key === key) {
      updateKeyboard(null)
      currentElement = null
    }
  }

  function handleFocus(event) {
    const target = event.target
    for (const element of elements) {
      if (element.domElement().contains(target)) {
        if (!currentElement || element.key !== currentElement.key) {
          currentElement = element
          updateKeyboard(element.reactComponent)
          setTimeout(() => element.focus())
        }
        return
      }
    }
    if (currentElement) {
      setTimeout(() => {
        if (currentElement) currentElement.focus()
      })
    }
  }

  const osiContext = {
    addElement,
    removeElement
  }

  const InputArea = () => {
    const [keyboard, setKeyboard] = React.useState(null)
    keyboardUpdate.current = setKeyboard
    return keyboard
  }

  return props => {
    return (
      <>
        <div
          className="osi-container"
          onMouseDown={handleFocus}
          onTouchStart={handleFocus}
        >
          <div className="osi-child">
            <OSIContext.Provider value={osiContext}>
              {React.createElement(child, props)}
            </OSIContext.Provider>
          </div>
          <div className="input-area">
            <InputArea />
          </div>
        </div>
        <style jsx>{`
          .osi-container {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: space-between safe;
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
          }
          .osi-child {
            flex-grow: 1;
            position: relative;
          }
        `}</style>
      </>
    )
  }
}
