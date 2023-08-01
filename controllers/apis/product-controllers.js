const productServices = require('../../service/product-services')

const productController = {
  getProducts: (req, res, next) => {
    productServices.getProducts(req, (err, data) => err ? next(err) : res.json(data))
  },
  getProduct: (req , res, next) => {
    productServices.getProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  getDashboard: (req, res, next) => {
    productServices.getDashboard(req, (err, data) => err ? next(err) : res.json(data))
  },
  getFeeds: (req, res, next) => {
    productServices.getFeeds(req, (err, data) => err ? next(err) : res.json(data))
  },
  getTopProducts: (req, res, next) => {
    productServices.getTopProducts(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = productController