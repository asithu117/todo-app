import { app, BrowserWindow, ipcMain } from 'electron'
import io from 'socket.io-client' // eslint-disable-line
import DataStore from '../renderer/DataStore'
import Scale from '../Scale'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
const todos = new DataStore({ name: 'todos-db' })
ipcMain.on('add-todo', (event, data) => {
  const dt = todos.addTodo(data)
  event.sender.send('todo-list', dt.todos) // prints "ping"
})

const socket = io('http://127.0.0.1:3000')
socket.on('connect', () => {
  console.log('connected to server')
  ipcMain.on('gpio', (event, data) => {
    console.log(data)
    socket.emit('gpio', data) // prints "ping"
  })
  ipcMain.on('bgpio', (event, data) => {
    console.log(data)
    socket.emit('bgpio', data) // prints "ping"
  })
  const scale = new Scale((data) => {
    console.log('receive app index', data)
    socket.emit('weight', data)
  })
  console.log(scale)
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
