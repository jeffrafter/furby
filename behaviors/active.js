const actions = require('../actions')
const furbies = require('../furbies')

class Active {
  constructor() {
    this.choices = [
      "Do",
      "Re",
      "Mi",
      "Fa",
      "Sol",
      "La",
      "Ti",
      "Do2"
    ]
  }

  update(path) {
    furbies.sampleAction(this.choices)
  }
}
module.exports = new Active()
