'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', 
    ["electronics",
      "jewelery",
      "men's clothing",
      "women's clothing"].map(item => {
      return {
        name: item,
        created_at: new Date(),
        updated_at: new Date()
      }
    }
    ), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};
