const sample = require('../util/sample')
const actions = require('../actions')

class Cursor {
  constructor() {
    this.paths = {}
  }

  update(path, oldPos, newPos) {
    let d = Math.random()

    // Only act 10% of the time
    if (d < 0.9) return

    if (newPos.row === oldPos.row - 1) {
      global.furbies.action(actions["ear point up, Up"].params)
    } else if (newPos.row === oldPos.row + 1) {
      global.furbies.action(actions["down"].params)
    } else if (newPos.column === oldPos.column - 1) {
      global.furbies.action(actions["left"].params)
    } else if (newPos.column === oldPos.column + 1) {
      global.furbies.action(actions["right"].params)
    }
  }
}
module.exports = new Cursor()
