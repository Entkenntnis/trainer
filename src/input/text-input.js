import dynamic from 'next/dynamic'
import { OSIContext } from '../osi'

import 'react-simple-keyboard/build/css/index.css'

const MathQuillComponent = dynamic(() => import('../react-mathquill'), {
  ssr: false
})

const Keyboard = dynamic(() => import('react-simple-keyboard'), {
  ssr: false
})

export const TextInput = React.forwardRef((props, ref) => {
  const context = React.useContext(OSIContext)
  const mathquill = React.useRef()
  //console.log('render textinput')

  React.useEffect(() => {
    //console.log('textinput mounted')
    const key = context.addElement(
      {
        focus: () => {
          if (mathquill.current) mathquill.current.focus()
        },
        reactComponent: (
          <TextKeyboard
            inputElement={mathquill}
            onSubmit={val => {
              if (props.onSubmit) props.onSubmit(mathquill.current.latex())
            }}
          />
        ),
        domElement: () => mathquill.current && mathquill.current.el()
      },
      { autoFocus: props.autoFocus }
    )

    return () => {
      //console.log('textinput unmounted')
      context.removeElement(key)
    }
  }, [])
  return (
    <div className="mq-text-style">
      <MathQuillComponent
        mathquillDidMount={mq => {
          if (ref) ref.current = mq
          mathquill.current = mq
          //context.addFocusable({ current: mq })
        }}
        config={{
          substituteTextarea: () => {
            const element = document.createElement('span')
            const att = document.createAttribute('tabindex')
            att.value = '0'
            element.setAttributeNode(att)
            return element
          },
          supSubsRequireOperand: true,
          handlers: {},
          ignoreEq: true
        }}
        onChange={() => {
          console.log(mathquill.current.latex())
        }}
      ></MathQuillComponent>
    </div>
  )
})

const layouts = {
  default: [
    'q w e r t z u i o p ü',
    'a s d f g h j k l ö ä',
    '{shift} ß y x c v b n m {bksp}',
    '123 {space} submit'
  ],
  shift: [
    'Q W E R T Z U I O P Ü',
    'A S D F G H J K L Ö Ä',
    '{shifted} ß Y X C V B N M {bksp}',
    '123 {space} submit'
  ],
  sym: [
    '1 2 3 4 5 6 7 8 9 0',
    ". ? ! ' , : ; @ # ( )",
    '+ - = < > [ ] " {bksp}',
    'ABC {space} submit'
  ]
}

const displays = {
  '{bksp}': '◄',
  '{shift}': '△',
  '{shifted}': '▲',
  submit: 'Weiter'
}

export const TextKeyboard = props => {
  //*console.log('render keyboard')

  const onKeyPressVersion = React.useRef(0)

  /*React.useEffect(() => {
    console.log('keyboard mounted')
    return () => {
      console.log('keyboard unmounted')
    }
  }, [])*/
  const [layout, setLayout] = React.useState('default')

  const onKeyPress = React.useMemo(() => {
    onKeyPressVersion.current++
    return button => {
      if (props.inputElement.current) {
        if (button.length == 1) {
          /*if (
            (button == '/' || button == '^') &&
            props.inputElement.current.cursorDepth() > 1
          )
            return*/
          if ('()[]'.includes(button)) {
            props.inputElement.current.write(button)
          } else {
            props.inputElement.current.typedText(button)
          }
          if (layout == 'shift') setTimeout(() => setLayout('default'))
        } else if (button == '{bksp}') {
          props.inputElement.current.keystroke('Backspace')
        } else if (button == '{space}') {
          props.inputElement.current.typedText(' ')
        } else if (button == '{shift}') {
          setTimeout(() => setLayout('shift'))
        } else if (button == '{shifted}') {
          setTimeout(() => setLayout('default'))
        } else if (button == '123') {
          setTimeout(() => setLayout('sym'))
        } else if (button == 'ABC') {
          setTimeout(() => setLayout('default'))
        } /*else if (button == '{mixed}') {
          if (props.inputElement.current.cursorDepth() <= 1) {
            props.inputElement.current.write('\\frac{}{}')
            props.inputElement.current.keystroke('Left')
            props.inputElement.current.keystroke('Left')
          }
        }*/ else if (
          button == 'submit'
        ) {
          if (props.onSubmit) {
            props.onSubmit()
          }
        } else {
          console.log(button)
        }
      }
    }
  }, [props.inputElement, layout])
  //console.log('current layout:', layout)
  return (
    <>
      <div className="my-keyboard">
        <Keyboard
          autoUseTouchEvents
          onKeyPress={onKeyPress}
          layoutName={layout}
          mergeDisplay
          display={displays}
          layout={layouts}
          dummyProp={onKeyPressVersion.current}
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
        .my-keyboard :global(.simple-keyboard .hg-button span) {
          min-width: 0.5rem;
          text-align: center;
        }
        .my-keyboard :global(.simple-keyboard .hg-row .hg-button-container),
        .my-keyboard :global(.simple-keyboard .hg-row .hg-button: not(: last-child)) {
          margin-right: 3px;
        }
        .my-keyboard :global(.simple-keyboard.hg-theme-default .hg-button) {
          height: 48px;
        }
      `}</style>
    </>
  )
}
