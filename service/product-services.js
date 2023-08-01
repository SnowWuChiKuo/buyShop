const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { Product, Category, Comment, User } = require('../models')

const productServices = {
  getProducts: (req, cb) => {
    const DEFAULT_LIMIT = 9
    const categoryId = Number(req.query.categoryId) || ''

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    Promise.all([
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
        const favoritedProductsId = req.user?.FavoritedProducts ? req.user.FavoritedProducts.map(fr => fr.id) : []
        const likedProductId = req.user?.LikedProducts ? req.user.LikedProducts.map(lr => lr.id) : []
        const data = products.rows.map(p => ({
          ...p,
          description: p.description.substring(0, 50),
          isFavorited: favoritedProductsId.includes(p.id),
          isLiked: likedProductId.includes(p.id)
        }))
        return cb(null, {
          products: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, products.count)
        })
      })
      .catch(err => cb(err))
  },
  getProduct: (req, cb) => {
    return Product.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: User },
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' }
      ]
    })
      .then(product => {
        return product.increment('viewCounts')
      })
      .then(product => {
        if (!product) throw new Error("產品未創建!")
        const isFavorited = product.FavoritedUsers.some(f => f.id === req.user.id)
        const isLiked = product.LikedUsers.some(l => l.id === req.user.id)
        cb(null, { product: product.toJSON(), isFavorited, isLiked })
      })
      .catch(err => cb(err))
  },
  getDashboard: (req, cb) => {
    return Product.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: User }
      ]
    })
      .then(product => {
        if (!product) throw new Error("產品未創建!")
        cb(null, { product: product.toJSON() })
      })
      .catch(err => cb(err))
  },
  getFeeds: (req, cb) => {
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
        cb(null, {
          products,
          comments
        })
      })
      .catch(err => cb(err))
  },
  getTopProducts: (req, cb) => {
    return Product.findAll({
      include: [{ model: User, as: 'FavoritedUsers' }]
    })
      .then(products => {
        products = products.map(r => ({
          ...r.dataValues,
          description: r.dataValues.description.substring(0, 50),
          favoritedCount: r.FavoritedUsers.length,
          isFavorited: req.user && req.user.FavoritedProducts.map(d => d.id).includes(r.id)
        }))
        products.sort((a, b) => b.favoritedCount - a.favoritedCount)
        products = products.slice(0, 10)
        cb(null, { products })
      })
      .catch(err => cb(err))
  }
}

module.exports = productServices