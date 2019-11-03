import React from 'react'
import dynamic from 'next/dynamic'

const MathQuillComponent = dynamic(() => import('./react-mathquill'), {
  ssr: false
})

const Keyboard = dynamic(() => import('./react-simple-keyboard'), {
  ssr: false
})

export const Page = props => {
  const mq1 = React.useRef()
  return (
    <>
      <div className="container">
        <div className="mathquill">
          <div className="mathquill-inner mq-text-style">
            <MathQuillComponent
              onChange={mq => {
                console.log(mq.latex())
              }}
              mathquillDidMount={mq => {
                mq1.current = mq
                props.addFocusable({ current: mq })
              }}
              config={{
                substituteTextarea: () => {
                  const element = document.createElement('span')
                  const att = document.createAttribute('tabindex')
                  att.value = '0'
                  element.setAttributeNode(att)
                  element.onfocus = () => {
                    props.setKeyboard(<TextKeyboard inputElement={mq1} />)
                  }
                  return element
                },
                handlers: {}
              }}
            ></MathQuillComponent>
          </div>
        </div>
        <div className="mathquill">
          <div className="mathquill-inner mq-default-style">
            <MathQuillComponent
              mathquillDidMount={mq => {
                props.addFocusable({ current: mq })
              }}
              config={{
                substituteTextarea: () => {
                  const element = document.createElement('span')
                  const att = document.createAttribute('tabindex')
                  att.value = '0'
                  element.setAttributeNode(att)
                  element.onfocus = () => {
                    props.setKeyboard(<p>123</p>)
                  }
                  return element
                },
                handlers: {}
              }}
            ></MathQuillComponent>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
        }
        .mathquill {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .mathquill-inner {
          width: 200px;
        }
      `}</style>
    </>
  )
}

const TextKeyboard = props => {
  const [layout, setLayout] = React.useState('default')
  return (
    <>
      <div className={'my-keyboard'}>
        <Keyboard
          autoUseTouchEvents
          onKeyPress={button => {
            if (props.inputElement.current) {
              if (button.length == 1) {
                props.inputElement.current.typedText(button)
                if (layout == 'shift') setLayout('default')
              } else if (button == '{bksp}') {
                props.inputElement.current.keystroke('Backspace')
              } else if (button == '{space}') {
                props.inputElement.current.typedText(' ')
              } else if (button == '{shift}') {
                setLayout('shift')
              } else if (button == '{shifted}') {
                setLayout('default')
              } else if (button == '123') {
                setLayout('sym')
              } else if (button == 'ABC') {
                setLayout('default')
              } else {
                console.log(button)
              }
            }
          }}
          layoutName={layout}
          mergeDisplay
          display={{
            '{bksp}': '◄',
            '{shift}': '△',
            '{shifted}': '▲',
            submit: 'Weiter'
          }}
          layout={{
            default: [
              'q w e r t z u i o p ü',
              'a s d f g h j k l ö ä',
              '{shift} y x c v b n m {bksp}',
              '123 {space} submit'
            ],
            shift: [
              'Q W E R T Z U I O P Ü',
              'A S D F G H J K L Ö Ä',
              '{shifted} Y X C V B N M {bksp}',
              '123 {space} submit'
            ],
            sym: [
              '1 2 3 4 5 6 7 8 9 0',
              "ß @ + = - '",
              ', . : ! ? {bksp}',
              'ABC {space} submit'
            ]
          }}
        ></Keyboard>
      </div>
      <style jsx>{`
        .my-keyboard
          :global(.simple-keyboard.hg-theme-default
            .hg-button.hg-standardBtn[data-skbtn='123']) {
          max-width: 80px;
        }
        .my-keyboard
          :global(.simple-keyboard.hg-theme-default
            .hg-button.hg-standardBtn[data-skbtn='ABC']) {
          max-width: 80px;
        }
        .my-keyboard
          :global(.simple-keyboard.hg-theme-default
            .hg-button.hg-standardBtn[data-skbtn='submit']) {
          max-width: 100px;
          background-color: #e4e4ff;
        }
      `}</style>
    </>
  )
}

const AppX = () => {
  const mathquill1 = React.useRef()
  const mathquill2 = React.useRef()
  const focusedElement = React.useRef()

  function handler(event) {
    const target = event.target
    if (focusedElement.current) {
      if (focusedElement.current.el().contains(target)) {
        console.log('Fokus innerhalb bereits fokusiertem')
        return
      }
      if (mathquill1.current && mathquill1.current.el().contains(target)) {
        if (focusedElement.current !== mathquill1.current) {
          focusedElement.current = mathquill1.current
          setTimeout(() => focusedElement.current.focus())
          console.log('Aktiv fokussiere 1')
          return
        }
      }
      if (mathquill2.current && mathquill2.current.el().contains(target)) {
        if (focusedElement.current !== mathquill2.current) {
          focusedElement.current = mathquill2.current
          setTimeout(() => focusedElement.current.focus())
          console.log('Aktiv fokussiere 2')
          return
        }
      }
      // click outside any focused element
      console.log('Fokus fallback')
      setTimeout(() => focusedElement.current.focus())
    } else {
      if (mathquill1.current && mathquill1.current.el().contains(target)) {
        if (focusedElement.current !== mathquill1.current) {
          focusedElement.current = mathquill1.current
          setTimeout(() => focusedElement.current.focus())
          console.log('Aktiv fokussiere neu 1')
          return
        }
      }
      if (mathquill2.current && mathquill2.current.el().contains(target)) {
        if (focusedElement.current !== mathquill2.current) {
          focusedElement.current = mathquill2.current
          setTimeout(() => focusedElement.current.focus())
          console.log('Aktiv fokussiere neu 2')
          return
        }
      }
    }
  }
  return (
    <div onMouseDown={handler} onTouchStart={handler}>
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
                  mathquill1.current = mq
                }}
                config={{
                  substituteTextarea: () => {
                    const element = document.createElement('span')
                    const att = document.createAttribute('tabindex')
                    att.value = '0'
                    element.setAttributeNode(att)
                    return element
                  },
                  handlers: {}
                }}
              ></MathQuillComponent>
            </div>
          </div>
          <div className="mq-field">
            <div className="mq-input">
              Dein Nickname:
              <br />
              <MathQuillComponent
                className="mq-default-style"
                mathquillDidMount={mq => {
                  mathquill2.current = mq
                }}
                config={{
                  substituteTextarea: () => {
                    const element = document.createElement('span')
                    const att = document.createAttribute('tabindex')
                    att.value = '0'
                    element.setAttributeNode(att)
                    return element
                  },
                  handlers: {}
                }}
              ></MathQuillComponent>
            </div>
          </div>
        </div>
        <div className="keyboard">
          <Keyboard
            autoUseTouchEvents
            onKeyPress={button => {
              if (focusedElement.current) {
                if (button.length == 1) {
                  focusedElement.current.typedText(button)
                } else if (button == '{bksp}') {
                  focusedElement.current.keystroke('Backspace')
                } else if (button == '{space}') {
                  focusedElement.current.typedText(' ')
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
        .keyboard :global(.simple-keyboard .hg-row .hg-button.button-active) {
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
