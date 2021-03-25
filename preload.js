// Preload (Isolated World)
const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.on('furby-connected', (_, uuid) => {
  console.log("FURBY CONNECTED")
  furbiesList = document.getElementById("furbies")

  var container = document.createElement("div")
  container.classList.add("furby")
  container.id = uuid

  var uuidSpan = document.createElement("span")
  uuidSpan.classList.add("uid")
  uuidSpan.innerHTML = uuid

  var pairButton = document.createElement("button")
  pairButton.classList.add("button")
  pairButton.innerHTML = "Pair"
  pairButton.onclick = function onPairClick() {
    uuid = this.parentNode.id
    window.electron.pair(uuid)
  }

  var unpairButton = document.createElement("button")
  unpairButton.classList.add("button")
  unpairButton.innerHTML = "Unpair"
  unpairButton.onclick = function onUnpairClick() {
    uuid = this.parentNode.id
    window.electron.unpair(uuid)
  }
  unpairButton.style.display = "none"

  container.appendChild(uuidSpan);
  container.appendChild(pairButton);
  container.appendChild(unpairButton);
  furbiesList.appendChild(container);
})

contextBridge.exposeInMainWorld(
  'electron',
  {
    red: () => ipcRenderer.invoke('red'),
    green: () => ipcRenderer.invoke('green'),
    blue: () => ipcRenderer.invoke('blue'),
    ping: () => ipcRenderer.invoke('ping'),
    toggle: () => ipcRenderer.invoke('toggle'),
    play: () => ipcRenderer.invoke('play'),
    debug: () => ipcRenderer.invoke('debug'),
    prev: async () => {
      var action = await ipcRenderer.invoke('prev')
      var el = document.getElementById("action")
      el.innerHTML = action
    },
    next: async () => {
      var action = await ipcRenderer.invoke('next')
      var el = document.getElementById("action")
      el.innerHTML = action
    },
    deleteDlc: () => ipcRenderer.invoke('deleteDlc'),
    flashDlc: () => ipcRenderer.invoke('flashDlc'),
    loadDlc: () => ipcRenderer.invoke('loadDlc'),
    toggleDlc: () => ipcRenderer.invoke('toggleDlc'),
    test: () => {
      ipcRenderer.invoke('test',
        parseInt(document.getElementById("action1").value),
        parseInt(document.getElementById("action2").value),
        parseInt(document.getElementById("action3").value),
        parseInt(document.getElementById("action4").value),
      )
    },
    pair: (uuid) => ipcRenderer.invoke("pair", uuid),
    unpair: (uuid) => ipcRenderer.invoke("unpair", uuid)
  }
)