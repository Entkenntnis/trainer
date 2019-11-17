import { parseInlineHTML } from '../inline/parser'

export const Start = props => {
  const { users, onSelect, onNew } = props
  return (
    <>
      <div className="container">
        <div className="upper">
          <div className="learnon-label">
            <span className="learnon">Weiterlernen:</span>
          </div>
          <div className="list">
            {users &&
              users.map(user => (
                <div
                  className="list-item"
                  onClick={() => onSelect(user.key)}
                  key={user.username}
                >
                  <span style={{ color: user.color }}>●</span>{' '}
                  <span>{user.username}</span>
                </div>
              ))}
            <div style={{ lineHeight: '1.5' }}>
              {parseInlineHTML(
                'Das ist ein <mc>Lückentext;;Artikle;;Spiel</mc>. Bitte beachte, dass es sich hier um <mc>Ernst;;Spaß</mc> handelt. Also seit <mc>böse;;lieb</mc> miteinander.<br><br>Die Lösung lautet: <gap>45</gap> und wir sollten uns nochmal unterhalten! Die Versuchung ist groß. Deshalb sollten wir <mc>uns;;alle</mc> nochmal überlegen, welche Lösung die <mc>beste;;schlechteste</mc> ist. Auf zu neuen <gap>Welten</gap>!'
              )}
            </div>
          </div>
        </div>
        <div className="lower" onClick={() => onNew()}>
          <span className="newperson">Neues Profil »</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          font-family: 'Arial';
          justify-content: space-between;
        }
        .upper {
          flex-grow: 0;
          padding: 0.7em;
        }
        .learnon-label {
          margin: 0.5em;
        }
        .learnon {
          padding-top: 0.5em;
        }
        .list {
          overflow-y: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          max-height: 80vh;
        }
        .list-item {
          margin: 1em;
          text-align: center;
          padding: 0.1em;
          border: solid 2px #8dc3db;
          background-color: #d6e4f0;
          border-radius: 4px;
          cursor: pointer;
        }
        .list-item:active {
          border-color: #7a8bc2;
        }
        .lower {
          padding: 0.7em;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .newperson {
          padding: 0.1em;
          border: solid 2px #578cab;
          background-color: #7a8bc2;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .newperson:active {
          border-color: #26447b;
        }
      `}</style>
    </>
  )
}
