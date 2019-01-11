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
        dueDate: new Date(new Date().getTime()+10*24*60*60*1000), // 10 days
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
        dueDate: new Date(new Date().getTime()+9*24*60*60*1000),
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
        dueDate: new Date(new Date().getTime()-(15*24*60*60*1000)),
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
        dueDate: new Date(new Date().getTime()+8*24*60*60*1000),
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
        dueDate: new Date(new Date().getTime()+20*24*60*60*1000),
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
        dueDate: new Date(new Date().getTime()+13*24*60*60*1000),
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
        dueDate: new Date(new Date().getTime()+18*24*60*60*1000),
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
