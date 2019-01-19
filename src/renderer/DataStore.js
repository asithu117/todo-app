const Store = require('electron-store')

function DataStore(setting) {
  this.store = new Store(setting)
  this.todos = this.store.get('todos') || []

  this.saveTodos = function () {
    this.store.set('todos', this.todos)
    return this
  }
  this.getTodos = function () {
    this.todos = this.store.get('todos') || []
    return this
  }
  this.addTodo = function (todo) {
    console.log('this', this, this.todos)
    this.todos = [...this.todos, todo]
    return this.saveTodos()
  }
  this.deleteTodo = function (todo) {
    this.todos = this.todos.filter(t => t !== todo)
    return this.saveTodos()
  }
}

export default DataStore
