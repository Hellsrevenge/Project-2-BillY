'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Bills', [{
        id: 1,
        title: 'Carpool Violation',
        status: 1,
        amount: 320,
        paid: true,
        unpaid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 1
      },
      {
        title: 'Parking Violation',
        status: 0,
        amount: 1200,
        paid: false,
        unpaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 1
      },
      {
        title: 'Chicken Violation',
        status: 0,
        amount: 80,
        paid: false,
        unpaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 2
      },
      {
        title: 'Parking Murder',
        status: 0,
        amount: 100,
        paid: false,
        unpaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        categoryId: 3
      },
      {
        title: 'Road Rage',
        status: 2,
        amount: 1000,
        paid: false,
        unpaid: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        categoryId: 1
      },
      {
        title: 'Red light violation',
        status: 1,
        amount: 1090.12,
        paid: true,
        unpaid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        categoryId: 2
      },
      {
        title: 'Seat belt violation',
        status: 1,
        amount: 1000.66,
        paid: true,
        unpaid: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        categoryId: 1
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
