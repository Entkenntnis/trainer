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
              background-color: #cfcfff;
              font-family: 'Arial';
              margin: 0.3rem 0.5rem;
              padding: 0.3rem 0.8rem;
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
          font-family: 'Arial';
          border-bottom: 2px solid #afafaf;
          padding: 0 0.4rem;
        }
        .placeholder {
          display: inline-block;
          min-width: 3rem;
          height: 1.1rem;
          border: 2px solid #afafaf;
          outline: none;
        }
        .placeholder:focus {
          width: 3rem;
          border: 2px solid #aaaaef;
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
