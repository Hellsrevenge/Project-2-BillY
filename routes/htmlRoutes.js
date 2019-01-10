var db = require("../models");
var passport = require("../config/passport");
var path = require("path");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.redirect("/hello");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.Users.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
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

  // Load index page
  app.get("/hello", function(req, res) {
    db.Bills.findAll({}).then(function(bills) {
      res.render("index", {
        msg: "Welcome!",
        examples: bills
      });
    });
  });

    //login page
  app.post('/api/login',
    passport.authenticate('local'),
    function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect("/account/:id");
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

  // Load sign up page
  app.get("/signup", function(req, res) {
    db.Bills.findAll({}).then(function() {
      res.render("signup");
    });
  });

  // Load account up page
  app.get("/account/:id", function(req, res) {
    db.Users.findOne({ 
      where: { 
        id: req.params.id 
      }, 
      include: [db.Bills,db.Payments] }).then(function(data) {
      console.log(data.Bills);
      var hbsObject = {
        name: data.user_name,
        bills: data.Bills,
        payments: data.Payments
      };
      // // console.log(hbsObject);
      res.render("account", hbsObject);
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
