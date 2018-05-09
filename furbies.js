const sample = require('./util/sample')
const fluffaction = require('./fluffaction')
const actions = require('./actions')
const actionValues = Object.values(actions)

emotions = {}
actionValues.forEach(a => {
  (a.emotions || "").split(',').forEach(e => {
    emotions[e] = emotions[e] || []
    emotions[e].push(a)
  })
})

class Furbies {
  constructor(){
    this.connections = {}
    this.selected = null
    this.lastCommandAt = null
    this.paused = false
    this.index = -1
  }

  add(uuid, furby){
    this.connections[uuid] = furby
  }

  red() {
    this.command('antenna', {red: 255, green: 0, blue: 0})
  }

  green() {
    this.command('antenna', {red: 0, green: 255, blue: 0})
  }

  blue() {
    this.command('antenna', {red: 0, green: 0, blue: 255})
  }

  ping() {
    this.action([2, 0, 1, 4])
  }

  toggle() {
    this.paused = !this.paused
  }

  prev() {
    this.index -= 1
    if (this.index < 0) this.index = actionValues.length - 1
    return this.play()
  }

  next() {
    this.index += 1
    if (this.index > actionValues.length - 1) this.index = 0
    return this.play()
  }

  play() {
    let a = actionValues[this.index]
    this.action(a.params)
    return a.name
  }

  sampleEmotion(emotion) {
    this.action(sample(
      emotions[emotion].map(e => e.params)
    ))
  }

  sampleAction(array) {
    this.action(sample(
      array.map(e => actions[e].params)
    ))
  }

  action(values) {
    console.log(values)
    let params = {
      input: values[0],
      index: values[1],
      subindex: values[2],
      specific: values[3]
    }
    this.command('action', params)
  }

  command(name, params){
    console.log(`Sending ${name} to ${Object.keys(global.furbies.connections).length} furbies`)
    if (this.paused) return
    for (let uuid in global.furbies.connections) {
      if (this.selected == null || this.selected == uuid) {
        fluffaction.execute(global.furbies.connections[uuid], name, params, (error) => {
          if (error) {
            console.log(`[Error] ${error}`)
          }
        })
      }
    }
  }
}

module.exports = Furbies
