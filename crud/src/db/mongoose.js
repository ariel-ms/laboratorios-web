const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://m001-student:1234@cluster0-sjcub.mongodb.net/labweb7?retryWrites=true'

mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
