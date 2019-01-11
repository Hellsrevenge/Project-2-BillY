var db = require("../models");
var passport = require("../config/passport");
var path = require("path");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  //load homepage
  // app.get("/", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/hello");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  // Load sign up page
  app.get("/signup", function(req, res) {
      res.render("signup");
  });

  //if user is authenticated, go to members page
  app.get("/members", isAuthenticated, function(req, res) {
    res.redirect("/hello");
  });

  // Load index model page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect(`/account/${req.user.id}`);
    }
    res.render("login");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.Users.create({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    }).then(function(data) {
      // console.log(data.id)
      res.json(data)
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });


    //login page
  app.post('/api/login',
    passport.authenticate('local'),
    function(req, res) {
      console.log("chicken")
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect(`/account/${req.user.id}`);
      res.json(req.user)
  });
  
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });



  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  // Load account up page
  app.get("/account/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Bills, db.Payments]
    }).then(function(data) {
      console.log(data);
      var hbsObject = {
        name: data.user_name,
        bills: data.Bills,
        payments: data.Payments,
        date: Date.now()
      };
      // // console.log(hbsObject);
      res.render("account", hbsObject);
    });
  });

  app.post("/account/:accountId/pay/:billId", function(req, res) {
    db.Bills.findById(req.params.billId).then(function(bill) {
      bill.unpaid = false;
      bill.paid = true;
      bill.save();
      db.Payments.create({
        status: 1,
        BillId: bill.id,
        amount: bill.amount,
        UserId: bill.UserId,
        transaction: Math.random().toString(36).substring(2)
      }).then(function(payment) {
        res.redirect("/account/" + payment.UserId);
      });
    });
  });

  // logout redirect
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
