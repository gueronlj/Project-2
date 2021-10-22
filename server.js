//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const session = require('express-session')

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));
//controllers
const mainController = require('./controllers/main_controller.js')
const usersController = require('./controllers/users_controller.js')
const sessionsController = require('./controllers/sessions_controller.js')
const storeController = require('./controllers/store_controller.js')

//___________________
//Middleware
//___________________
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use('/lfs', mainController)
app.use('/users', usersController)
app.use('/sessions', sessionsController)
app.use('/store', storeController)
//___________________
// Routes
//___________________

//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/lfs')
});
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
