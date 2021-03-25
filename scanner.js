const noble = require('@abandonware/noble')
const fluffcon = require('./fluffcon')

module.exports = (callback) => {
  noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
      noble.startScanning(undefined, false, undefined)
    } else {
      noble.stopScanning()
    }
  })

  noble.on('discover', function(peripheral) {
    if (peripheral.advertisement.localName === 'Furby') {
      console.log('Discovered Furby: ' + peripheral.uuid)

      // Normal server mode
      fluffcon.connect(peripheral, function(fluff) {
        callback(peripheral, fluff)
      })
    }
  })
}
