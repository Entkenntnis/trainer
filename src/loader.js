import React from 'react'

export const addLoader = child => {
  return props => {
    const [loaded, setLoaded] = React.useState(false)
    React.useEffect(() => {
      setLoaded(true)
    }, [])
    return (
      <>
        {loaded ? React.createElement(child, props) : null}
        <style jsx global>{`
          #__next:empty {
            position: absolute;
            top: calc(50% - 2em);
            left: calc(50% - 2em);
            width: 3em;
            height: 3em;
            border: 0.5em solid rgba(0, 0, 0, 0.2);
            border-left: 0.5em solid #000000;
            border-radius: 50%;
            animation: load8 1.1s infinite linear;
          }

          @keyframes load8 {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
    )
  }
}
