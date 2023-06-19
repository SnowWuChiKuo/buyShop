const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
    .then(([categories, category]) => {
      res.render('admin/categories', { categories, category })
    })
  },
  postCategories: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('此類別已創建!')
    return Category.create({ name })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('此類別已創建!')
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error('找不到此類別!')
        return category.update({ name })
      })
      .then(() => res.redirect('/admin/categories'))
      .catch(err => next(err))
  }
}

module.exports = categoryController