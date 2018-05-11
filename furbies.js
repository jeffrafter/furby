const sample = require('./util/sample')
const fluffaction = require('./fluffaction')
const actions = require('./actions')
const actionValues = Object.values(actions)
const { exec } = require('child_process');

const emotions = {}
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
    this.cycle = {}
    this.dlcActive = false
  }

  add(uuid, furby){
    this.connections[uuid] = furby
  }

  red() {
    this.command('antenna', {red: 255, green: 0, blue: 0})
  }

  orange() {
    this.command('antenna', {red: 255, green: 165, blue: 0})
  }

  green() {
    this.command('antenna', {red: 0, green: 255, blue: 0})
  }

  blue() {
    this.command('antenna', {red: 0, green: 0, blue: 255})
  }

  ping() {
    this.action(actions["giggle, fart oh, excueeze kah!"])
  }

  ciStatus(project) {
    let cmd = ['hub', `--git-dir=${project}/.git`, 'ci-status'].join(' ')
    console.log(cmd)
    exec(cmd, (err, stdout, stderr) => {
      console.log(stdout)
      if (stdout.match(/success/)) {
        this.green()
      } else if (stdout.match(/failure/)) {
        this.red()
      } else if (stdout.match(/pending/)) {
        this.orange()
      }
    })
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
    this.action(a)
    return a.name
  }

  test(v1, v2, v3, v4) {
    let params = {
      input: v1,
      index: v2,
      subindex: v3,
      specific: v4
    }
    this.command('action', params)
  }

  debug() {
    for (let uuid in global.furbies.connections) {
      if (this.selected == null || this.selected == uuid) {
        fluffaction.execute(global.furbies.connections[uuid], "debug", {}, (error) => {
          if (error) {
            console.log(`[Error] ${error}`)
          }
        })
      }
    }
  }

  deleteDlc() {
    for (let uuid in global.furbies.connections) {
      if (this.selected == null || this.selected == uuid) {
        fluffaction.execute(global.furbies.connections[uuid], "dlc_delete", {slot: 1}, (error) => {
          if (error) {
            console.log(`[Error] ${error}`)
          }
        })
      }
    }
  }

  flashDlc() {
    for (let uuid in global.furbies.connections) {
      if (this.selected == null || this.selected == uuid) {
        fluffaction.execute(global.furbies.connections[uuid], "flashdlc", {
          dlcfile: process.env.DLC_FILE,
          filename: "NEWDLC.DLC"
        }, (error) => {
          if (error) {
            console.log(`[Error] ${error}`)
          }
        })
      }
    }
  }

  loadDlc() {
    for (let uuid in global.furbies.connections) {
      if (this.selected == null || this.selected == uuid) {
        fluffaction.execute(global.furbies.connections[uuid], "dlc_load", {slot: 1}, (error) => {
          if (error) {
            console.log(`[Error] ${error}`)
            return
          }
        })
      }
    }
  }

  toggleDlc() {
    this.dlcActive = !this.dlcActive
    let command = this.dlcActive ? "dlc_activate" : "dlc_deactivate"
    for (let uuid in global.furbies.connections) {
      if (this.selected == null || this.selected == uuid) {
        fluffaction.execute(global.furbies.connections[uuid], command, {}, (error) => {
          if (error) {
            console.log(`[Error] ${error}`)
            return
          }
        })
      }
    }
  }

  // Sample from all actions in an emotional category. Plays the action.
  sampleEmotion(emotion) {
    let potentialActions = []
    if(emotion.constructor === Array) {
      emotion.forEach(e => {
        emotions[e].forEach(a => {
          potentialActions.push(a)
        })
      })
    } else {
      potentialActions = emotions[emotion]
    }

    this.action(sample(potentialActions))
  }

  cycleEmotion(emotion) {
    let i = this.cycle[emotion] || 0

    this.action(emotions[emotion][i])

    i +=1
    if (i > emotions[emotion].length - 1) {
      i = 0
    }
    this.cycle[emotion] = i
  }

  // Sample from a list of actions. Plays the action.
  sampleAction(array) {
    this.action(sample(array.map(e => actions[e])))
  }

  // Play an action by name
  playAction(name) {
    this.action(actions[name])
  }

  action(action) {
    console.log(action)
    let params = {
      input: action.params[0],
      index: action.params[1],
      subindex: action.params[2],
      specific: action.params[3]
    }
    this.command('action', params)

    if (Object.keys(global.furbies.connections).length === 0) {
      exec(`say "${action.name}"`, (err, stdout, stderr) => {
        console.log(stdout)
        console.log(stderr)
      })
    }
  }

  command(name, params){
    this.lastCommandAt = new Date()
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
