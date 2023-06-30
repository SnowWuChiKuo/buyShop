const { Product, Category } = require('../models')

const productController = {
  getProducts: (req, res) => {
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
  },
  getProduct: (req , res, next) => {
    return Product.findByPk(req.params.id, {
      include: Category
    })
      .then(product => {
        if (!product) throw new Error("產品未創建!")
        console.log(product)
        product.increment('viewCounts')
        res.render('product', { product: product.toJSON() })
      })
      .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    return Product.findByPk(req.params.id, {
      include: Category,
      nest: true,
      raw: true
    })
      .then(product => {
        if (!product) throw new Error("產品未創建!")
        res.render('dashboard', { product })
      })
      .catch(err => next(err))
  }
}

module.exports = productController