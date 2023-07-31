const productServices = require('../../service/product-services')
const { Product, Category, Comment, User } = require('../../models')

const productController = {
  getProducts: (req, res, next) => {
    productServices.getProducts(req, (err, data) => err ? next(err) : res.render('products', data))    
  },
  getProduct: (req , res, next) => {
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
        res.render('product', { product: product.toJSON(), isFavorited, isLiked })
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
  },
  getTopProducts: (req, res, next) => {
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
        res.render('top-products', { products })
      })
      .catch(err => next(err))
  }
}

module.exports = productController