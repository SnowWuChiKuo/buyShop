const adminServices = require('../../service/admin-services')
const { imgurFileHandler } = require('../../helpers/file-helpers')


const adminController = {
  getProducts: (req, res, next) => {
    adminServices.getProducts(req, (err, data) => err ? next(err) : res.render('admin/products', data))
  },
  createProduct: (req, res, next) => {
    adminServices.createProduct(req, (err, data) => err ? next(err) : res.render('admin/create-product', data))
  },
  postProduct: (req, res, next) => {
    adminServices.postProduct(req, (err, data) => err ? next(err) : res.redirect('admin/products'))
  },
  getProduct: (req, res, next) => {
    adminServices.getProduct(req, (err, data) => err ? next(err) : res.render('admin/product', data))
  },
  editProduct: (req, res, next) => {
    adminServices.editProduct(req, (err, data) => err ? next(err) : res.render('admin/edit-product', data))
  },
  putProduct: (req, res, next) => {
    adminServices.putProduct(req, (err, data) => err ? next(err) : res.redirect('/admin/products'))
  },
  deleteProduct: (req, res, next) => {
    adminServices.deleteProduct(req, (err, data) => err ? next(err) : res.redirect('/admin/products'))
  },
  getUsers: (req, res ,next) => {
    adminServices.getUsers(req, (err, data) => err ? next(err) : res.render('admin/users', data))
  },
  patchUser: (req, res, next) => {
    adminServices.patchUser(req, (err, data) => err ? next(err) : res.redirect('/admin/users'))
  }
}

module.exports = adminController