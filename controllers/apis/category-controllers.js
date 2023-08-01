const categoryServices = require('../../service/category-controllers')

const categoryController = {
  getCategories: (req, res, next) => {
    categoryServices.getCategories(req, (err, data) => err ? next(err) : res.json(data))
  },
  postCategories: (req, res, next) => {
    categoryServices.postCategories(req, (err, data) => err ? next(err) : res.json(data))
  },
  putCategory: (req, res, next) => {
    categoryServices.putCategory(req, (err, data) => err ? next(err) : res.json(data))
  },
  deleteCategory: (req, res, next) => {
    categoryServices.deleteCategory(req, (err, data) => err ? next(err) : res.json(data))
  }
}

module.exports = categoryController