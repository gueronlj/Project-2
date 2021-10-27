const express = require('express')
const store = express.Router()
const Product = require('../models/product.js')
const products = require('../models/storeSeed.js')
const Cart = require('../models/cart.js')

//xxxxxxxxxxxxxxxxxxxxxxxxxxxSEED
// store.get('/seed', (req, res) => {
//    Product.create(
//       products, (error, seed) => {
//          console.log(seed);
//          res.redirect('/lfs')
//       }
//    )
// })

//---------(OLD)--remove from cart
// store.put('/removeCart/:id', (req, res) => {
//    Product.findByIdAndUpdate(req.params.id, {cartQty:0}, (error, updatedItem) => {//reset ammount in cart console.log('changed cart qty');
//    })
//    Product.findByIdAndUpdate(req.params.id, {$inc:{qty:1}}, (error, updatedEntry) => {//TODO: make qty increase by ammount removed from cart.
//       res.redirect('/store/cart')
//    })
//    Product.findByIdAndUpdate(req.params.id, {owner:''}, (error, updatedItem) => {//remove ownership console.log('changed cart qty');
//    })
// })

//--------------(OLD)-Add to cart
// store.put('/buy/:id', (req, res) => {
//    // Product.findByIdAndUpdate(req.params.id, {inCart:true}, (error, updatedProduct) => { console.log('changed cart status');
//    // })
//    Product.findByIdAndUpdate(req.params.id, {$inc:{cartQty:1}}, (error, updatedProduct) => { console.log('changed cart status');
//    })
//    Product.findByIdAndUpdate(req.params.id, {$inc:{qty:-1}}, (error, updatedProduct) => {
//       res.redirect('/store')
//    });
//    Product.findByIdAndUpdate(req.params.id, {owner:req.session.currentUser}, (error, updatedProduct) => { console.log('changed owner');
//    })
// })

//--------------(OLD)-view cart---------
// store.get('/cart', (req, res) => {
//    Product.find({owner:req.session.currentUser}, (error, data) => {
//       res.render('viewCart.ejs', {
//          products: data,
//          currentUser: req.session.currentUser
//       })
//    })
// })

//---------------remove from cart
store.put('/removeCart/:id', (req, res) => {
   Cart.find({owner:req.session.currentUser.username}, (error, foundCart) => {
      Product.findById(req.params.id, (error, foundProduct) => {
         const findIndex = () => {
            for (let i = 0; i < foundCart[0].items.length; i++){
               if(foundCart[0].items[i]._id == req.params.id){ //must be ==, does not work with ===
                  return i;
               }
            }
         }
         console.log(foundCart[0].items);
         // console.log(foundCart[0].items.indexOf(foundProduct));// HOW IS THIS -1?
         // const index = foundCart[0].items.indexOf(foundProduct)
         foundCart[0].items.splice(findIndex(), 1);
         // foundCart[0].items.splice(findIndex(), 1);
         // foundCart[0].items.pop();//ISSUE: always removes last item added.
         foundCart[0].save()
         // res.redirect('/store')//not showing updated cart
         res.render('viewCart.ejs',{
            products: foundCart[0].items,
            currentUser: req.session.currentUser
         })
      })
   })
})

//-------------------------add to cart
store.post('/buy/:id', (req, res) => {
   if (req.session.currentUser){//if logged in...
      Cart.find({owner:req.session.currentUser.username}, (error, foundCart) =>{//find the cart we want to update.
         Product.findById(req.params.id, (error, foundProduct) => {
            foundCart[0].items.push(foundProduct);//Issue: foundCart.items is 'undefined' **foundCart is an ARRAY**
            foundCart[0].save()
            res.redirect('/store')
         })
      })
   } else { //if not logged in, look for cart of dummy account.
      // Cart.find({owner:'guest'}, (error, foundCart) =>{//find the cart we want to update.
      //    Product.findById(req.params.id, (error, foundProduct) => {
      //       foundCart[0].items.push(foundProduct);//Issue: foundCart.items is 'undefined' **foundCart is an ARRAY**
      //       foundCart[0].save()
      //       res.redirect('/store')
      //    })
      // })
      res.redirect('/store')
   }

})

//-----------------view cart
store.get('/cart', (req, res) => {
   Cart.find({owner:req.session.currentUser.username}, (error, foundCart) => {
      res.render('viewCart.ejs', {
         products: foundCart[0].items,
         currentUser: req.session.currentUser
      })
   })
})

//------------------------show by category
store.get('/knives', (req, res) => {
    Product.find({group: 'knives'}, (error, data) => {
        res.render('store.ejs' ,{
            products:data,
            currentUser: req.session.currentUser
        })
    })
})

store.get('/books', (req, res) => {
    Product.find({group: 'books'}, (error, data) => {
        res.render('store.ejs' ,{
            products:data,
            currentUser: req.session.currentUser
        })
    })
})

store.get('/rice', (req, res) => {
    Product.find({group: 'rice'}, (error, data) => {
        res.render('store.ejs' ,{
            products:data,
            currentUser: req.session.currentUser
        })
    })
})

store.get('/food', (req, res) => {
    Product.find({group: 'food'}, (error, data) => {
        res.render('store.ejs' ,{
            products:data,
            currentUser: req.session.currentUser
        })
    })
})

store.get('/tools', (req, res) => {
    Product.find({group: 'tools'}, (error, data) => {
        res.render('store.ejs' ,{
            products:data,
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
