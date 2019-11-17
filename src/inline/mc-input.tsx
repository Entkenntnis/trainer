import { OSIContext } from '../layers/osi'
import React from 'react'

export const McInput = props => {
  const context = React.useContext(OSIContext)
  const span = React.useRef<any>()
  const [value, setValue] = React.useState(null)
  const elKey = React.useRef<number>()

  React.useEffect(() => {
    elKey.current = context.addElement({
      domElement: () => span.current,
      focus: () => {
        if (span.current) span.current.focus()
      },
      reactComponent: (
        <>
          <div className="container">
            {props.choices
              ? props.choices.map(choice => (
                  <div
                    className="choice"
                    onClick={() => {
                      setValue(choice)
                    }}
                    key={choice}
                  >
                    {choice}
                  </div>
                ))
              : null}
          </div>
          <style jsx>{`
            .container {
              background-color: #efefef;
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
            .choice {
              background-color: #7a8bc2;
              color: white;
              font-family: 'Arial';
              margin: 0.3rem 0.5rem;
              padding: 0.3rem 0.8rem;
              cursor: pointer;
            }
          `}</style>
        </>
      )
    })
    return () => {
      context.removeElement(elKey.current)
    }
  }, [])

  React.useEffect(() => {
    if (value) {
      context.removeElement(elKey.current)
    }
  }, [value])

  return (
    <>
      {value === null ? (
        <span className="placeholder" tabIndex={0} ref={span}>
          <span className="inner blink" />
        </span>
      ) : (
        <span className="value">{value}</span>
      )}

      <style jsx>{`
        .value {
          border-bottom: 1px solid #afafaf;
          padding: 0 0.2em;
        }
        .placeholder {
          display: inline-block;
          min-width: 1.5em;
          height: 1em;
          margin-bottom: 0.3em;
          border: 2px solid #afafaf;
          outline: none;
          vertical-align: middle;
          cursor: pointer;
        }
        .placeholder:focus {
          width: 1.5em;
          border: 2px solid #7a8bc2;
        }
        .inner {
          border-bottom: 2px solid black;
          width: 100%;
          display: inline-block;
          height: 95%;
          opacity: 0;
        }
        .placeholder:focus .blink {
          animation: blinker 1s step-start infinite;
        }

        @keyframes blinker {
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
