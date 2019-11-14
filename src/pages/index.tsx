import React from 'react'

import { StartScreen } from './StartScreen'
import { RegisterName } from './RegisterName'
import { RegisterColor } from './RegisterColor'
import { HomeScreen } from './HomeScreen'

import { TransitionContext } from '../layers/transition'
import { Settings } from './Settings'
import { Content } from '../../content/dummy'
import { TopicScreen } from './TopicScreen'
import { DummyContent } from './DummyContent'
import Database from '../layers/database'

// https://www.colorcodehex.com/color-scheme/1014183.html

export const App = props => {
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
            transition.switch('forward', () => setPage('HomeScreen'))
          }
          if (action == 'new') {
            database.current.currentUser = {}
            transition.switch('forward', () => setPage('RegisterName'))
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
            transition.switch('fade', () => setPage('Settings'))
          }
          if (action == 'select') {
            transition.switch('forward', () => {
              setTopic(arg)
              setPage('TopicScreen')
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
              setItem(null)
              transition.switch('backward', () => setPage('HomeScreen'))
            }
            if (action == 'select') {
              setKey(bb.heading + tt.title + arg)
              setItem(arg)
              transition.switch('forward', () => setPage('DummyContent'))
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
            transition.switch('backward', () => setPage('TopicScreen'))
          }
          if (action == 'set-percent') {
            database.current.currentUser.progress[key] = arg
            database.current.commmitCurrentUser()
            transition.switch('backward', () => setPage('TopicScreen'))
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
            transition.switch('backward', () => setPage('StartScreen'))
          }
          if (action == 'delete') {
            database.current.deleteUser(database.current.currentUser.key)
            transition.switch('backward', () => setPage('StartScreen'))
          }
          if (action == 'exit') {
            transition.switch('fade', () => setPage('HomeScreen'))
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
            transition.switch('forward', () => setPage('RegisterColor'))
          }
          if (action == 'back') {
            transition.switch('backward', () => setPage('StartScreen'))
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
            transition.switch('backward', () => setPage('RegisterName'))
          }
          if (action == 'submit') {
            const user = database.current.currentUser
            database.current.addNewUser()
            database.current.currentUser.username = user.username
            database.current.currentUser.color = arg
            database.current.commmitCurrentUser()
            transition.switch('forward', () => setPage('HomeScreen'))
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
  console.warn('Unknown page', page)
}
