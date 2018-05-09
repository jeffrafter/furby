const actions = require('../actions')

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
    global.furbies.sampleAction(this.choices)
  }
}
module.exports = new Active()
