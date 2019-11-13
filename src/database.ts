export default class Database {
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
