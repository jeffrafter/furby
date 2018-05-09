const sample = require('../util/sample')

class Cursor {
  constructor() {
    this.paths = {}
  }

  update(path, oldPos, newPos) {
    let d = Math.random()

    // Only act 3% of the time
    if (d < 0.97) return

    if (newPos.row === oldPos.row - 1) {
      global.furbies.playAction("ear point up, Up")
    } else if (newPos.row === oldPos.row + 1) {
      global.furbies.playAction("down")
    } else if (newPos.column === oldPos.column - 1) {
      global.furbies.playAction("left")
    } else if (newPos.column === oldPos.column + 1) {
      global.furbies.playAction("right")
    }
  }
}
module.exports = new Cursor()
