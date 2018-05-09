const sample = require('../util/sample')

class Cursor {
  constructor() {
    this.paths = {}
  }

  update(path, oldPos, newPos) {
    let now = new Date()
    let state = this.paths[path] || {}

    if (newPos.row === oldPos.row - 1) {
      state.up = state.up || 0
      state.up += 1
    } else if (newPos.row === oldPos.row + 1) {
      state.down = state.down || 0
      state.down += 1
    }

    if (state.lastUpdateAt && now - state.lastUpdateAt > 30000) {
      state.up = 0
      state.down = 0
    }

    if (state.up > 20) {
      state.up = 0
      this.maybePlayAction("ear point up, Up")
    }
    if (state.down > 20) {
      state.down = 0
      this.maybePlayAction("down")
    }

    state.lastUpdateAt = new Date()
    this.paths[path] = state
  }

  maybePlayAction(action) {
    // Only act 50% of the time
    if (Math.random() < 0.50) {
      global.furbies.playAction(action)
    }
  }
}

module.exports = new Cursor()
