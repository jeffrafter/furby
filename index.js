const path = require('path')
const { ipcMain } = require('electron')
const { menubar } = require('menubar')
const scanner = require('./scanner')
const createServer = require('./ipc')
const furbies = require('./furbies')

// I don't think I need this when using menubar
//
// const { app } = require('electron')
//
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

if (process.env.DLC_FILE) {
  console.log(`DLC file: ${process.env.DLC_FILE}`)
} else {
  console.log(`No DLC file loaded`)
}

var mb = menubar({
  index: 'file://' + __dirname +  '/index.html',
  icon: './IconTemplate@2x.png',
  preloadWindow: true,
  browserWindow: {
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js")
    }
  },
})

ipcMain.on('pair', (event, uuid) => {
  furbies.selected = uuid
})

ipcMain.on('unpair', (event, uuid) => {
  furbies.selected = null
})

ipcMain.handle('red', (event) => {
  furbies.red()
})

ipcMain.handle('green', (event) => {
  furbies.green()
})

ipcMain.handle('blue', (event) => {
  furbies.blue()
})

ipcMain.handle('ping', (event) => {
  furbies.ping()
})

ipcMain.handle('toggle', (event) => {
  furbies.toggle()
})

ipcMain.handle('prev', (event) => {
  return furbies.prev()
})

ipcMain.handle('next', (event) => {
  return furbies.next()
})

ipcMain.handle('play', (event) => {
  furbies.play()
})

ipcMain.handle('debug', (event) => {
  furbies.debug()
})

ipcMain.handle('test', (event, a, b, c, d) => {
  furbies.test(a, b, c, d)
})

ipcMain.handle('pair', (event, uuid) => {
  furbies.pair(uuid)
})

ipcMain.handle('unpair', (event, uuid) => {
  furbies.unpair(uuid)
})

ipcMain.handle('deleteDlc', (event) => {
  furbies.deleteDlc()
})

ipcMain.handle('flashDlc', (event) => {
  furbies.flashDlc()
})

ipcMain.handle('loadDlc', (event) => {
  furbies.deleteDlc()
})

ipcMain.handle('toggleDlc', (event) => {
  furbies.toggleDlc()
})

mb.on('ready', function ready () {
  console.log('Waiting for furbies to connect')

  scanner((peripheral, fluff) => {
    furbies.add(peripheral.uuid, fluff)
    mb.window.webContents.send('furby-connected', peripheral.uuid);
  })

  // Create an ipc server to receive messages from other processes
  createServer()
})
