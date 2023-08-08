'use strict'
const faker = require('faker')

module.exports = {
  up: async(queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM Products;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Comments',
      Array.from({ length: 150 }, () => ({
        text: faker.lorem.sentence(),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        product_id: products[Math.floor(Math.random() * products.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', {})
  }
};
