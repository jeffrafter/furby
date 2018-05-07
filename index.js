var menubar = require('menubar')

// https://github.com/maxogden/menubar#options
const opts = {
  index: "./index.html",
  icon: "./IconTemplate@2x.png"
}

var mb = menubar(opts)

mb.on('ready', function ready () {
  console.log('app is ready')
  // your app code here
})
