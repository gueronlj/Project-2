const express = require('express')
const lfs = express.Router()
const Request = require('../models/request.js')

module.exports = lfs

// const isAuthenticated = (req, res, next) => {
//    if(req.session.currentUser){
//       return next()
//    } else {
//       res.redirect('/sessions/new')
//    }
// }
//----------------------------remove reservation------------------
lfs.delete('/request/:id', (req, res) => {
   Request.findByIdAndRemove(req.params.id, (error, foundRequest) => {
      res.redirect('/lfs')
   })
})

//----------------------------edit reservation----------------------------
lfs.put('/request/:id', (req, res) => {
   Request.findByIdAndUpdate(req.params.id, req.body,
      (error, updated) => {
         res.redirect('/lfs')
   })
})

lfs.get('/request/edit/:id', (req, res) => {
   Request.findById(req.params.id, (error, foundRequest) => {
      res.render('edit.ejs', {
         request:foundRequest,
      })
   })
})
//---------------------show details----------------------
lfs.get('/request/:id', (req, res) => {
   Request.findById(req.params.id, (error, foundRequest) => {
      res.render('menu.ejs', {
         request: foundRequest,
         currentUser: req.session.currentUser
      })
   })
})

//-----------------------make reservation---------------------------
lfs.post('/', (req, res) => {
   Request.create(req.body, (error, newRequest) => {
      res.redirect('/lfs')
   })
})

lfs.get('/request', (req, res) => {
   res.render('request.ejs', { currentUser: req.session.currentUser })
})

//------------------------seed-----------------------------
lfs.get('/seed', (req, res) => {
   Request.create(
      [
         {
            name: 'Jane Smith',
            date: '12/12/12',
            time: '9pm',
            user: 'UserName',
            guests: 25,
            note: 'No shoes in the house, Park on the street',
            allergies: 'nuts, cucumber'
         }
      ], (error, data) => {
         res.redirect('/lfs')
         }
   )
})

//---------------------------index--------------------------
lfs.get('/', (req, res) => {
   Request.find({}, (error, data) => {
      res.render('index.ejs', {
         requests: data,
         currentUser: req.session.currentUser
      })
   })
})
