'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{
        user_name: 'John Doe',
        password: "12345",
        email: "da@da.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'Jane Doe',
        password: "12345",
        email: "dad@dad.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'Jim Doe',
        password: "12345",
        email: "dab@dab.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    
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