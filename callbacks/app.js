const x = require('./requests.js')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

readline.question(`Ingrese una ciudad: `, (ciudad) => {
    x.getCoords(ciudad.toLowerCase(), function(err, data) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      x.getForecast(data, function(err, message) {
        if (err) {
          console.log(err)
          process.exit(1)
        }
        console.log(message)
      })
    });
    readline.close()
})

