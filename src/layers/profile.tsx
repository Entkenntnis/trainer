import React from 'react'

/*
Manages user profiles
*/

export interface ProfileAPI {
  getAll: () => any
  addUser: (username: string, color: string) => number
  getUserName: (key: number) => string | undefined
  getUserColor: (key: number) => string | undefined
  getUserProgress: (ukey: number, pkey: string) => number | undefined
  setUserProgress: (ukey: number, pkey: string, pval: number) => void
  deleteUser: (key: number) => void
}

export const ProfileContext = React.createContext<ProfileAPI>({} as any)

const indexKey = ':index'
const userKeyPrefix = 'user:'

function readFromLocalStorage(key, defaultValue) {
  let storageStr = localStorage.getItem(key)
  let storageObj = null
  if (storageStr) {
    try {
      storageObj = JSON.parse(storageStr)
    } catch (e) {}
  }
  return storageObj ? storageObj : defaultValue
}

function writeToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const addProfile = child => {
  // Fail if no localStorage is available, also when ssr
  try {
    localStorage.getItem('xyz')
  } catch (e) {
    return props => React.createElement(child, props)
  }
  // Lade die Index-Datei mit der Liste der Benutzer
  // Stelle sicher, dass sie vollständig ist
  const index = readFromLocalStorage(indexKey, {})
  if (!index.userCounter) {
    index.userCounter = 1
  }
  if (!index.users) {
    index.users = []
  }

  function commitIndex() {
    writeToLocalStorage(indexKey, index)
  }
  commitIndex()

  const users = {}
  for (const key of index.users) {
    const user = readFromLocalStorage(userKeyPrefix + key, {})
    if (
      user.key &&
      user.key === key &&
      key < index.userCounter &&
      user.username &&
      user.color &&
      user.progress
    ) {
      users[key] = user
    }
  }

  function commitUser(key) {
    if (users[key]) writeToLocalStorage(userKeyPrefix + key, users[key])
  }

  const api = {
    getAll: () => users,
    addUser: (username, color) => {
      const key = index.userCounter++
      users[key] = { username, color, progress: {} }
      index.users.push(key)
      commitIndex()
      commitUser(key)
      return key
    },
    getUserName: key => {
      if (users[key]) return users[key].username
    },
    getUserColor: key => {
      if (users[key]) return users[key].color
    },
    getUserProgress: (userkey, progresskey) => {
      const user = users[userkey]
      if (user) {
        return user.progress[progresskey]
      }
    },
    setUserProgress: (userkey, progresskey, value) => {
      const user = users[userkey]
      if (user) {
        user.progress[progresskey] = value
        commitUser(userkey)
      }
    },
    deleteUser: key => {
      localStorage.removeItem(userKeyPrefix + key)
      delete users[key]
      index.users = index.users.filter(k => k !== key)
      commitIndex()
    }
  }

  return props => {
    return (
      <ProfileContext.Provider value={api}>
        {React.createElement(child, props)}
      </ProfileContext.Provider>
    )
  }
}

// BIG TODO: REFACTOREN

/*export default class Database {
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
        const js = JSON.parse(curUser)
        if (!js.progress) {
          js.progress = {}
        }
        result.push(js)
      }
    })
    return result
  }
  addNewUser() {
    this.currentUser = { key: this.index.userCounter++, progress: {} }
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
*/
