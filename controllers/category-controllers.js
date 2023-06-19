const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    return Category.findAll({ raw: true })
    .then(categories => {
      res.render('admin/categories', { categories })
    })
  },
  postCategories: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('此類別已創建!')
    return Category.create({ name })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => next(err))
  }
}

module.exports = categoryController