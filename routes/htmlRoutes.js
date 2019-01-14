var db = require("../models");
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  // Authentication

  app.get("/login", function(req, res) {
    if (req.user) {
      res.redirect("/account");
    } else {
      res.render("login", {
        error: req.flash("error"),
        info: req.flash("info")
      });
    }
  });

  app.post("/login",
    passport.authenticate("local", {
      successRedirect: "/account",
      failureRedirect: "/login",
      failureFlash: true
    })
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Registration

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/account");
    } else {
      res.render("signup", {
        error: req.flash("error"),
        info: req.flash("info")
      });
    }
  });

  app.post("/signup", function(req, res) {
    if (!req.body.user_name || !req.body.email || !req.body.password) {
      req.flash("error", "Missing credentials");
      res.redirect("/signup");
    }

    db.Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(dbUser) {
      if (dbUser) {
        req.flash("error", "User " + dbUser.email + " already exists");
        res.redirect("/signup");
      } else {
        db.Users.create({
          user_name: req.body.user_name,
          email: req.body.email,
          password: req.body.password
        }).then(function(user) {
          db.Bills.bulkCreate(
            db.Bills.getSeedBills(user)
          ).then(function(response) {
            req.flash("info", "Thank you for registration. You can login with your email and password.");
            res.redirect("/login");
          }).catch(function(error) {
            req.flash("error", error[0]);
            res.redirect("/signup");
          });
        }).catch(function(err) {
          req.flash("error", err);
          res.redirect("/signup");
        });
      }
    });
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
