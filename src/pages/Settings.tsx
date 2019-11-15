export const Settings = props => {
  const { color, username, onExit, onDelete, onLogout, onFullscreen } = props
  return (
    <>
      <div className="container">
        <div className="titlebar">
          <div className="title">&nbsp;&nbsp;&nbsp;Einstellungen</div>
          <div className="exit" onClick={() => onExit()}>
            X
          </div>
        </div>
        <div className="settings">
          <p className="name">
            <span style={{ color }}>●</span> {username}
          </p>
          <p>
            <a
              onClick={() => {
                if (window.confirm('Wirklich diesen Benutzer LÖSCHEN?'))
                  onDelete()
              }}
            >
              🗑 Benutzer löschen
            </a>
          </p>
          <p>
            <a onClick={() => onLogout()}>↷ Abmelden / Benutzer wechseln</a>
          </p>
          <p>
            <a onClick={() => onFullscreen()}>⛶ Vollbild</a>
          </p>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          font-family: 'Arial';
        }
        .titlebar {
          border-bottom: 1px grey solid;
          padding: 0.2em;
          display: flex;
          flex-direction: row;
          align-items: baseline;
        }
        .title {
          flex-grow: 1;
          justify-content: center;
          text-align: center;
        }
        .exit {
          cursor: pointer;
          padding-right: 0.35em;
          padding-left: 0.8em;
          padding-top: 0.1em;
        }
        .exit:active {
          background-color: lightgrey;
        }
        .name {
          text-align: center;
          margin: 2.5em 0;
        }
        .settings {
          margin-left: 2em;
          margin-right: 2em;
        }
        a {
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
