const ipc = require('node-ipc')

ipc.config.id = 'client'
ipc.config.retry = 1000

ipc.connectTo('furby', () => {
  ipc.of.furby.on('connect', () => {
    ipc.log('## Connected to furby ##', ipc.config.delay)
    ipc.of.furby.emit('app.message', {
      id: ipc.config.id,
      message: {
        type: 'open',
        path: 'file:///dev/null'
      }
    })
  })

  ipc.of.furby.on('disconnect', () => {
    ipc.log('Disconnected from furby')
  })

  ipc.of.furby.on('app.message', (data) => {
    ipc.log('Got a message from furby: ', data)
  })

  console.log(ipc.of.furby.destroy)
})