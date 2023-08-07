const productServices = require('../../service/product-services')

const productController = {
  getProducts: (req, res, next) => {
    productServices.getProducts(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getProduct: (req , res, next) => {
    productServices.getProduct(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getDashboard: (req, res, next) => {
    productServices.getDashboard(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getFeeds: (req, res, next) => {
    productServices.getFeeds(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getTopProducts: (req, res, next) => {
    productServices.getTopProducts(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = productController