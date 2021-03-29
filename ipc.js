const ipc = require('node-ipc')
const timers = require('timers')
const notification = require('./notification')

module.exports = () => {
  // Heartbeat every 30 seconds
  timers.setInterval(() => {
    notification({ type: 'tick' })
  }, 30*1000)

  ipc.config.id = 'furby'
  ipc.config.retry= 1000
  ipc.serve(() => {
    ipc.server.on('app.message', (data, socket) => {
      notification(data.message)
    })
  })

  ipc.server.start()
}