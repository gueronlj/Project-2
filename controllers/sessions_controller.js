const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

//------------------login page
sessions.get('/login', (req, res) => {
   res.render('login.ejs', {currentUser: req.session.currentUser}) //show login page and set the session user to the user that logged in.
})

//------------------On login attempt
sessions.post('/login', (req, res) => {
   User.findOne({username: req.body.username}, (error, foundUser) => {//look in DB for a username that matches one from the form.
      if (error){
         console.log(error);
         res.send('There was an error retrieving data from the database.')
      } else if (!foundUser) {// maybe no error but maybe no matching username too.
         res.send(`Username was not found. <a href="/sessions/login">Back</a>`)//make link to go back if nothing found.
      } else { //only other option is that usernames matched.
         if(bcrypt.compareSync(req.body.password, foundUser.password)){//check if password matched.
            req.session.currentUser = foundUser//pw match so sync cookie username with foundUser
            console.log('login successful');
            res.redirect('/lfs')
         } else {
            res.send('Invalid password. <a href="/sessions/login">Back</a>')
         }
      }
   })
})

//--------------------log out
sessions.delete('/logout', (req, res) => {
   req.session.destroy(() => {
      res.redirect('/lfs')
      console.log('logout successful');
   })
})

module.exports = sessions
