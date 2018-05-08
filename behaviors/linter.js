const sample = require('../util/sample')

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
    global.furbies.action(sample([
      [41, 0, 1, 0],
      [42, 1, 0, 3]
    ]))
  }

  problem() {
    global.furbies.action(sample([
      [8, 1, 0, 2],
      [8, 1, 0, 3],
      [8, 1, 0, 4]
    ]))
  }
}

module.exports = new Linter()
