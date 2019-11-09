import React from 'react'

import { StartScreen } from './StartScreen'
import { Trainer } from './Trainer'
import { RegisterName } from './RegisterName'
import { RegisterColor } from './RegisterColor'
import { HomeScreen } from './HomeScreen'

import { TransitionContext } from '../transition'

// https://www.colorcodehex.com/color-scheme/1014183.html

class Database {
  index
  currentUser
  constructor() {
    // ok, we are at start up, load :index entry
    const indexStr = localStorage.getItem(':index')
    this.index = indexStr ? JSON.parse(indexStr) : { userCounter: 1, users: [] }
    this.commitIndex()
    this.currentUser = null
  }
  getAllUsers() {
    const result = []
    this.index.users.forEach(id => {
      const curUser = localStorage.getItem('user:' + id)
      if (curUser) {
        result.push(JSON.parse(curUser))
      }
    })
    return result
  }
  addNewUser() {
    this.currentUser = { key: this.index.userCounter++ }
    this.index.users.push(this.currentUser.key)
    this.commitIndex()
    this.commmitCurrentUser()
  }
  commitIndex() {
    localStorage.setItem(':index', JSON.stringify(this.index))
  }
  commmitCurrentUser() {
    if (this.currentUser) {
      localStorage.setItem(
        'user:' + this.currentUser.key,
        JSON.stringify(this.currentUser)
      )
    }
  }
  deleteUser(key) {
    localStorage.removeItem('user:' + key)
    this.index.users = this.index.users.filter(k => k !== key)
    this.commitIndex()
  }
}

export const Host = props => {
  // params: localStorage-Access
  // current page
  console.log('render host')
  const transition = React.useContext(TransitionContext)
  const database = React.useRef(new Database())
  const [page, setPage] = React.useState('StartScreen')
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
            //database.current.addNewUser()
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