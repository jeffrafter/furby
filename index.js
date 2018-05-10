const { app } = require('electron')
const { ipcMain } = require('electron')
const path = require('path')
const menubar = require('menubar')
const scanner = require('./scanner')
const createServer = require('./server')
const Furbies = require('./furbies')

global.furbies = new Furbies()

console.log(process.env.DLC_FILE)
// https://github.com/maxogden/menubar#options
const opts = {
  index: 'file://' + __dirname +  '/index.html',
  icon: './IconTemplate@2x.png',
  preloadWindow: true
}

var mb = menubar(opts)

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('pair', (event, uuid) => {
  global.furbies.selected = uuid
})

ipcMain.on('unpair', (event, uuid) => {
  global.furbies.selected = null
})

mb.on('ready', function ready () {
  console.log('Waiting for furbies to connect')

  scanner((peripheral, fluff) => {
    global.furbies.add(peripheral.uuid, fluff)
    mb.window.webContents.send('furby-connected', {fluff: fluff, uuid: peripheral.uuid});
  })

  createServer()
})
