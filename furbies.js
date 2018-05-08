const fluffaction = require('./fluffaction')

class Furbies {
  constructor(){
    this.connections = {}
    this.selected = null
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

  action(values) {
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
