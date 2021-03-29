const sample = require('./util/sample')
const linter = require('./behaviors/linter')
const cursor = require('./behaviors/cursor')
const active = require('./behaviors/active')
const furbies = require('./furbies')

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
      furbies.sampleEmotion('sleepy')
    }
    if (projectPath) {
      furbies.ciStatus(projectPath)
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

  // Expecting:
  /*
    {
      type: "change",
      line: "text of the whole line"
      change: "changed text range"
    }
  */
  if (notification.type === 'change') {
    if (notification.line.match(/^\s*(var|let|const)\s+$/)) {
      furbies.sampleAction([
        "oooh, pick a good one!",
        "let's name baby",
        "ooh, name for kah? (sing) Oooh"
      ])
    }
    if (notification.line.match(/(^\s*function|\(\))$/)) {
      furbies.sampleEmotion(['collab', 'smalltalk'])
    }

    if (notification.change.match(/^\s*s+\s*/)) {
      furbies.sampleAction([
        "mmm… s s s s"
      ])
    }
  }

  // Expecting:
  /*
    {
      type: "cursor",
      previous: {
        line: 0,
        character: 0
      }
      current: {
        line: 0,
        character: 0
      }
    }
  */
    if (notification.type === 'cursor') {
    cursor.update(notification.path, notification.previous, notification.current)
  }

  if (notification.type === 'open') {
    furbies.sampleEmotion('beginning')
  }

  if (notification.type === 'destroy') {
    furbies.cycleEmotion('goodbye')
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
