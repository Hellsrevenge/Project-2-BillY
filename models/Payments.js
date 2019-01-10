'use strict';

var PAYMENT_STATUS = {
  0: "Failed",
  1: "Paid",
};

module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define('Payments', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return PAYMENT_STATUS[this.getDataValue("status")];
      }
    },
    amount: DataTypes.INTEGER,
    transaction: DataTypes.STRING
  }, {});
  Payments.associate = function(models) {
    Payments.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
    Payments.belongsTo(models.Bills, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Payments;
};
