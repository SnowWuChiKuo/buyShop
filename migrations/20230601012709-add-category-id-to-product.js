'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'category_id')
  }
};
