import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import 'react-simple-keyboard/build/css/index.css'

const MathQuillComponent = dynamic(() => import('./mathquill'), { ssr: false })

const Keyboard = dynamic(() => import('react-simple-keyboard'), {
  ssr: false
})

const App = () => {
  const mathquill = React.useRef()
  return (
    <div>
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="content">
          <div className="mq-field">
            <div className="mq-input">
              <MathQuillComponent
                mathquillDidMount={mq => {
                  mathquill.current = mq
                }}
                config={{
                  substituteTextarea: () => document.createElement('span'),
                  handlers: {}
                }}
              ></MathQuillComponent>
            </div>
          </div>
        </div>
        <div className="keyboard">
          <Keyboard
            onKeyPress={button => {
              if (mathquill.current) {
                if (button.length == 1) {
                  mathquill.current.typedText(button)
                } else if (button == '{bksp}') {
                  mathquill.current.keystroke('Backspace')
                } else if (button == '{space}') {
                  mathquill.current.typedText(' ')
                } else {
                  console.log(button)
                }
              }
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
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .mq-field {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .mq-input {
          width: 10em;
          font-size: 1.5em;
          background-color: white;
          flex-grow: 0;
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

function MyKeyboard() {
  const [input, setInput] = useState('')
  const [layout, setLayout] = useState('default')
  const keyboard = useRef()

  const onChange = input => {
    setInput(input)
    console.log('Input changed', input)
  }

  const handleShift = () => {
    let newLayoutName = layout === 'default' ? 'shift' : 'default'
    setLayout(newLayoutName)
  }

  const onKeyPress = button => {
    console.log('Button pressed', button)

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift()
  }

  const onChangeInput = event => {
    let input = event.target.value
    setInput(input)
    keyboard.current.setInput(input)
  }
  return (
    <div className="App">
      <input
        value={input}
        placeholder={'Tap on the virtual keyboard to start'}
        onChange={e => onChangeInput(e)}
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={input => onChange(input)}
        onKeyPress={button => onKeyPress(button)}
      />
    </div>
  )
}

export default App
