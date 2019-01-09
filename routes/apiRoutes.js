var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/bills", function(req, res) {
    db.Bills.findAll({}).then(function(bills) {
      res.json(bills);
    });
  });

  // Create a new example
  app.post("/api/bills", function(req, res) {
    db.Bills.create(req.body).then(function(bill) {
      res.json(bill);
    });
  });

  // Delete an example by id
  app.delete("/api/bills/:id", function(req, res) {
    db.Bills.destroy({ where: { id: req.params.id } }).then(function(bill) {
      res.json(bill);
    });
  });
};
