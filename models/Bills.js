'use strict';
module.exports = (sequelize, DataTypes) => {
  var Bills = sequelize.define("Bills", {
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  });

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
