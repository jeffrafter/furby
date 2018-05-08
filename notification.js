const fluffaction = require('./fluffaction')

const sample = (array) => {
  let index = Math.floor(Math.random() * array.length)
  return array[index]
}

const action = (furbies, values) => {
  let params = {
    input: values[0],
    index: values[1],
    subindex: values[2],
    specific: values[3]
  }
  console.log(`Sending action to all furbies: [${values.join(',')}]`)
  for (let uuid in furbies) {    
    fluffaction.execute(furbies[uuid], 'action', params, (error) => {
      if (error) {
        console.log(`[Error] ${error}`)
      }
    })
  }
}

module.exports = (furbies, params) => {
  console.log('*************************************')
  console.log(params)
  
  if (params.type === 'change') {  
    if (params.change.match(/^var/)) {
      action(furbies, sample([
        [35, 0, 0, 0],
        [39, 3, 4, 0]
      ]))
    }
  }
}