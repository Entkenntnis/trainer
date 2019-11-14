export const TopicScreen = props => {
  return (
    <>
      <div className="container">
        <div className="statusbar">
          <span className="back-to-home" onClick={() => props.onAction('back')}>
            &lt; Themenübersicht
          </span>
          <div className="spacer"></div>
        </div>
        <div className="heading">
          <span>
            <b>{props.title}</b>
          </span>
        </div>

        <div className="content">
          <div className="content-list">
            <div className="topic-image">
              <img src={props.image} />
            </div>

            <div className="content-block">
              {props.list &&
                props.list.map(item => {
                  const key = props.block.heading + props.title + item.title
                  const progress = props.user.progress[key]
                  return (
                    <div
                      key={item.title}
                      className="content-block-topic"
                      onClick={() => {
                        props.onAction('select', item.title)
                      }}
                    >
                      <div className="content-block-topic-title">
                        {item.title}
                      </div>
                      <div className="spacer"></div>
                      {progress > 0 && (
                        <div
                          className="progress"
                          style={{ backgroundColor: item.color }}
                        >
                          {progress + '%'}
                        </div>
                      )}
                      <div className="forward">&gt;</div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          font-family: 'Arial';
          position: absolute;
          height: 100%;
          width: 100%;
        }
        .statusbar {
          border-bottom: 1px grey solid;
          padding: 0.2em;
          display: flex;
          flex-direction: row;
          align-items: baseline;
        }
        .back-to-home {
          padding-left: 0.4em;
          cursor: pointer;
        }
        .back-to-home:active {
          background-color: lightgrey;
        }
        .spacer {
          flex-grow: 1;
        }
        .settings a {
          color: #26447b;
          text-decoration: underline;
          cursor: pointer;
        }
        .heading {
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding: 0.6em;
          border-bottom: 1px grey solid;
          background-color: #d6e4f0;
        }
        .content {
          overflow-y: auto;
          flex-grow: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .content-list {
          width: 550px;
          flex-grow: 0;
          flex-shrink: 1;
        }
        .topic-image {
          padding: 2em 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          border-bottom: 1px grey solid;
          border-left: 1px grey solid;
          border-right: 1px grey solid;
        }
        .topic-image img {
          height: 5em;
          width: 5em;
        }
        .content-block {
          border-left: 1px solid grey;
          border-right: 1px solid grey;
        }
        .content-block-topic {
          border-bottom: 1px grey solid;
          height: 4em;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
        }
        .content-block-topic:active {
          background-color: lightgrey;
        }
        .content-block-topic-title {
          margin-left: 0.6em;
        }
        .forward {
          padding: 0.4em;
        }
        .progress {
          font-size: 0.8em;
          color: white;
          padding: 0.1em;
          border-radius: 2px;
        }
      `}</style>
    </>
  )
}
