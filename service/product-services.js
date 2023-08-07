const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { Product, Category, Comment, User } = require('../models')

const productServices = {
  getProducts: async(req, cb) => {
    try {
      const DEFAULT_LIMIT = 9
      const categoryId = Number(req.query.categoryId) || ''
  
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || DEFAULT_LIMIT
      const offset = getOffset(limit, page)
  
      const [products, categories] = await Promise.all([
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

      const favoritedProductsId = req.user?.FavoritedProducts ? req.user.FavoritedProducts.map(fr => fr.id) : []
      const likedProductId = req.user?.LikedProducts ? req.user.LikedProducts.map(lr => lr.id) : []
      const data = products.rows.map(p => ({
        ...p,
        description: p.description.substring(0, 50),
        isFavorited: favoritedProductsId.includes(p.id),
        isLiked: likedProductId.includes(p.id)
      }))
      cb(null, {
        products: data,
        categories,
        categoryId,
        pagination: getPagination(limit, page, products.count)
      })
    } catch (err) {
      cb(err)
    }
  },
  getProduct: async(req, cb) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          Category,
          { model: Comment, include: User },
          { model: User, as: 'FavoritedUsers' },
          { model: User, as: 'LikedUsers' }
        ]
      })
      await product.increment('viewCounts')
      if (!product) throw new Error("產品未創建!")
      const isFavorited = product.FavoritedUsers.some(f => f.id === req.user.id)
      const isLiked = product.LikedUsers.some(l => l.id === req.user.id)
      cb(null, { product: product.toJSON(), isFavorited, isLiked })
    } catch (err) {
    }
  },
  getDashboard: async(req, cb) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          Category,
          { model: Comment, include: User }
        ]
      })
      if (!product) throw new Error("產品未創建!")
      cb(null, { product: product.toJSON() })
    } catch (err) {

    }
  },
  getFeeds: async(req, cb) => {
    try {
      const [products, comments] = await Promise.all([
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
      cb(null, {products, comments})
    } catch (err) {

    }
  },
  getTopProducts: async(req, cb) => {
    try {
      let products = await Product.findAll({
        include: [{ model: User, as: 'FavoritedUsers' }]
      })
      products = products.map(r => ({
        ...r.dataValues,
        description: r.dataValues.description.substring(0, 50),
        favoritedCount: r.FavoritedUsers.length,
        isFavorited: req.user && req.user.FavoritedProducts.map(d => d.id).includes(r.id)
      }))
      products.sort((a, b) => b.favoritedCount - a.favoritedCount)
      products = products.slice(0, 10)
      cb(null, { products })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = productServices