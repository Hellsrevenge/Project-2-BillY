'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Bills', [{
        title: 'Parking Violation',
        status: 0,
        amount: 1200,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 1
      },
      {
        title: 'Chicken Violation',
        status: 1,
        amount: 80,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 2
      },
      {
        title: 'Parking Murder',
        status: 0,
        amount: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 3
      }]);
    
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
