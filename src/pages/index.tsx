import React from 'react'

import { StartScreen } from './StartScreen'
import { Trainer } from './Trainer'
import { RegisterName } from './RegisterName'
import { RegisterColor } from './RegisterColor'
import { HomeScreen } from './HomeScreen'

import { TransitionContext } from '../transition'
import { Settings } from './Settings'
import { Content } from '../content'
import { TopicScreen } from './TopicScreen'
import { DummyContent } from './DummyContent'
import Database from '../database'

// https://www.colorcodehex.com/color-scheme/1014183.html

export const Host = props => {
  const transition = React.useContext(TransitionContext)
  const database = React.useRef(new Database())
  const [page, setPage] = React.useState('StartScreen')
  const [topic, setTopic] = React.useState(null)
  const [key, setKey] = React.useState(null)
  const [item, setItem] = React.useState(null)
  if (page == 'StartScreen') {
    const users = database.current.getAllUsers()
    return (
      <StartScreen
        users={users}
        onAction={(action, arg) => {
          console.log(action, arg)
          if (action == 'select') {
            database.current.currentUser = arg
            transition.setMode('forward')
            transition.hide(() => {
              setPage('HomeScreen')
              transition.show()
            })
          }
          if (action == 'new') {
            database.current.currentUser = {}
            transition.setMode('forward')
            transition.hide(() => {
              setPage('RegisterName')
              transition.show()
            })
          }
        }}
      />
    )
  }
  if (page == 'HomeScreen') {
    return (
      <HomeScreen
        user={database.current.currentUser}
        content={Content}
        heading="Themenübersicht"
        autoScroll={topic}
        highlight={topic}
        onAction={(action, arg) => {
          console.log(action, arg)
          if (action == 'settings') {
            transition.setMode('fade')
            transition.hide(() => {
              setPage('Settings')
              transition.show()
            })
          }
          if (action == 'select') {
            transition.setMode('forward')
            transition.hide(() => {
              setPage('TopicScreen')
              setTopic(arg)
              transition.show()
            })
          }
        }}
      />
    )
  }
  if (page == 'TopicScreen' && topic) {
    let tt = null
    let bb = null
    Content.map(block => {
      block.topics.map(t => {
        if (t.title == topic) {
          tt = t
          bb = block
        }
      })
    })
    if (tt) {
      return (
        <TopicScreen
          title={tt.title}
          image={tt.image}
          list={tt.items}
          user={database.current.currentUser}
          block={bb}
          autoScroll={item}
          highlight={item}
          onAction={(action, arg) => {
            console.log(action, arg)
            if (action == 'back') {
              transition.setMode('backward')
              transition.hide(() => {
                setPage('HomeScreen')
                transition.show()
              })
            }
            if (action == 'select') {
              setKey(bb.heading + tt.title + arg)
              setItem(arg)
              transition.setMode('forward')
              transition.hide(() => {
                setPage('DummyContent')
                transition.show()
              })
            }
          }}
        />
      )
    } else {
      setPage('HomeScreen')
    }
  }
  if (page == 'DummyContent') {
    return (
      <DummyContent
        onAction={(action, arg) => {
          if (action == 'back') {
            transition.setMode('backward')
            transition.hide(() => {
              setPage('TopicScreen')
              transition.show()
            })
          }
          if (action == 'set-percent') {
            database.current.currentUser.progress[key] = arg
            database.current.commmitCurrentUser()
            transition.setMode('backward')
            transition.hide(() => {
              setPage('TopicScreen')
              transition.show()
            })
          }
        }}
      />
    )
  }
  if (page == 'Settings') {
    return (
      <Settings
        username={database.current.currentUser.username}
        color={database.current.currentUser.color}
        onAction={(action, arg) => {
          console.log(action, arg)
          if (action == 'logout') {
            transition.setMode('backward')
            transition.hide(() => {
              setPage('StartScreen')
              transition.show()
            })
          }
          if (action == 'delete') {
            database.current.deleteUser(database.current.currentUser.key)
            transition.setMode('backward')
            transition.hide(() => {
              setPage('StartScreen')
              transition.show()
            })
          }
          if (action == 'exit') {
            transition.setMode('fade')
            transition.hide(() => {
              setPage('HomeScreen')
              transition.show()
            })
          }
          if (action == 'fullscreen') {
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
          }
        }}
      />
    )
  }
  if (page == 'RegisterName') {
    return (
      <RegisterName
        defaultValue={
          database.current.currentUser.username
            ? database.current.currentUser.username
            : ''
        }
        onAction={(action, arg) => {
          console.log(action, arg)
          if (action == 'submit') {
            database.current.currentUser.username = arg
            transition.setMode('forward')
            transition.hide(() => {
              setPage('RegisterColor')
              transition.show()
            })
          }
          if (action == 'back') {
            transition.setMode('backward')
            transition.hide(() => {
              setPage('StartScreen')
              transition.show()
            })
          }
        }}
      />
    )
  }
  if (page == 'RegisterColor') {
    return (
      <RegisterColor
        onAction={(action, arg) => {
          console.log(action, arg)
          if (action == 'back') {
            //database.current.currentUser = {}
            transition.setMode('backward')
            transition.hide(() => {
              setPage('RegisterName')
              transition.show()
            })
          }
          if (action == 'submit') {
            const user = database.current.currentUser
            database.current.addNewUser()
            database.current.currentUser.username = user.username
            database.current.currentUser.color = arg
            database.current.commmitCurrentUser()
            transition.setMode('forward')
            transition.hide(() => {
              setPage('HomeScreen')
              transition.show()
            })
          }
        }}
        colors={[
          ['LightCoral', 'Crimson', 'Red', 'HotPink '],
          ['OrangeRed', 'Orange', 'LemonChiffon', 'DarkKhaki'],
          ['Plum', 'MediumOrchid', 'Indigo', 'LawnGreen'],
          ['DarkGreen', 'Teal', 'Turquoise', 'SaddleBrown']
        ]}
      />
    )
  }
}

export const Example1 = () => {
  return (
    <StartScreen
      users={[
        { username: 'Eva', color: 'green' },
        { username: 'Markus', color: 'limegreen' },
        { username: 'King 345', color: 'purple' },
        { username: 'Ag!l', color: 'blue' }
      ]}
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example2 = () => {
  return <Trainer />
}

export const Example3 = () => {
  return <RegisterName onAction={(action, arg) => console.log(action, arg)} />
}
export const Example4 = () => {
  return (
    <RegisterColor
      onAction={(action, arg) => console.log(action, arg)}
      colors={[
        ['LightCoral', 'Crimson', 'Red', 'HotPink '],
        ['OrangeRed', 'Orange', 'LemonChiffon', 'DarkKhaki'],
        ['Plum', 'MediumOrchid', 'Indigo', 'LawnGreen'],
        ['DarkGreen', 'Teal', 'Turquoise', 'SaddleBrown']
      ]}
    />
  )
}

export const Example5 = () => {
  return (
    <HomeScreen
      username="Max"
      color="SaddleBrown"
      heading="Themenübersicht"
      content={Content}
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example6 = () => {
  console.log('render example 6')
  React.useEffect(() => {
    console.log('mount example 6')
    return () => console.log('unmount example 6')
  }, [])
  return (
    <div>
      <RegisterName onAction={(action, arg) => console.log(action, arg)} />
    </div>
  )
}

export const Example7 = () => {
  return (
    <Settings
      username="Max"
      color="SaddleBrown"
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example8 = () => {
  return (
    <TopicScreen
      heading="Negative Zahlen"
      image="N.png"
      list={Content[0].topics[0].items}
      onAction={(action, arg) => console.log(action, arg)}
    />
  )
}

export const Example9 = () => {
  return <DummyContent onAction={(action, arg) => console.log(action, arg)} />
}
