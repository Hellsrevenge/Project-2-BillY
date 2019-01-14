var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/account", isAuthenticated, function(req, res) {
    db.Users.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Bills, db.Payments]
    }).then(function(data) {
      var hbsObject = {
        name: data.user_name,
        bills: data.Bills,
        payments: data.Payments,
        date: Date.now()
      };
      res.render("account", hbsObject);
    });
  });

  app.post("/account/pay/:billId", isAuthenticated, function(req, res) {
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


  app.get("/addbill", isAuthenticated, function(req, res) {
    res.render("addbill");
  });

  app.post("/addbill", isAuthenticated, function(req, res) {
    db.Bills.create(req.body).then(function(bill) {
      bill.UserId = req.user.id;
      bill.CategoryId = 1;
      bill.save();
      res.redirect("/account");
    });
  });
};
