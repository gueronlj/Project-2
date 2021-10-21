const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
   name: {type: String, required:true},
   date: {type: String, require:true},
   user: {type: String},
   guests: {type: Number, required:true},
   note: String,
   allergies: String,
   price: Number
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request
