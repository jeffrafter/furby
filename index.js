const { app } = require('electron')
const menubar = require('menubar')
const scanner = require('./scanner')
const server = require('./server')
const notification = require('./notification')

const furbies = {}

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

mb.on('ready', function ready () {
  console.log('Waiting for furbies to connect')

  scanner((peripheral, fluff) => {
    furbies[peripheral.uuid] = fluff
  })

  server((params) => {
    notification(furbies, params)
  })
})
