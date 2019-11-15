import { TextInput } from '../input/text-input'
import React from 'react'

export const RegisterName = props => {
  const { defaultValue, onBack, onSubmit } = props
  const inputRef = React.useRef()
  return (
    <>
      <div className="container">
        <div className="back">
          <span className="back-label" onClick={() => onBack()}>
            &lt;
          </span>
        </div>
        <div className="content">
          <div className="label">
            <span>Spitzname:</span>
          </div>
          <div className="input">
            <div className="input-wrapper">
              <TextInput
                autoFocus
                onSubmit={val => {
                  if (!val.trim()) {
                    setTimeout(() => alert('Bitte Namen eingeben!'))
                  } else {
                    if (val.length > 30) {
                      setTimeout(() =>
                        alert('Name ist zu lang, maximal 30 Zeichen!')
                      )
                    } else {
                      onSubmit(val)
                    }
                  }
                }}
                ref={inputRef}
                defaultValue={defaultValue}
              />
            </div>
          </div>
          <div className="spacer"></div>
        </div>
      </div>
      <style jsx>{`
        .content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-grow: 1;
        }
        .back-label {
          padding: 0.6em;
          cursor: pointer;
          display: inline-block;
        }
        .back-label:active {
          background-color: #d6e4f0;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-family: 'Arial';
          height: 100%;
        }
        .label {
          display: flex;
          justify-content: center;
          margin: 1em;
        }
        .input {
          margin: 1em;
          display: felx;
          justify-content: center;
        }
        .input-wrapper {
          width: 15em;
        }
        .button {
          display: flex;
          justify-content: center;
          margin: 1em;
        }
        .submit-button {
          padding: 0.1em;
          border: solid 2px #578cab;
          background-color: #7a8bc2;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .submit-button:active {
          border-color: #26447b;
        }
      `}</style>
    </>
  )
}
