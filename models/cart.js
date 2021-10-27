const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('../models/product.js')

const cartSchema = new Schema(
   {
      owner: {type: String, unique: true},
      items: [Product.schema]
   }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
