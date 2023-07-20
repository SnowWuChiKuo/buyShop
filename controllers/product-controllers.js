const { Promise } = require('sequelize')
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
        const favoritedProductsId = req.user && req.user.FavoritedProducts.map(fr => fr.id)
        const data = products.rows.map(p => ({
          ...p,
          description: p.description.substring(0, 50),
          isFavorited: favoritedProductsId.includes(p.id)
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
        { model: Comment, include: User },
        { model: User, as: 'FavoritedUsers' }
      ]
    })
    .then(product => {
      return product.increment('viewCounts')
    })
    .then(product => {
        if (!product) throw new Error("產品未創建!")
        const isFavorited = product.FavoritedUsers.some(f => f.id === req.user.id)
        res.render('product', { product: product.toJSON(), isFavorited })
      })
      .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    return Product.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: User }
      ]
    })
      .then(product => {
        if (!product) throw new Error("產品未創建!")
        res.render('dashboard', { product: product.toJSON() })
      })
      .catch(err => next(err))
  },
  getFeeds: (req, res, next) => {
    return Promise.all([
      Product.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [Category],
        raw: true,
        nest: true
      }),
      Comment.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [User, Product],
        raw: true,
        nest: true
      })
    ])
      .then(([products, comments]) => {
        res.render('feeds', {
          products,
          comments
        })
      })
      .catch(err => next(err))
  }
}

module.exports = productController