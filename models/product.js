const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
   {
      name: String,
      description: String,
      img: String,
      price: Number,
      qty: Number,
      inCart: Boolean,
      cartQty: Number,
      group: String,
      owner: String
   }
)

const Product = mongoose.model('Product', productSchema)

module.exports = Product
