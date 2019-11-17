import MathQuill from './mathquill-loader'

import React from 'react'

export default function MathquillComponent(props) {
  const element = React.useRef(null)
  const mathField = React.useRef(null)
  React.useEffect(() => {
    let config = {
      restrictMismatchedBrackets: true,
      handlers: {}
    }

    if (props.config) {
      config = {
        config,
        ...props.config
      }
    }

    mathField.current = MathQuill.MathField(element.current, config)
    mathField.current.latex(props.latex || '')

    if (props.mathquillDidMount) {
      props.mathquillDidMount(mathField.current)
    }
  }, [])
  return (
    <>
      <div className="mq-div">
        <div className="mq-inner-div" ref={element} />
      </div>
      <style jsx>{`
        .mq-inner-div {
          width: 100%;
        }
        .mq-div :global(.mq-editable-field .mq-cursor) {
          margin-right: -1px;
          border-left: 2px solid darkgrey;
        }
        .mq-div :global(.mq-editable-field),
        .mq-div :global(.mq-math-mode .mq-editable-field) {
          border: 2px solid gray;
          border-radius: 2px;
        }
        .mq-div :global(.mq-math-mode),
        .mq-div :global(.mq-math-mode .mq-editable-field) {
          font-family: inherit;
        }
        .mq-div :global(.mq-editable-field.mq-focused),
        .mq-div :global(.mq-math-mode .mq-editable-field.mq-focused) {
          box-shadow: none;
          border-color: #7a8bc2;
          border-radius: 2px;
          border-width: 2px;
        }
      `}</style>
    </>
  )
}
