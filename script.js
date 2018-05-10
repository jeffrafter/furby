const { remote } = require('electron');
const { ipcRenderer } = require('electron');
const mainProcess = remote.require('./index.js');

// mainProcess.furbies will return the list of furbies.

ipcRenderer.on('furby-connected', (evt, msg) => addFurbyToUI(msg));

function red() {
  remote.getGlobal('furbies').red()
}

function green() {
  remote.getGlobal('furbies').green()
}

function blue() {
  remote.getGlobal('furbies').blue()
}

function ping() {
  remote.getGlobal('furbies').ping()
}

function toggle() {
  remote.getGlobal('furbies').toggle()
}

function prev() {
  var action = remote.getGlobal('furbies').prev()
  var el = document.getElementById("action")
  el.innerHTML = action
}

function next() {
  var action = remote.getGlobal('furbies').next()
  var el = document.getElementById("action")
  el.innerHTML = action
}

function play() {
  remote.getGlobal('furbies').play()
}

function debug() {
  remote.getGlobal('furbies').debug()
}

function deleteDlc() {
  remote.getGlobal('furbies').deleteDlc()
}

function flashDlc() {
  remote.getGlobal('furbies').flashDlc()
}

function loadDlc() {
  remote.getGlobal('furbies').loadDlc()
}

function toggleDlc() {
  remote.getGlobal('furbies').toggleDlc()
}

function test() {
  remote.getGlobal('furbies').test(
    parseInt(document.getElementById("action1").value),
    parseInt(document.getElementById("action2").value),
    parseInt(document.getElementById("action3").value),
    parseInt(document.getElementById("action4").value),
  )
}

function onPairClick(evt){
  uuid = this.parentNode.id
  ipcRenderer.send("pair", uuid)
}

function onUnpairClick(evt){
  uuid = this.parentNode.id
  ipcRenderer.send("unpair", uuid)
}

function addFurbyToUI(furby){
  furbiesList = document.getElementById("furbies")
  uuid = furby.uuid

  var container = document.createElement("div")
  container.classList.add("furby")
  container.id = uuid

  var uuidSpan = document.createElement("span")
  uuidSpan.classList.add("uid")
  uuidSpan.innerHTML = uuid

  var pairButton = document.createElement("button")
  pairButton.classList.add("button")
  pairButton.innerHTML = "Pair"
  pairButton.onclick = onPairClick

  var unpairButton = document.createElement("button")
  unpairButton.classList.add("button")
  unpairButton.innerHTML = "Unpair"
  unpairButton.onclick = onUnpairClick
  unpairButton.style.display = "none"

  container.appendChild(uuidSpan);
  container.appendChild(pairButton);
  container.appendChild(unpairButton);
  furbiesList.appendChild(container);
}
