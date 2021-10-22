# Project-2
##technology
-JQuery

##Issues
-Ideally everything would stem from the index at /lfs. After the 'store' routes were added, any pages requiring product data from the db had to stem from the /store route. ( /store is the new home page)

-When trying to display the currentUser after login, it appears as  [object Object]!

-the current "landing" div works as intended but needs to be renamed. Its doesn't do what it's name suggests.

------------------------------------------------------------------------
//Personal shopping cart must be unique to user.
//cart should be in db or the items  inside should be in db
//cart is an object. a new item goes into an array of objects. can have unique id based off username, maybe price total?


cart = {
   owner: username/id,
   items:[
      {id:1,
       price:10,
       cartQty: 1,
      },
      {id:2,
       price:11,
       cartQty: 1,
      },
      {id:3,
       price:20,
       cartQty: 1,
      },
   ],
   total: 100;
}

//cart.ejs should display unique cart object.

//a session can have the user and their cart
//cart needs a Schema?
-----------------------------------------------------------
//in the login route
   -User.findOne
      check for match
         check password.
         if good, set session.currentUser to the username.
   -Cart.create(feed in username/id and default values)
--------------------------------------------------------
//put route for Add To Cart button
   -reduce quantity from Database
   -if not in cart, add to cart object(push req.body to cart.items array)
      if in the cart, increase the qty.
