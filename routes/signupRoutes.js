var db = require("../models");

module.exports = function(app) {

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
            req.flash("error", error);
            res.redirect("/signup");
          });

        }).catch(function(err) {
          req.flash("error", err);
          res.redirect("/signup");
        });
      }
    });
  });

};
