'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{
        user_name: 'John Doe',
        password: "$2a$10$teXLz5E76.F7vIICoMmi4eDQawMddikhYMM6yUc2CxEgEKKIKu9o2",
        email: "da@da.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'Jane Doe',
        password: "$2a$10$teXLz5E76.F7vIICoMmi4eDQawMddikhYMM6yUc2CxEgEKKIKu9o2",
        email: "dad@dad.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'Jim Doe',
        password: "$2a$10$teXLz5E76.F7vIICoMmi4eDQawMddikhYMM6yUc2CxEgEKKIKu9o2",
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
