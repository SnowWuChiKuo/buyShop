const { Product } = require('../models')

const adminController = {
  getProducts: (req, res, next) => {
    Product.findAll({ raw: true })
      .then(products => res.render('admin/products', { products }))
      .catch(err => next(err))
  },
  createProduct: (req, res) => {
    return res.render('admin/create-product')
  },
  postProduct: (req, res, next) => {
    const { name, price, description, image } = req.body

    if (!name) throw new Error('產品名稱不可空白!')
    
    Product.create({
      name,
      price,
      description,
      image
    })
    .then(() => {
      req.flash('success_messages', '產品創建成功!')
      res.redirect('/admin/products')
    })
    .catch(err => next(err))
  },
  getProduct: (req, res, next) => {
    Product.findByPk(req.params.id, { raw: true })

      .then(product => {
        if (!product) throw new Error('找不到此產品!')
        res.render('admin/product', { product })
      })
      .catch(err => next(err))
  }
}

module.exports = adminController