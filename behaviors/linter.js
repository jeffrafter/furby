const sample = require('../util/sample')
const actions = require('../actions')

class Linter {
  constructor() {
    this.problems = {}
  }

  update(path, added, removed) {
    this.problems[path] = this.problems[path] || 0
    let prev = this.problems[path]
    this.problems[path] += added
    this.problems[path] -= removed
    if (this.problems[path] < 0) this.problems[path] = 0

    if (prev === 0 && this.problems[path] > 0) {
      // You added the first problem
      this.problem()
    } else if (prev > 0 && this.problems[path] === 0) {
      // You fixed everything
      this.fixed()
    }
  }

  fixed() {
    global.furbies.sampleEmotion("praise")
  }

  problem() {
    global.furbies.sampleEmotion("disappointment")
  }
}

module.exports = new Linter()
