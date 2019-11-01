import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import 'react-simple-keyboard/build/css/index.css'

const MathQuillComponent = dynamic(
  () => import('./mathquill/Mathquill.component'),
  { ssr: false }
)

const Keyboard = dynamic(() => import('react-simple-keyboard'), {
  ssr: false
})

const App = () => {
  return (
    <div>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="content">
          <MathQuillComponent></MathQuillComponent>
        </div>
        <div className="keyboard">
          <Keyboard
            onKeyPress={() => {
              console.log('keypress')
            }}
          ></Keyboard>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between safe;
          margin: 0;
          padding: 0;
          width: 100vw;
          height: 100vh;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome, Opera and Firefox */
        }
        .content {
          background-color: #eee;
          flex-grow: 1;
        }
        .keyboard {
          width: 100%;
          background-color: white;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          overflow: hidden;
        }
        .simple-keyboard .hg-row .hg-button:active {
          background-color: grey;
        }
      `}</style>
    </div>
  )
}

export default App
