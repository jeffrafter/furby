const http = require('http')
const timers = require('timers')
const fluffaction = require('./fluffaction')
const notification = require('./notification')

const PORT = 3872

module.exports = () => {

  // Heartbeat every 30 seconds
  timers.setInterval(() => {
    notification({ type: 'tick' })
  }, 30*1000)

  http.createServer((req, res) => {
    let fragments = req.url.substring(1).split('/')
    let query = fragments.splice(0, 2)
    query.push(fragments.join('/'))

    if (query[0] === 'notification') {
      res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'})

      if (req.method === 'POST') {
        let body = ''
        req.on('data', function(data) { body += data })
        req.on('end', function() {
          try {
            let json = JSON.parse(body)
            notification(json)
            res.end("ok")
          } catch(e) {
            console.log('[Warning] Could not parse notification: ' + e)
            res.end('error: ' + e)
          }
        })
      } else {
        res.end()
      }
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'})
      res.end()
    }
  }).listen(PORT)
}
