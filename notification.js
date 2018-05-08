const sample = require('./util/sample')
const linter = require('./behaviors/linter')
const cursor = require('./behaviors/cursor')
const actions = require('./actions')

let path = null

module.exports = (notification) => {
  let now = new Date()

  console.log('*************************************')
  console.log(notification)

  if (notification.type === 'active') {
    path = notification.path
  }

  if (notification.type === 'change') {
    path = notification.path
    if (notification.change.match(/^var/)) {
      global.furbies.action(sample([
        [35, 0, 0, 0],
        [39, 3, 4, 0]
      ]))
    }

    if (notification.change.match(/^\s*s+\s*/)) {
      global.furbies.action(sample([
        [1, 2, 0, 6] // s s s s
      ]))
    }
  }

  if (notification.type === 'cursor') {
    cursor.update(notification.path, notification.old, notification.new)
  }

  if (notification.type === 'open') {
    global.furbies.action(sample([
      [42, 0, 4, 4],
      [43, 0, 9, 2]
    ]))
  }

  if (notification.type === 'linter') {
    linter.update(path, notification.added.length, notification.removed.length)
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
