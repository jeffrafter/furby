const { app } = require('electron')
var menubar = require('menubar')

// Boot the webserver
var fluffd = require("./fluffd.js")

// https://github.com/maxogden/menubar#options
const opts = {
  index: "file://" + __dirname +  "/index.html",
  icon: "./IconTemplate@2x.png",
  preloadWindow: true
}

var mb = menubar(opts)

app.on('window-all-closed', () => {
  app.quit();
});

mb.on('ready', function ready () {
  console.log('app is ready')
})
