import React from 'react'
import Head from 'next/head'
import { Page } from './pages'

const App = () => {
  const [keyboard, setKeyboard] = React.useState(null)
  const focusable = React.useRef([])
  const focusedNode = React.useRef(undefined)

  const handleFocus = React.useCallback(event => {
    const target = event.target
    for (const node of focusable.current) {
      if (node.current) {
        if (node.current.el().contains(target)) {
          if (node.current !== focusedNode.current) {
            focusedNode.current = node.current
            setTimeout(() => focusedNode.current.focus())
          }
          return
        }
      }
    }
    if (focusedNode.current) {
      setTimeout(() => focusedNode.current.focus())
    }
  }, [])

  return (
    <>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="outer-container"
        onMouseDown={handleFocus}
        onTouchStart={handleFocus}
      >
        <div className="page">
          <Page
            setKeyboard={setKeyboard}
            addFocusable={node => {
              focusable.current.push(node)
            }}
            setFocusedNode={node => {
              focusedNode.current = node
            }}
          />
        </div>
        <div className="input-area">{keyboard}</div>
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
        .page {
          flex-grow: 1;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}

export default App
