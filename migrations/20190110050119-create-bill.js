'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.INTEGER
      },
      paid: {
        type: Sequelize.BOOLEAN,
        // defaultStatus: false
      },
      unpaid: {
        type: Sequelize.BOOLEAN,
        // defaultStatus: false
      },
      dismissed: {
        type: Sequelize.BOOLEAN,
        // defaultStatus: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: { model: 'Categories', key: 'id' }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bills');
  }
};
