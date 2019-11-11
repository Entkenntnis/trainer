// On Screen Input
import React from 'react'

function warnOutOfContext() {
  console.warn('OSI Contexts called outside of context provider!')
}

export const OSIContext = React.createContext<any>({
  addElement: warnOutOfContext,
  removeElement: warnOutOfContext
})

export function addOSI(child) {
  let counter = 1
  let elements = []
  let currentElement = null
  const osiUpdate = { current: null }

  function addElement(params, options) {
    const key = counter++
    const element = {
      key,
      domElement: params.domElement ? params.domElement : () => {},
      focus: params.focus ? params.focus : () => {},
      reactComponent: params.reactComponent ? params.reactComponent : null
    }
    elements.push(element)
    function autoFocus() {
      if (currentElement == null && element.domElement()) {
        if (osiUpdate.current) osiUpdate.current.update(element.reactComponent)
        setTimeout(() => element.focus())
        currentElement = element
      } else {
        if (currentElement == null) {
          setTimeout(autoFocus, 50)
        }
      }
    }
    if (options && options.autoFocus) {
      autoFocus()
    }
    return key
  }

  function removeElement(key) {
    elements = elements.filter(element => element.key !== key)
    if (currentElement && currentElement.key === key) {
      osiUpdate.current.update(null)
      currentElement = null
    }
  }

  function handleFocus(event) {
    //console.log('handle focus')
    const target = event.target
    for (const element of elements) {
      if (element.domElement().contains(target)) {
        if (!currentElement || element.key !== currentElement.key) {
          currentElement = element
          if (osiUpdate.current)
            osiUpdate.current.update(element.reactComponent)
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
    osiUpdate.current = { update: setKeyboard }
    return keyboard
  }

  return props => {
    return (
      <>
        <div
          className="outer-container"
          onMouseDown={handleFocus}
          onTouchStart={handleFocus}
        >
          <div className="child">
            <OSIContext.Provider value={osiContext}>
              {React.createElement(child, props)}
            </OSIContext.Provider>
          </div>
          <div className="input-area">
            <InputArea />
          </div>
        </div>
        <style jsx>{`
          .outer-container {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: space-between safe;
            margin: 0;
            padding: 0;
            width: 100vw;
            height: 100vh;
            user-select: none;
          }
          .child {
            flex-grow: 1;
            position: relative;
          }
        `}</style>
      </>
    )
  }
}
