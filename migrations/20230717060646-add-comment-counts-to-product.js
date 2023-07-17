'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'comment_counts', {
      type: Sequelize.INTEGER,
      defaultValue: 0
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'comment_counts')
  }
};
