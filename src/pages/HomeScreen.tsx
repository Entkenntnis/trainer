export const HomeScreen = props => {
  return (
    <>
      <div className="stuff">
        Hallo {props.username}
        <span style={{ color: props.color }}>●</span>!
        <br />
      </div>
      <div className="tools">
        <a onClick={() => props.onAction('delete')}>Benutzer löschen</a>
        <br />
        <br />
        <br />
        <a onClick={() => props.onAction('logout')}>
          Abmelden / Benutzer wechseln
        </a>
        <br />
        <br />
        <br />
        <a
          onClick={() => {
            const main: any = document.documentElement
            if (main.requestFullscreen) {
              main.requestFullscreen()
            }
            if (main.mozRequestFullscreen) {
              main.mozRequestFullscreen
            }
            if (main.webkitRequestFullscreen) {
              main.webkitRequestFullscreen
            }
            if (main.msRequestFullscreen) {
              main.msRequestFullscreen
            }
          }}
        >
          Vollbild
        </a>
      </div>
      <style jsx>{`
        .stuff {
          text-align: center;
          font-family: 'Arial';
          font-size: 2em;
          margin: 2em 1em;
        }
        .tools {
          font-family: 'Arial';
          text-align: center;
          color: darkblue;
        }
        .tools a {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
