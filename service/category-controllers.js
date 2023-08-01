const { Category } = require('../models')

const categoryServices = {
  getCategories: (req, cb) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
      .then(([categories, category]) => {
        cb(null, { categories, category })
      })
  },
  postCategories: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('此類別已創建!')
    return Category.create({ name })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  putCategory: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('此類別已創建!')
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error('找不到此類別!')
        return category.update({ name })
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  deleteCategory: (req, cb) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error('找不到此類別!')
        return category.destroy()
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  }
}

module.exports = categoryServices