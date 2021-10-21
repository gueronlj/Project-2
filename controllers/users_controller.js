const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

//---------------------------------signup page
users.get('/registration', (req, res) => {
   res.render('registration.ejs', { currentUser: req.session.currentUser })
})

// --------------------------------submit
users.post('/', (req, res) => {
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))//encrypt the password
   User.create(req.body, (error, newUser) => {
      if (error){
         res.send('Please try a different username or e-mail. <br><a href="/users/registration">Back</a>')
      } else{
         console.log('user added', newUser);
         res.redirect('/lfs')
      }
   })
})

module.exports = users
