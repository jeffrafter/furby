const sample = (array) => {
  let index = Math.floor(Math.random() * array.length)
  return array[index]
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

module.exports = (notification) => {
  console.log('*************************************')
  console.log(notification)

  if (notification.type === 'change') {
    if (notification.change.match(/^var/)) {
      global.furbies.action(sample([
        [35, 0, 0, 0],
        [39, 3, 4, 0]
      ]))
    }
  }

  if (notification.type === 'open') {
    global.furbies.action(sample([
      [42, 0, 4, 4],
      [43, 0, 9, 2]
    ]))
  }

  if (notification.type === 'linter') {
    if (notification.added.length > 0) {
      // There is a problem
      global.furbies.action(sample([
        [8, 1, 0, 2],
        [8, 1, 0, 3],
        [8, 1, 0, 4]
      ]))
    } else if (notification.removed.length > 0) {
      // You fixed it
      global.furbies.action(sample([
        [41, 0, 1, 0],
        [42, 1, 0, 3]
      ]))
    }
  }
}
