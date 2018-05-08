const sample = (array) => {
  let index = Math.floor(Math.random() * array.length)
  return array[index]
}

/*
  - Test failed
  - Test passed
  - Started variable
  - Started function
  - Finished function
  - In complex function
  - In a method that doesn't have test coverage
  - Added a linter error
  - Fixed a linter error
  - In duplicated code
  - CI build status
  - Naming conventions (NLP)
  - JSHint (if Javascript)
*/
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
