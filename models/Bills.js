'use strict';

var BILL_STATUS = {
  0: "Unpaid",
  1: "Paid",
  2: "Dismissed"
};

module.exports = (sequelize, DataTypes) => {
  var Bills = sequelize.define("Bills", {
    title: DataTypes.STRING,
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return BILL_STATUS[this.getDataValue("status")];
      }
    },
    amount: DataTypes.INTEGER,
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    unpaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    dismissed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATE,
      // defaultValue: false
    }

  });

  Bills.prototype.isDue = function () {
    return this.getDataValue("dueDate") < Date.now();
  };

  Bills.getSeedBills = function(user) {
    return [{
      title: "Carpool Violation",
      status: 0,
      amount: 320,
      paid: false,
      unpaid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days
      UserId: user.id,
      CategoryId: 1
    },
    {
      title: "Parking Violation",
      status: 0,
      amount: 1200,
      paid: false,
      unpaid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
      UserId: user.id,
      CategoryId: 1
    },
    {
      title: "Chicken Violation",
      status: 0,
      amount: 80,
      paid: false,
      unpaid: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      dueDate: new Date(new Date().getTime() - (15 * 24 * 60 * 60 * 1000)),
      UserId: user.id,
      CategoryId: 2
    }];
  };

  Bills.associate = function(models) {
    // We're saying that a Bills should belong to an Author
    // A Bills can't be created without an Author due to the foreign key constraint
    Bills.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
    Bills.belongsTo(models.Categories, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bills;
};
