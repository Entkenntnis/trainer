import React from 'react'
import { CSSTransition } from 'react-transition-group'

/*
Use this layer to animate page transitions.

Call transition() to:
- animate page exit
- then setting new page (the callback)
- and then entering new page

const context = React.useContext(TransitionContext)
transition.switch('forward', () => {
  setPage('TopicScreen')
})

Or use show(), hide() and setMode() to do it manually.

Current limitation: there is only one page at a time!
*/

export type TransitionMode = 'forward' | 'backward' | 'fade' | 'none'

export interface TransitionContextValue {
  show: (cb?: () => void) => void
  hide: (cb?: () => void) => void
  setMode: (mode: TransitionMode) => void
  switch: (mode: TransitionMode, cb?: () => void) => void
}

export const TransitionContext = React.createContext<TransitionContextValue>(
  {} as any
)

const timeouts = {
  forward: { exit: 0, enter: 200 },
  backward: { exit: 200, enter: 0 },
  fade: { exit: 100, enter: 100 },
  none: { exit: 0, enter: 0 }
}

export function addTransition(child) {
  const exitCallback = { current: null }
  const enterCallback = { current: null }

  return props => {
    const [visible, setVisible] = React.useState(false)
    const [mode, setMode] = React.useState('none')

    const commands: TransitionContextValue = {
      hide: callback => {
        setVisible(false)
        exitCallback.current = callback
      },
      show: callback => {
        setVisible(true)
        enterCallback.current = callback
      },
      setMode,
      switch: (mode, cb) => {
        setMode(mode)
        setVisible(false)
        exitCallback.current = () => {
          if (cb) cb()
          setVisible(true)
        }
      }
    }

    React.useEffect(() => {
      setTimeout(() => {
        setVisible(true)
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
              if (enterCallback.current) {
                enterCallback.current()
                enterCallback.current = null
              }
            }}
            onExited={() => {
              if (exitCallback.current) {
                exitCallback.current()
                exitCallback.current = null
              }
            }}
          >
            <div className="transition-container">
              <TransitionContext.Provider value={commands}>
                {React.createElement(child, props)}
              </TransitionContext.Provider>
            </div>
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

          .transition-container {
            width: 100%;
            height: 100%;
          }

          .fixed-container :global(.whole-page-forward-exit-active) {
            opacity: 0;
            transition: opacity ${timeouts.forward.exit}ms;
          }
          .fixed-container :global(.whole-page-forward-exit-done) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-forward-enter) {
            transform: translateX(100vw);
          }
          .fixed-container :global(.whole-page-forward-enter-active) {
            transition: transform ${timeouts.forward.enter}ms;
            transform: translateX(0);
          }

          .fixed-container :global(.whole-page-backward-exit-active) {
            transform: translateX(100vw);
            transition: transform ${timeouts.backward.exit}ms;
          }
          .fixed-container :global(.whole-page-backward-exit-done) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-backward-enter) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-backward-enter-active) {
            opacity: 1;
            transition: opacity ${timeouts.backward.enter}ms;
          }

          .fixed-container :global(.whole-page-none-exit-done) {
            opacity: 0;
          }

          .fixed-container :global(.whole-page-fade-exit-active) {
            opacity: 0;
            transition: opacity ${timeouts.fade.exit}ms;
          }
          .fixed-container :global(.whole-page-fade-exit-done) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-fade-enter) {
            opacity: 0;
          }
          .fixed-container :global(.whole-page-fade-enter-active) {
            opacity: 1;
            transition: opacity ${timeouts.fade.enter}ms;
          }
        `}</style>
      </>
    )
  }
}
