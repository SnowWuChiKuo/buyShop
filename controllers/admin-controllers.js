const { Product } = require('../models')

const adminController = {
  getProducts: (req, res, next) => {
    Product.findAll({ raw: true })
      .then(products => res.render('admin/products', { products }))
      .catch(err => next(err))
  }
}

module.exports = adminController