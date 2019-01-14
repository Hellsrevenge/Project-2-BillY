var db = require("../models");
var passport = require("../config/passport");
var path = require("path");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  // Authentication

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect(`/account/${req.user.id}`);
    }
    res.render("login");
  });

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.redirect("/account");
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Account

  app.get("/account", isAuthenticated, function(req, res) {
    db.Users.findOne({
      where: {
        id: req.user.id
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

  app.post("/account/pay/:billId", function(req, res) {
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
        res.redirect("/account");
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
