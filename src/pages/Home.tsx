import React from 'react'

export const Home = props => {
  const {
    usercolor,
    username,
    toc,
    heading,
    autoScroll,
    onSettings,
    onSelect,
    highlight,
    getProgress
  } = props

  const listRefs = {}
  toc.forEach(block => {
    block.topics.forEach(topic => {
      listRefs[topic.title] = React.createRef()
    })
  })

  React.useEffect(() => {
    if (autoScroll && listRefs[autoScroll] && listRefs[autoScroll].current) {
      setTimeout(() =>
        listRefs[autoScroll].current.scrollIntoView({ block: 'center' })
      )
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className="statusbar">
          <span style={{ color: usercolor }}>●</span>
          <span className="username">{username}</span>
          <div className="spacer"></div>
          <span className="settings">
            <a onClick={() => onSettings()}>Einstellungen</a>
          </span>
        </div>
        <div className="heading">
          <span>
            <b>{heading}</b>
          </span>
        </div>

        <div className="content">
          <div className="content-list">
            {toc.map(block => (
              <div className="content-block" key={block.heading}>
                <div className="content-block-heading">{block.heading}</div>
                {block.topics.map(topic => (
                  <div
                    key={topic.title}
                    className="content-block-topic"
                    onClick={() => onSelect(topic.title)}
                    ref={listRefs[topic.title]}
                  >
                    <img className="content-block-image" src={topic.image} />
                    <div
                      className={
                        'content-block-topic-title ' +
                        (topic.title == highlight ? 'highlight' : '')
                      }
                    >
                      {topic.title}
                    </div>
                    <div className="spacer"></div>
                    {topic.items.length > 0 &&
                      topic.items.some(item => {
                        const p = getProgress(
                          block.heading + topic.title + item.title
                        )
                        return p && p > 0
                      }) && (
                        <div className="progress">
                          {topic.items.map((item, i) => (
                            <div
                              key={i}
                              className="progress-item"
                              style={{
                                backgroundColor: item.color,
                                width:
                                  (getProgress(
                                    block.heading + topic.title + item.title
                                  )
                                    ? getProgress(
                                        block.heading + topic.title + item.title
                                      )
                                    : '0') + '%'
                              }}
                            ></div>
                          ))}
                        </div>
                      )}
                    <div className="forward">&gt;</div>
                  </div>
                ))}
              </div>
            ))}
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
        .username {
          padding-left: 0.4em;
        }
        .spacer {
          flex-grow: 1;
        }
        .settings a {
          color: #26447b;
          text-decoration: underline;
          cursor: pointer;
        }
        .settings a:active {
          background-color: lightgrey;
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
        .content-block {
          border-left: 1px solid grey;
          border-right: 1px solid grey;
        }
        .content-block-heading {
          padding-top: 0.6em;
          padding-left: 0.4em;
          padding-bottom: 0.2em;
          border-bottom: 1px grey solid;
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
        .content-block-image {
          height: 3.5em;
          margin-left: 0.5em;
        }
        .content-block-topic-title {
          margin-left: 1.4em;
        }
        .content-block-topic-title.highlight {
          border: 2px dotted grey;
          padding: 0.1em;
        }
        .forward {
          padding: 0.4em;
        }
        .progress {
          display: flex;
          flex-direction: column;
          height: 3em;
          width: 1.3em;
          background-color: lightgrey;
          border-top: 1px solid #050;
          margin-right: 0.5em;
        }
        .progress-item {
          flex-grow: 1;
          border-bottom: 1px solid #005000;
        }
      `}</style>
    </>
  )
}
