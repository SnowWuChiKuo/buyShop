const productServices = require('../../service/product-services')

const productController = {
  getProducts: (req, res, next) => {
    productServices.getProducts(req, (err, data) => err ? next(err) : res.render('products', data))    
  },
  getProduct: (req , res, next) => {
    productServices.getProduct(req, (err, data) => err ? next(err) : res.render('product', data))
  },
  getDashboard: (req, res, next) => {
    productServices.getDashboard(req, (err, data) => err ? next(err) : res.render('dashboard', data))
  },
  getFeeds: (req, res, next) => {
    productServices.getFeeds(req, (err, data) => err ? next(err) : res.render('feeds', data))
  },
  getTopProducts: (req, res, next) => {
    productServices.getTopProducts(req, (err, data) => err ? next(err) : res.render('top-products', data))
  }
}

module.exports = productController