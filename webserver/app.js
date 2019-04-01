const path = require('path')
const express = require('express')
const x = require('./requests.js')

const app = express()

const port = 3000

const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('/weather', function(req, res) {
  // if (!req.query.search){
  //   return res.send({
  //     error: 'Tienes que escribir en ciudad en el url.'
  //   })
  // }
  x.getCoords(req.query.search.toLowerCase(), function(err, coords) {
    if (err) {
      console.log(err)
      process.exit(1)
    }
    x.getForecast(coords, req.query.search, function(err, message) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      console.log(message)
    })
  });
})

app.get('*', function(req, res) {
  res.send({
    error: 'Esta ruta no existe'
  })
})

app.listen(port, function(){
  console.log('up and running')
})
