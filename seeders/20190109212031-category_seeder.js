"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        id: 1,
        name: "traffic tickets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "medical bills",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "other fines",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
