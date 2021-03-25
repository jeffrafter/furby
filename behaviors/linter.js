const sample = require('../util/sample')
const actions = require('../actions')
const furbies = require('../furbies')

class Linter {
  constructor() {
    this.problems = {}
  }

  update(path, count) {
    this.problems[path] = this.problems[path] || 0
    let prev = this.problems[path]
    this.problems[path] = count
    if (this.problems[path] < 0) this.problems[path] = 0

    console.log("Problems: " + this.problems[path])

    if (prev === 0 && this.problems[path] > 0) {
      // You added the first problem
      this.problem()
    } else if (prev > 0 && this.problems[path] === 0) {
      // You fixed everything
      this.fixed()
    }
  }

  fixed() {
    furbies.sampleEmotion("praise")
  }

  problem() {
    furbies.sampleEmotion("disappointment")
  }
}

module.exports = new Linter()
