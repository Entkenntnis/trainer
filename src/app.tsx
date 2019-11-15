import React from 'react'

import { Start } from './pages/Start'
import { Home } from './pages/Home'
import { Topic } from './pages/Topic'
import { DummyTrainer } from './pages/DummyTrainer'
import { Settings } from './pages/Settings'
import { RegisterName } from './pages/RegisterName'
import { RegisterColor } from './pages/RegisterColor'

import { TransitionContext } from './layers/transition'
import { ProfileContext } from './layers/profile'
import { ContentContext } from './layers/content'

const colors = [
  ['LightCoral', 'Crimson', 'Red', 'HotPink '],
  ['OrangeRed', 'Orange', 'LemonChiffon', 'DarkKhaki'],
  ['Plum', 'MediumOrchid', 'Indigo', 'LawnGreen'],
  ['DarkGreen', 'Teal', 'Turquoise', 'SaddleBrown']
]

export const App = () => {
  const transition = React.useContext(TransitionContext)
  const profile = React.useContext(ProfileContext)
  const content = React.useContext(ContentContext)

  const [page, setPage] = React.useState('Start')
  const [topic, setTopic] = React.useState(null)
  const [key, setKey] = React.useState(null)
  const [item, setItem] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [tUsername, setTUsername] = React.useState('')

  if (page == 'Start') {
    return (
      <Start
        users={Object.values(profile.getAll())}
        onSelect={key => {
          transition.switch('forward', () => {
            setUser(key)
            setPage('Home')
          })
        }}
        onNew={() => {
          transition.switch('forward', () => setPage('RegisterName'))
        }}
      />
    )
  } else if (page == 'Home') {
    return (
      <Home
        username={profile.getUserName(user)}
        usercolor={profile.getUserColor(user)}
        toc={content.getToC()}
        getProgress={pkey => profile.getUserProgress(user, pkey)}
        heading="Themenübersicht"
        autoScroll={topic}
        highlight={topic}
        onSettings={() => {
          transition.switch('fade', () => setPage('Settings'))
        }}
        onSelect={nextTopic => {
          transition.switch('forward', () => {
            if (!topic || topic != nextTopic) {
              setTopic(nextTopic)
              setItem(null)
            }
            setPage('Topic')
          })
        }}
      />
    )
  } else if (page == 'Topic') {
    let currentTopic = null
    let currentBlock = null
    content.getToC().map(block => {
      block.topics.map(t => {
        if (topic && t.title == topic) {
          currentTopic = t
          currentBlock = block
        }
      })
    })
    if (!currentTopic) {
      setPage('Home')
      return null
    }
    return (
      <Topic
        title={currentTopic.title}
        image={currentTopic.image}
        list={currentTopic.items}
        getProgress={pkey => profile.getUserProgress(user, pkey)}
        blockHeading={currentBlock.heading}
        autoScroll={item}
        highlight={item}
        onBack={() => {
          transition.switch('backward', () => {
            setPage('Home')
          })
        }}
        onSelect={itemName => {
          transition.switch('forward', () => {
            setKey(currentBlock.heading + currentTopic.title + itemName)
            setItem(itemName)
            setPage('DummyTrainer')
          })
        }}
      />
    )
  } else if (page == 'DummyTrainer') {
    return (
      <DummyTrainer
        onBack={() => {
          transition.switch('backward', () => setPage('Topic'))
        }}
        onSetPercent={p => {
          profile.setUserProgress(user, key, p)
          transition.switch('backward', () => setPage('Topic'))
        }}
      />
    )
  } else if (page == 'Settings') {
    return (
      <Settings
        username={profile.getUserName(user)}
        color={profile.getUserColor(user)}
        onLogout={() => {
          transition.switch('backward', () => {
            setTopic(null)
            setUser(null)
            setItem(null)
            setPage('Start')
          })
        }}
        onDelete={() => {
          transition.switch('backward', () => {
            profile.deleteUser(user)
            setTopic(null)
            setUser(null)
            setItem(null)
            setPage('Start')
          })
        }}
        onExit={() => {
          transition.switch('fade', () => setPage('Home'))
        }}
        onFullscreen={() => {
          const main: any = document.documentElement
          if (main.requestFullscreen) {
            main.requestFullscreen()
          }
          if (main.mozRequestFullscreen) {
            main.mozRequestFullscreen()
          }
          if (main.webkitRequestFullscreen) {
            main.webkitRequestFullscreen()
          }
          if (main.msRequestFullscreen) {
            main.msRequestFullscreen()
          }
        }}
      />
    )
  } else if (page == 'RegisterName') {
    return (
      <RegisterName
        defaultValue={tUsername}
        onBack={() => {
          transition.switch('backward', () => {
            setTUsername('')
            setPage('Start')
          })
        }}
        onSubmit={username => {
          transition.switch('forward', () => {
            setTUsername(username)
            setPage('RegisterColor')
          })
        }}
      />
    )
  } else if (page == 'RegisterColor') {
    return (
      <RegisterColor
        onBack={() => {
          transition.switch('backward', () => setPage('RegisterName'))
        }}
        onSubmit={color => {
          transition.switch('forward', () => {
            setUser(profile.addUser(tUsername, color))
            setPage('Home')
          })
        }}
        colors={colors}
      />
    )
  } else {
    return <p>Unknown Page</p>
  }
}
