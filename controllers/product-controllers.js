const { Product, Category } = require('../models')

const productController = {
  getProduct: (req, res) => {
    return Product.findAll({
      include: Category,
      nest: true,
      raw: true
    })
      .then(product => {
        const data = product.map(p => ({
          ...p,
          description: p.description.substring(0, 50)
        }))
        return res.render('products', {
          products: data
        })
      })
  }
}

module.exports = productController