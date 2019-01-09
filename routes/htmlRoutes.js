var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Bills.findAll({}).then(function(bills) {
      res.render("index", {
        msg: "Welcome!",
        examples: bills
      });
    });
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
    db.Example.findAll({}).then(function() {
      res.render("signup");
    });
  });

  // Load account up page
  app.get("/account", function(req, res) {
    db.Example.findAll({}).then(function() {
      res.render("account");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
