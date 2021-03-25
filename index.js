const path = require('path')
const url = require('url')
const { app } = require('electron')
const { ipcMain } = require('electron')
const { menubar } = require('menubar')
const scanner = require('./scanner')
const createServer = require('./server')
const furbies = require('./furbies')


console.log(`DLC file: ${process.env.DLC_FILE}`)

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

var mb = menubar({
  index: 'file://' + __dirname +  '/index.html',
  icon: './IconTemplate@2x.png',
  preloadWindow: true,
  browserWindow: {
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js") // use a preload script
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

// deleteDlc
// flashDlc
// loadDlc
// toggleDlc

mb.on('ready', function ready () {
  console.log('Waiting for furbies to connect')
  // temp, does nothing useful
  mb.window.webContents.send('furby-connected', "1");

  scanner((peripheral, fluff) => {
    furbies.add(peripheral.uuid, fluff)
    mb.window.webContents.send('furby-connected', peripheral.uuid);
  })

  createServer()
})
