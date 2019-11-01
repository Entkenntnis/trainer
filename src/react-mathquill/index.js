import MathQuill from 'exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery/dist/jquery.slim!./mathquill.js'
const MQ = MathQuill.getInterface(2)

import './mathquill.css'
import React from 'react'

export default class MathQuillComponent extends React.Component {
  constructor(props) {
    super(props)

    this.element = null
    this.mathField = null

    // MathJax apparently fire 4 edit events on startup.
    this.ignoreEditEvents = 4
  }

  componentDidMount() {
    let config = {
      restrictMismatchedBrackets: true,
      handlers: {}
    }

    if (this.props.config) {
      config = {
        config,
        ...this.props.config
      }
    }

    config.handlers.edit = mathField => {
      if (this.ignoreEditEvents > 0) {
        this.ignoreEditEvents -= 1
        return
      }
      if (this.props.onChange) {
        this.props.onChange(mathField)
      }
    }

    this.mathField = MathQuill.MathField(this.element, config)
    this.mathField.latex(this.props.latex || '')

    if (this.props.className) {
      this.element.classList.add(this.props.className)
    }

    if (this.props.mathquillDidMount) {
      this.props.mathquillDidMount(this.mathField)
    }
  }

  render() {
    return (
      <div
        style={{ width: '100%' }}
        ref={x => {
          this.element = x
        }}
      />
    )
  }
}
