const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { Product, Category, Comment, User } = require('../models')

const productController = {
  getProducts: (req, res, next) => {
    const DEFAULT_LIMIT = 9
    const categoryId = Number(req.query.categoryId) || ''

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Promise.all([ 
      Product.findAndCountAll({
        include: Category,
        where: {
          ...categoryId ? { categoryId } : {}
        },
        limit,
        offset,
        nest: true,
        raw: true
      }),
      Category.findAll({ raw: true })
    ]) 
      .then(([products, categories]) => {
        const data = products.rows.map(p => ({
          ...p,
          description: p.description.substring(0, 50)
        }))
        return res.render('products', {
          products: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, products.count)
        })
      })
      .catch(err => next(err))
  },
  getProduct: (req , res, next) => {
    return Product.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: User }
      ]
    })
    .then(product => {
        if (!product) throw new Error("產品未創建!")
        product.increment('viewCounts')
        res.render('product', { product: product.toJSON() })
      })
      .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    return Product.findByPk(req.params.id, {
      include: Category,
      nest: true,
      raw: true
    })
      .then(product => {
        if (!product) throw new Error("產品未創建!")
        res.render('dashboard', { product })
      })
      .catch(err => next(err))
  }
}

module.exports = productController