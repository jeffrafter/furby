const sample = require('./util/sample')
const linter = require('./behaviors/linter')
const cursor = require('./behaviors/cursor')
const active = require('./behaviors/active')

const startingBoredThreshold = 2*60*1000 // 2 minutes

let projectPath = null
let path = null
let lastNotification = new Date()
let boredThreshold = startingBoredThreshold

module.exports = (notification) => {
  let now = new Date()

  if (notification.type === 'tick') {
    if (now - lastNotification > boredThreshold) {
      boredThreshold = boredThreshold*2
      console.log(`Next bored action in ${boredThreshold/1000}s`)
      global.furbies.sampleEmotion('sleepy')
    }
    if (projectPath) {
      global.furbies.ciStatus(projectPath)
    }
  } else {
    console.log('*************************************')
    console.log(notification)
    lastNotification = now
    boredThreshold = startingBoredThreshold
  }

  if (notification.projectPath) {
    projectPath = notification.projectPath
  }

  if (notification.type === 'active') {
    path = notification.path
    active.update(notification.path)
  }

  if (notification.type === 'change') {
    path = notification.path
    if (notification.lineText.match(/^\s*(var|let|const)\s+$/)) {
      global.furbies.sampleAction([
        "oooh, pick a good one!",
        "let's name baby",
        "ooh, name for kah? (sing) Oooh"
      ])
    }
    if (notification.lineText.match(/(^\s*function|\(\))$/)) {
      global.furbies.sampleEmotion(['collab', 'smalltalk'])
    }

    if (notification.change.match(/^\s*s+\s*/)) {
      global.furbies.sampleAction([
        "mmm… s s s s"
      ])
    }
  }

  if (notification.type === 'cursor') {
    cursor.update(notification.path, notification.old, notification.new)
  }

  if (notification.type === 'open') {
    global.furbies.sampleEmotion('beginning')
  }

  if (notification.type === 'destroy') {
    global.furbies.cycleEmotion('goodbye')
  }

  if (notification.type === 'linter') {
    linter.update(path, notification.count)
  }
}







/*
  - Test failed
  - Test passed
  - Started variable
  - Started function
  - Finished function
  - In complex function
  - In a method that doesn't have test coverage
  - Added a linter error
  - Fixed a linter error
  - In duplicated code
  - CI build status
  - Naming conventions (NLP)
  - JSHint (if Javascript)
*/

/*


Sitting down
Small talk to get started
Starting a variable
Starting a function name
Things broken
Distracted, sleep, bored
Let's do this
Things fixed
Praise
Resolution
Commit
Build passes

 */
