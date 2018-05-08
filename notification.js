const sample = (array) => {
  let index = Math.floor(Math.random() * array.length)
  return array[index]
}

module.exports = (params) => {
  console.log('*************************************')
  console.log(params)

  if (params.type === 'change') {
    if (params.change.match(/^var/)) {
      global.furbies.action(sample([
        [35, 0, 0, 0],
        [39, 3, 4, 0]
      ]))
    }
  }
}
