const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema(
   {
      owner: {type: String, unique: true},
      items: Array
   }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
