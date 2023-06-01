'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', ['鞋子', '衣服', '帽子'].map(item => {
      return {
        name: item,
        created_at: new Date(),
        updated_at: new Date()
      }
    }
    ), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', {})
  }
};
