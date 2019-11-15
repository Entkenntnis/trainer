export const StartScreen = props => {
  return (
    <>
      <div className="container">
        <div className="upper">
          <div className="learnon-label">
            <span className="learnon">Weiterlernen:</span>
          </div>
          <div className="list">
            {props.users &&
              props.users.map(user => (
                <div
                  className="list-item"
                  onClick={() => {
                    if (props.onAction) {
                      props.onAction('select', user.key)
                    }
                  }}
                  key={user.username}
                >
                  <span style={{ color: user.color }}>●</span>{' '}
                  <span>{user.username}</span>
                </div>
              ))}
          </div>
        </div>
        <div
          className="lower"
          onClick={() => {
            if (props.onAction) {
              props.onAction('new')
            }
          }}
        >
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
