const { imgurFileHandler } = require('../helpers/file-helpers')
const { Product, User, Category } = require('../models')


const adminController = {
  getProducts: (req, res, next) => {
    Product.findAll({ 
      raw: true,
      nest: true,
      include: [Category]
     })
      .then(products => res.render('admin/products', { products }))
      .catch(err => next(err))
  },
  createProduct: (req, res, next) => {
    Category.findAll({
      raw: true,
      nest: true
    })
    .then(categories => res.render('admin/create-product', { categories }))
    .catch(err => next(err))
  },
  postProduct: (req, res, next) => {
    const { name, price, description, image, categoryId } = req.body

    if (!name) throw new Error('產品名稱不可空白!')

    const { file } = req
    
    imgurFileHandler(file)
      .then(filePath => Product.create({
        name,
        price,
        description,
        image: filePath || null,
        categoryId
      }))
    
    .then(() => {
      req.flash('success_messages', '產品創建成功!')
      res.redirect('/admin/products')
    })
    .catch(err => next(err))
  },
  getProduct: (req, res, next) => {
    Product.findByPk(req.params.id, { 
      raw: true,
      nest: true,
      include: [Category]
     })

      .then(product => {
        if (!product) throw new Error('找不到此產品!')
        res.render('admin/product', { product })
      })
      .catch(err => next(err))
  },
  editProduct: (req, res, next) => {
    return Promise.all([
      Product.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([product, categories]) => {
        if (!product) throw new Error('找不到此產品!')
        res.render('admin/edit-product', { product, categories })
      })
      .catch(err => next(err))
  },
  putProduct: (req, res, next) => {
    const { name, price, description, categoryId } = req.body
    if (!name) throw new Error('請輸入產品名稱!')

    const { file } = req

    Promise.all([
      Product.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([product, filePath]) => {
        if (!product) throw new Error('找不到此產品!')
        return product.update({
          name,
          price,
          description,
          image: filePath || product.image,
          categoryId
        })
      })
      .then(() => {
        req.flash('success_messages', '產品編輯成功!')
        res.redirect('/admin/products')
      })
      .catch(err => next(err))
  },
  deleteProduct: (req, res, next) => {
    Product.findByPk(req.params.id)
      .then(product => {
        if (!product) throw new Error('找不到此產品!')
        return product.destroy()
      })
      .then(() => res.redirect('/admin/products'))
      .catch(err => next(err))
  }
}

module.exports = adminController