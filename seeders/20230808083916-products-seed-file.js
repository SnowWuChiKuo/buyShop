'use strict';
const url = "https://fakestoreapi.com/products"


module.exports = {
  up: async(queryInterface, Sequelize) => {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    let response = await fetch(url)
    let data = await response.json()

    const products = []
    for (let i = 0; i < 10; i++){
      products.push({
        name: data.title,
        price: data.price,
        description: data.description,
        image: data.image,
        created_at: new Date(),
        updated_at: new Date(),
        category_id: categories[Math.floor(Math.random()* categories.length)].id
      })
    }

    await queryInterface.bulkInsert('Products', products, {})
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
