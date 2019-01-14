var passport = require("../config/passport");

module.exports = function(app) {

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

};
