import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

//import 'react-simple-keyboard/build/css/index.css'

const MathQuillComponent = dynamic(() => import('./react-mathquill'), {
  ssr: false
})

const Keyboard = dynamic(() => import('./react-simple-keyboard'), {
  ssr: false
})

const App = () => {
  const mathquill = React.useRef()
  return (
    <div
      onMouseDown={event => {
        const target = event.target
        if (mathquill.current && mathquill.current.el().contains(target)) {
          return
        } else {
          setTimeout(() => mathquill.current.focus())
        }
      }}
    >
      <Head>
        <title>Trainer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="content">
          <div className="mq-field">
            <div className="mq-input">
              Dein Nickname:
              <br />
              <MathQuillComponent
                className="mq-default-style"
                mathquillDidMount={mq => {
                  mathquill.current = mq
                }}
                config={{
                  substituteTextarea: () => {
                    const element = document.createElement('span')
                    const att = document.createAttribute('tabindex')
                    att.value = '0'
                    element.setAttributeNode(att)
                    element.addEventListener('blur', () => {
                      console.log('blur')
                    })
                    element.addEventListener('focus', () => {
                      console.log('focus')
                    })
                    return element
                  },
                  handlers: {}
                }}
              ></MathQuillComponent>
              <br />
              <div className="test-button"></div>
            </div>
          </div>
        </div>
        <div className="keyboard">
          <Keyboard
            useButtonTag={true}
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
          user-select: none;
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
        .keyboard :global(.simple-keyboard .hg-row .hg-button:active) {
          background-color: grey;
        }
        .test-button {
          width: 20px;
          height: 20px;
          background-color: blue;
        }
        .test-button:active {
          background-color: orange;
        }
      `}</style>

      <style jsx global>{`
        body {
          margin: 0;
          overflow: hidden;
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
