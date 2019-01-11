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
    db.Bills.findAll({}).then(function() {
      res.render("signup");
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
        payments: data.Payments
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
