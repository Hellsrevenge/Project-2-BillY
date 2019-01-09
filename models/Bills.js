// var Sequelize=require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Bills = sequelize.define("Bills", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return Bills;
};
