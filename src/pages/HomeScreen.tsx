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
      </div>
      <style jsx>{`
        .stuff {
          text-align: center;
          font-family: 'Arial';
          font-size: 2em;
          margin: 3em;
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
