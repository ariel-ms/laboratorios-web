const x = require('./requests.js')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

readline.question(`Ingrese una ciudad: `, (ciudad) => {
    x.getCoords(ciudad.toLowerCase());
    readline.close()
})

