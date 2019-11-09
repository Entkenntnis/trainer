import React from 'react'

export const RegisterColor = props => {
  const [color, setColor] = React.useState(() => {
    const row = Math.floor(Math.random() * props.colors.length)
    const col = Math.floor(Math.random() * props.colors[row].length)
    return props.colors[row][col]
  })
  return (
    <>
      <div className="container">
        <div className="back">
          <span
            className="back-label"
            onClick={() => {
              props.onAction('back')
            }}
          >
            &lt;
          </span>
        </div>
        <div className="content">
          <div className="label">
            <span>Wähle deine Lieblingsfarbe:</span>
          </div>

          <div className="colors">
            {props.colors.map((row, i) => (
              <div className="colorRow" key={i}>
                {row.map(c => (
                  <div
                    className={'circle ' + (c == color ? 'active-color' : '')}
                    style={{ backgroundColor: c }}
                    onClick={() => {
                      setColor(c)
                    }}
                    key={c}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <div className="submit">
            <span
              className="submit-button"
              onClick={() => {
                if (!color) {
                  alert('Bitte Farbe auswählen!')
                } else {
                  props.onAction('submit', color)
                }
              }}
            >
              Weiter »
            </span>
          </div>
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
        .colorRow {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .circle {
          width: 1.9em;
          height: 1.9em;
          margin: 0.6em;
          border-radius: 50%;
          box-sizing: border-box;
        }
        .active-color {
          border: 3px black solid;
        }
        .submit {
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
