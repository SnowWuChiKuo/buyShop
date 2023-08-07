const { Category } = require('../models')

const categoryServices = {
  getCategories: async(req, cb) => {
    try {
      const [categories, category] = await Promise.all([
        Category.findAll({ raw: true }),
        req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
      ])
      cb(null, { categories, category })
    } catch (err) {
      cb(err)
    }
  },
  postCategories: async(req, cb) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('此類別已創建!')
      let data =  await Category.create({ name })
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  putCategory: async(req, cb) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('此類別已創建!')
      let category = await Category.findByPk(req.params.id)
      if (!category) throw new Error('找不到此類別!')
      const data = await category.update({ name })
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  deleteCategory: async(req, cb) => {
    try {
      const category = await Category.findByPk(req.params.id)
      if (!category) throw new Error('找不到此類別!')
      let data = category.destroy()
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = categoryServices