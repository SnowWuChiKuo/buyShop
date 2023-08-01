const adminServices = require('../../service/admin-services')


const adminController = {
  getProducts: (req, res, next) => {
    adminServices.getProducts(req, (err, data) => err ? next(err) : res.json(data))
  },
  createProduct: (req, res, next) => {
    adminServices.createProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  postProduct: (req, res, next) => {
    adminServices.postProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  getProduct: (req, res, next) => {
    adminServices.getProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  editProduct: (req, res, next) => {
    adminServices.editProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  putProduct: (req, res, next) => {
    adminServices.putProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  deleteProduct: (req, res, next) => {
    adminServices.deleteProduct(req, (err, data) => err ? next(err) : res.json(data))
  },
  getUsers: (req, res, next) => {
    adminServices.getUsers(req, (err, data) => err ? next(err) : res.json(data))
  },
  patchUser: (req, res, next) => {
    adminServices.patchUser(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = adminController