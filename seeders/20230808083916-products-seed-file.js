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
    for (let i = 0; i < 20; i++){
      products.push({
        name: data[i].title,
        price: data[i].price,
        description: data[i].description,
        image: data[i].image,
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
