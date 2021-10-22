const express = require('express')
const store = express.Router()
const Product = require('../models/product.js')
const products = require('../models/storeSeed.js')

//xxxxxxxxxxxxxxxxxxxxxxxxxxxSEED
// store.get('/seed', (req, res) => {
//    Product.create(
//       products, (error, seed) => {
//          console.log(seed);
//          res.redirect('/lfs')
//       }
//    )
// })

//-------------------remove from cart
store.put('/removeCart/:id', (req, res) => {
   Product.findByIdAndUpdate(req.params.id, {cartQty:0}, (error, updatedItem) => {//reset ammount in cart console.log('changed cart qty');
   })
   Product.findByIdAndUpdate(req.params.id, {$inc:{qty:1}}, (error, updatedEntry) => {//TODO: make qty increase by ammount removed from cart.
      res.redirect('/store/cart')
   })
   Product.findByIdAndUpdate(req.params.id, {owner:''}, (error, updatedItem) => {//remove ownership console.log('changed cart qty');
   })
})

//---------------------------add to cart

// store.post('/buy/:id', (req, res) => {
//    // Product.find({owner:req.session.currentUser}, (error, data) => {
//    //    res.render('viewCart.ejs', {
//    //       products: data,
//    //       currentUser: req.session.currentUser
//    //    })
//    // })
//    Product.create(
//       {
//          /// what do i put here????
//       }, (error, addedProduct) => {
//       res.redirect('/store')
//    })
// })

store.put('/buy/:id', (req, res) => {
   // Product.findByIdAndUpdate(req.params.id, {inCart:true}, (error, updatedProduct) => { console.log('changed cart status');
   // })
   Product.findByIdAndUpdate(req.params.id, {$inc:{cartQty:1}}, (error, updatedProduct) => { console.log('changed cart status');
   })
   Product.findByIdAndUpdate(req.params.id, {$inc:{qty:-1}}, (error, updatedProduct) => {
      res.redirect('/store')
   });
   Product.findByIdAndUpdate(req.params.id, {owner:req.session.currentUser}, (error, updatedProduct) => { console.log('changed owner');
   })
})
//------------------view cart---------
store.get('/cart', (req, res) => {
   Product.find({owner:req.session.currentUser}, (error, data) => {
      res.render('viewCart.ejs', {
         products: data,
         currentUser: req.session.currentUser
      })
   })
})
//--------------------show specific
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
