"use strict";
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  });

  Users.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Users.hasMany(models.Bills, {
      onDelete: "cascade"
    });
  };
  return Users;
};
