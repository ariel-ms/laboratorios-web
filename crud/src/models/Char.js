const mongoose = require('mongoose')
const validator = require('validator')

const Char = mongoose.model('Char', {
  name: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false,
  },
  born: {
    type: String,
    required: false
  },
  timeline: {
    type: String,
    required: false
  },
  alliegance: {
    type: [String],
    require: false
  },
  playedBy: {
    type: String,
    required: false
  },
  titles: {
    type: [String],
    required: false
  }, 
  father: {
    type: String,
    required: false
  },
  mother: {
    type: String,
    required: false
  },
  spouse: {
    type: String,
    required: false
  }
})

module.exports = Char

