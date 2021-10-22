const express = require('express')
const store = express.Router()
const Product = require('../models/product.js')
const products = require('../models/storeSeed.js')

//---------------seed
// store.get('/seed', (req, res) => {
//    Product.create(
//       products, (error, seed) => {
//          console.log(seed);
//          res.redirect('/lfs')
//       }
//    )
// })

//------------------show specific
store.get('/details/:id', (req, res) => {
   Product.findById(req.params.id, (error, data) => {
      res.render('productShow.ejs', {
         product: data,
         currentUser: req.session.currentUser
      })
   })
})


//------------------show all
store.get('/', (req, res) => {
   Product.find({}, (error, data) => {
      res.render('store.ejs', {
         products: data,
         currentUser: req.session.currentUser
      })
   })
})


module.exports = store
