##Goals
-The main 'call to action' should have the user hire a chef for an event, or access resources to help make sushi their self.

-Users need to register to make a reservation and should be able to edit or cancel their reservations

-Users should have a unique shopping cart that saves in between sessions.

-The store should have filters or a search to make items easy to find.

##Components
-The sliding menu was done with JQuery, in a file called script.js

##Issues
-The 'main_controllers' are miss-named because they are no longer the main function of the site.

-The store side menu goes away after a category is selected. This could be fixed by always keeping the menu active but I like the sliding animation too much to let it go.

-The current "landing" div works as intended but needs to be renamed. It doesn't do what the name suggests.

-After the cart system was 'upgraded' a user that's not logged in would get an internal server error when trying to add an item to the cart. To get around this, check if there is a user logged in before adding the item. Ideally there should be a visual que that the user needs to login.

-There can be duplicate items in the cart and they can be removed separately. This is ok but ideally we would check if an item is already in the cart and just increase the cartQty if so.
------------------------------------------------------------------------
##Cart Notes
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
   total: x;
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
   -if not in cart, add to cart object(push item to cart.items array)
      if in the cart, increase the qty.
