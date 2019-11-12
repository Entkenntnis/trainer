import React from 'react'
import { CSSTransition } from 'react-transition-group'

function warnOutOfContext() {
  console.warn('TransitionContext called outside of provider!')
}

export const TransitionContext = React.createContext<any>({
  hide: warnOutOfContext,
  show: warnOutOfContext,
  setMode: warnOutOfContext
})

export function addTransition(child) {
  const timeouts = {
    forward: { enter: 200, exit: 0 },
    backward: { enter: 0, exit: 200 },
    none: { enter: 0, exit: 0 }
  }

  const enterCallbacks = []
  const exitCallbacks = []

  return props => {
    const [visible, setVisible] = React.useState(false)
    const [mode, setMode] = React.useState('forward')
    const transitionCommands = {
      hide: callback => {
        setVisible(false)
        exitCallbacks[0] = callback
      },
      show: callback => {
        setVisible(true)
        enterCallbacks[0] = callback
      },
      setMode: val => {
        setMode(val)
      }
    }
    React.useEffect(() => {
      setTimeout(() => {
        setMode('none')
        setVisible(true)
        setTimeout(() => {
          setMode('forward')
        })
      })
    }, [])
    return (
      <>
        <div className="fixed-container">
          <CSSTransition
            timeout={timeouts[mode]}
            in={visible}
            classNames={'whole-page-' + mode}
            mountOnEnter
            onEntered={() => {
              if (enterCallbacks[0]) {
                enterCallbacks[0]()
                enterCallbacks[0] = undefined
              }
            }}
            onExited={() => {
              if (exitCallbacks[0]) {
                exitCallbacks[0]()
                exitCallbacks[0] = undefined
              }
            }}
          >
            <TransitionContext.Provider value={transitionCommands}>
              {React.createElement(child, props)}
            </TransitionContext.Provider>
          </CSSTransition>
        </div>
        <style jsx>{`
          .fixed-container {
            position: fixed;
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
          }
          .fixed-container :global(.whole-page-forward-enter) {
            transform: translateX(100vw);
          }
          .fixed-container :global(.whole-page-forward-enter-active) {
            transition: transform ${timeouts.forward.enter}ms;
            transform: translateX(0);
          }
          .fixed-container :global(.whole-page-forward-exit-active) {
            opacity: 0;
            transition: opacity ${timeouts.forward.exit}ms;
          }
          .fixed-container :global(.whole-page-forward-exit-done) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-backward-enter) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-backward-enter-active) {
            opacity: 1;
            transition: opacity ${timeouts.backward.enter}ms;
          }
          .fixed-container :global(.whole-page-backward-exit-active) {
            transform: translateX(100vw);
            transition: transform ${timeouts.backward.exit}ms;
          }
          .fixed-container :global(.whole-page-backward-exit-done) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-none-exit-done) {
            opacity: 0;
          }
        `}</style>
      </>
    )
  }
}
