'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Payments', [{
        status: 1,
        amount: 320,
        BillId: 1,
        UserId: 1,
        transaction: "9a8bc2gsd89d",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
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
